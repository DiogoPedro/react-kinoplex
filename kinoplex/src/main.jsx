import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ReduxProvider } from './store/provider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render
(
  <React.StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
)
