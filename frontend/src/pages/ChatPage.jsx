import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function chatPage() {
  const{ logout } = useAuthStore()
  return (
    <div className="z-10">
      ChatPage
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default chatPage
