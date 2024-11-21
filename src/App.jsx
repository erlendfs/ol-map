import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './Map'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{height: '100vh', width: '100vw'}}>
        <MapComponent />
      </div>
      
    </>
  )
}

export default App
