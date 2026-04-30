import { useCallback, useEffect, useState } from 'react'
import { EmailCaptureModal } from './EmailCaptureModal'
import { Footer } from './Footer'
import { Nav } from './Nav'

const SIGNUP_CAPTURED_KEY = 'dbg3d:email-signup-captured'
const SIGNUP_DISMISSED_KEY = 'dbg3d:email-signup-dismissed'

export function Layout({ children }) {
  const [leadModalOpen, setLeadModalOpen] = useState(false)

  const shouldSuppressLeadModal = useCallback(() => {
    return (
      sessionStorage.getItem(SIGNUP_CAPTURED_KEY) === 'true' ||
      sessionStorage.getItem(SIGNUP_DISMISSED_KEY) === 'true'
    )
  }, [])

  useEffect(() => {
    const handleIntentClick = (event) => {
      const link = event.target.closest?.('a[href]')
      if (!link) return

      const href = link.getAttribute('href') || ''
      const isProjectIntent = href === '/contact' || href.endsWith('/contact')
      if (!isProjectIntent || shouldSuppressLeadModal()) return

      setLeadModalOpen(true)
    }

    document.addEventListener('click', handleIntentClick)
    return () => document.removeEventListener('click', handleIntentClick)
  }, [shouldSuppressLeadModal])

  const handleLeadClose = () => {
    sessionStorage.setItem(SIGNUP_DISMISSED_KEY, 'true')
    setLeadModalOpen(false)
  }

  const handleLeadSuccess = () => {
    sessionStorage.setItem(SIGNUP_CAPTURED_KEY, 'true')
  }

  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <EmailCaptureModal
        onClose={handleLeadClose}
        onSuccess={handleLeadSuccess}
        open={leadModalOpen}
      />
    </>
  )
}
