import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Logo from './Pages/Logo.jsx'
import SearchBar from './components/search_bar.jsx'  // Capital letter

function App() {
  return (
    <>
      <Logo />
      <SearchBar />   {/* Component naam bhi capital */}
    </>
  )
}

export default App

