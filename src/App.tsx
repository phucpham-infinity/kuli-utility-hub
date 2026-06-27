import { Route, Routes } from 'react-router-dom'
import { QuizGeneratorPage } from './pages/QuizGeneratorPage'

function App() {
  return (
    <Routes>
      <Route path="*" element={<QuizGeneratorPage />} />
    </Routes>
  )
}

export default App
