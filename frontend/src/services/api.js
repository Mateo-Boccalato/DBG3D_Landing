const BASE = import.meta.env.VITE_API_URL || ''

async function post(path, data) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw { status: res.status, errors: body.errors || {} }
  }

  return res.json()
}

export const submitContact = (data) => post('/api/contact', data)
export const submitYTRequest = (data) => post('/api/youtube', data)
export const submitDownload = (data) => post('/api/download', data)
