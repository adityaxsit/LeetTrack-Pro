import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className="appLayout">
        <Sidebar />

        <main className="mainContent">
        </main>

      </div>
    </>
  )
}
          

  


export default App;
