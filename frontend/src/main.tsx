import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import App from './App'
import Survey from './Survey'
import Results from './Results'
import Question from './Question'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/edit/:surveyId" element={<Survey editMode={true}/> }  />
            <Route path="/edit/:surveyId/:questionId" element={<Question editMode={true}/> }  />
            <Route path="/take" element={<Survey editMode={false}/>} />
            <Route path="/results" element={<Results/>} />
          </Routes>
        </div>
      </BrowserRouter>
  </StrictMode>,
)
