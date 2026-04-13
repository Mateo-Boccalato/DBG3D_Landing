import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | DBG3D` : 'DBG3D'
  }, [title])
}
