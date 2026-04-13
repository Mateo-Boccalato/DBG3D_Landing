import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

async function decodeDeflateBase64(base64) {
  const bin = atob(base64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i)

  const ds = new DecompressionStream('deflate')
  const decompressed = new Response(new Blob([bytes]).stream().pipeThrough(ds))
  const text = await decompressed.text()
  return JSON.parse(text)
}

export function ThreeViewer({ meshDataB64 }) {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const rendererRef = useRef(null)
  const rafRef = useRef(0)
  const cleanupRef = useRef(() => {})

  const rotXRef = useRef(0.35)
  const rotYRef = useRef(0.55)
  const zoomRef = useRef(1)
  const spinRef = useRef(true)
  const isPointerDownRef = useRef(false)
  const lastXRef = useRef(0)
  const lastYRef = useRef(0)

  const [spinning, setSpinning] = useState(true)
  const [activeStyle, setActiveStyle] = useState('solid')

  useEffect(() => {
    let isMounted = true
    if (!canvasRef.current || !wrapperRef.current || !meshDataB64) return undefined

    ;(async () => {
      const data = await decodeDeflateBase64(meshDataB64)
      if (!isMounted || !canvasRef.current || !wrapperRef.current) return

      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      rendererRef.current = renderer

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(38, 1, 0.0001, 1000)

      scene.add(new THREE.AmbientLight(0xffffff, 0.5))
      const l1 = new THREE.DirectionalLight(0xffffff, 0.7)
      l1.position.set(2, 3, 3)
      const l2 = new THREE.DirectionalLight(0xffffff, 0.35)
      l2.position.set(-2, 1, -2)
      const l3 = new THREE.DirectionalLight(0xffffff, 0.25)
      l3.position.set(0, -2, 2)
      scene.add(l1, l2, l3)

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(data.pos), 3))
      geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(data.nor), 3))
      geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(data.idx), 1))
      geometry.computeBoundingSphere()

      const material = new THREE.MeshStandardMaterial({
        color: 0x3d5a7a,
        metalness: 0.4,
        roughness: 0.5,
        transparent: false,
      })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const edgeGeom = new THREE.EdgesGeometry(geometry)
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x8cc3ff })
      const edges = new THREE.LineSegments(edgeGeom, edgeMat)
      edges.visible = false
      scene.add(edges)

      const grid = new THREE.GridHelper(2, 24, 0x223140, 0x1a2230)
      grid.position.y = -0.15
      scene.add(grid)

      const center = new THREE.Vector3()
      geometry.computeBoundingBox()
      geometry.boundingBox.getCenter(center)
      mesh.position.sub(center)
      edges.position.copy(mesh.position)

      const radius = Math.max(geometry.boundingSphere?.radius || 0.5, 0.4)
      const camTarget = new THREE.Vector3(0, 0, 0)
      const baseDist = radius * 2.8

      const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
      const updateCam = () => {
        const rx = clamp(rotXRef.current, -1.2, 1.2)
        const ry = rotYRef.current
        const dist = clamp(baseDist * zoomRef.current, radius * 1.2, radius * 8)
        const x = Math.cos(rx) * Math.sin(ry) * dist
        const y = Math.sin(rx) * dist
        const z = Math.cos(rx) * Math.cos(ry) * dist
        camera.position.set(x, y, z)
        camera.lookAt(camTarget)
      }

      const onPointerDown = (clientX, clientY) => {
        isPointerDownRef.current = true
        lastXRef.current = clientX
        lastYRef.current = clientY
      }
      const onPointerMove = (clientX, clientY) => {
        if (!isPointerDownRef.current) return
        const dx = clientX - lastXRef.current
        const dy = clientY - lastYRef.current
        lastXRef.current = clientX
        lastYRef.current = clientY
        rotYRef.current += dx * 0.012
        rotXRef.current = clamp(rotXRef.current + dy * 0.01, -1.2, 1.2)
      }
      const onPointerUp = () => {
        isPointerDownRef.current = false
      }
      const onWheel = (e) => {
        e.preventDefault()
        zoomRef.current = clamp(zoomRef.current + e.deltaY * 0.0015, 0.45, 2.6)
      }

      const canvas = canvasRef.current
      const handleMouseDown = (e) => onPointerDown(e.clientX, e.clientY)
      const handleMouseMove = (e) => onPointerMove(e.clientX, e.clientY)
      const handleTouchStart = (e) => {
        if (!e.touches?.length) return
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY)
      }
      const handleTouchMove = (e) => {
        if (!e.touches?.length) return
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY)
      }

      canvas.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', onPointerUp)
      canvas.addEventListener('touchstart', handleTouchStart, { passive: true })
      canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
      window.addEventListener('touchend', onPointerUp)
      canvas.addEventListener('wheel', onWheel, { passive: false })

      const resize = () => {
        const w = wrapperRef.current?.clientWidth || 1
        const h = wrapperRef.current?.clientHeight || 1
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      const ro = new ResizeObserver(resize)
      ro.observe(wrapperRef.current)
      resize()

      const animate = () => {
        rafRef.current = requestAnimationFrame(animate)
        if (spinRef.current) rotYRef.current += 0.004
        updateCam()
        renderer.render(scene, camera)
      }
      animate()

      const setStyle = (mode) => {
        if (mode === 'solid') {
          material.color.setHex(0x3d5a7a)
          material.metalness = 0.4
          material.roughness = 0.5
          material.opacity = 1
          material.transparent = false
          mesh.visible = true
          edges.visible = false
        } else if (mode === 'clay') {
          material.color.setHex(0x8a8f95)
          material.metalness = 0.05
          material.roughness = 0.9
          material.opacity = 1
          material.transparent = false
          mesh.visible = true
          edges.visible = false
        } else if (mode === 'xray') {
          material.color.setHex(0x6eb6ff)
          material.metalness = 0.1
          material.roughness = 0.2
          material.opacity = 0.25
          material.transparent = true
          mesh.visible = true
          edges.visible = true
        } else if (mode === 'wire') {
          mesh.visible = false
          edges.visible = true
        }
        material.needsUpdate = true
      }

      cleanupRef.current = () => {
        cancelAnimationFrame(rafRef.current)
        ro.disconnect()
        canvas.removeEventListener('mousedown', handleMouseDown)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', onPointerUp)
        canvas.removeEventListener('touchstart', handleTouchStart)
        canvas.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', onPointerUp)
        canvas.removeEventListener('wheel', onWheel)
        geometry.dispose()
        edgeGeom.dispose()
        edgeMat.dispose()
        material.dispose()
        renderer.dispose()
      }

      const api = {
        setStyle,
        resetCam: () => {
          rotXRef.current = 0.35
          rotYRef.current = 0.55
          zoomRef.current = 1
        },
      }
      wrapperRef.current.__viewerApi = api
      setStyle('solid')
    })().catch(() => {
      // Keep UI alive if mesh parsing or GPU init fails.
    })

    return () => {
      isMounted = false
      cleanupRef.current()
    }
  }, [meshDataB64])

  const handleResetCam = () => {
    const api = wrapperRef.current?.__viewerApi
    api?.resetCam?.()
  }

  const handleToggleSpin = () => {
    spinRef.current = !spinRef.current
    setSpinning((s) => !s)
  }

  const handleSetStyle = (name) => {
    const api = wrapperRef.current?.__viewerApi
    api?.setStyle?.(name)
    setActiveStyle(name)
  }

  return (
    <div className="pf-viewer-wrap" ref={wrapperRef}>
      <canvas className="pf-canvas" ref={canvasRef} style={{ touchAction: 'none' }} />
      <div className="pf-label">Railing Guide</div>
      <div className="pf-fmt-chip">GLB</div>
      <div className="pf-pills">
        {['solid', 'clay', 'xray', 'wire'].map((mode) => (
          <button
            className={`pf-pill ${activeStyle === mode ? 'pf-pill-on' : ''}`}
            key={mode}
            onClick={() => handleSetStyle(mode)}
            type="button"
          >
            {mode === 'xray' ? 'X-Ray' : mode[0].toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>
      <div className="pf-vbar">
        <span className="pf-hint">Drag to orbit · Scroll to zoom</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="pf-vbtn" onClick={handleResetCam} type="button">
            Reset
          </button>
          <button className="pf-vbtn" onClick={handleToggleSpin} type="button">
            {spinning ? 'Stop' : 'Spin'}
          </button>
        </div>
      </div>
    </div>
  )
}
