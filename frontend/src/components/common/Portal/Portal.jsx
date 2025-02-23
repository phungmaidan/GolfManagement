// src/components/common/Portal/Portal.jsx
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children, containerId = 'portal-root' }) => {
  useEffect(() => {
    // Tạo portal container nếu chưa tồn tại
    let portalContainer = document.getElementById(containerId)
    if (!portalContainer) {
      portalContainer = document.createElement('div') 
      portalContainer.id = containerId
      document.body.appendChild(portalContainer)
    }

    return () => {
      // Cleanup khi unmount
      if (!portalContainer.childNodes.length) {
        portalContainer.remove()
      }
    }
  }, [containerId])

  let container = document.getElementById(containerId)
  if (!container) {
    container = document.createElement('div')
    container.id = containerId
    document.body.appendChild(container)
  }

  return createPortal(children, container)
}

export default Portal