import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import App from './App'
import Results from './Results'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/results" element={<Results/>} />
          </Routes>
        </div>
      </BrowserRouter>
  </StrictMode>,
)
