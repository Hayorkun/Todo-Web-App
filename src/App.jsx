import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from 'lucide-react'
import HomePage from './pages/HomePage'
import AppBackground from './component/AppBackground'

function App() {

  return (
    <AppBackground>
      <BrowserRouter>
     <Routes>
      <Route path='/' element={<HomePage/>}/>
     </Routes>
    </BrowserRouter>
    </AppBackground>
  )
}

export default App
