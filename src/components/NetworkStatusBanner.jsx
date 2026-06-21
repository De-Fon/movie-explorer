import { useEffect, useState } from 'react'

export default function NetworkStatusBanner() {
  const [online, setOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true))
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleOnline() {
      setOnline(true)
      setVisible(true)
      setTimeout(() => setVisible(false), 2500)
    }

    function handleOffline() {
      setOnline(false)
      setVisible(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`network-banner ${online ? 'network-banner--online' : 'network-banner--offline'}`} role="status">
      {online ? 'You are back online' : "You're offline — some features may be unavailable"}
    </div>
  )
}
