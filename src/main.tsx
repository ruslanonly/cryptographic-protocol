import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/ui/App.tsx'
import './shared/ui/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
