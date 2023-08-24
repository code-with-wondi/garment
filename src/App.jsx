import { useState } from 'react'
import Sell from './components/sell'
import Input from './components/input'
import Report from './components/report'
import Home from './components/Home'
import { BrowserRouter, Routes, Route  } from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
 <>
 <BrowserRouter>
 <Routes>
  <Route path='sell' element={<Sell />} />
  <Route path='input' element={<Input />} />
  <Route path='report' element={<Report />} />
  <Route path='/' element={<Home />}/>
 </Routes>
 </BrowserRouter>
 <h1></h1>
 </>
  )
}

export default App
