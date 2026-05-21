
import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Izin from './components/Izin.jsx'
import './index.css'
import './App.css'

export default function App() {

  const [page, setPage] = useState('Izin')

  return (
    <div className='layout'>
      <Header currentPage={page} onNavigate={setPage} />

      <main className='main'>
        {page === "Izin" && <Izin />}
      </main>

      <footer className='footer'>
        <Footer />
      </footer>
    </div>
  )
}