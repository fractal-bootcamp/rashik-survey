import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import App from './App'
import SurveyCreation from './SurveyCreation'
import TakeSurvey from './TakeSurvey'
import Results from './Results'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" Component={App} />
            <Route path="/create" Component={SurveyCreation} />
            <Route path="/take" Component={TakeSurvey} />
            <Route path="/results" Component={Results} />
          </Routes>
        </div>
      </BrowserRouter>
  </StrictMode>,
)
