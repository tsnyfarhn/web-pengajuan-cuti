import { useState } from "react"
import { Bell, User, House, BookUser, NotepadText, Menu, X, Settings, Building2 } from 'lucide-react';
import "../css/Header.css"


export default function Header({ currentPage, onNavigate }) {

    const [isMenuOpen, setMenuOpen] = useState(false)

    return (
        <header className="header">
            <div className="navbar-container">

                <div className="logo">
                    <a className="logo-wrapper">
                        <div className="logo-icon">
                            <Building2 size={24} />
                        </div>

                        <span className="logo-text">
                            Company
                        </span>
                    </a>
                </div>

                <nav className="navbar-menu">
                    <a href="#" className="menu-label">
                        <House size={16} />
                        Dashboard
                    </a>
                    
                    <a href="#" className="menu-label">
                        <BookUser size={16} />
                        Absensi
                    </a>

                    <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); onNavigate('Izin') }} 
                        className={`menu-label ${currentPage === 'Izin' ? 'active' : ''}`}
                    >
                        <NotepadText size={16} />
                        Izin
                    </a>
                </nav>

                {/* Action */}
                <div className="navbar-action">

                    <button
                      id=""
                      className="notif-button"
                    >
                      <Bell size={18} />
                    </button>

                    <button
                      id=""
                      className="setting-button"
                    >
                      <Settings size={18} />
                    </button>

                    <div className="action-divider" />

                    <div className="user-profile">
                        <div className="user-icon">
                            <User size={24}  />
                        </div>
                        
                        <div className="user-info">
                          <span className="user-name">John Doe</span>
                          <span className="user-role">Staff</span>
                        </div>
                    </div>

                    {/* Hamburger Menu */}
                    <button
                      id=""
                      onClick={() => setMenuOpen(!isMenuOpen)}
                      className="menu-hamburger"
                    >
                      {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Menu Panel */}
            {isMenuOpen && (
                <div className="menu-panel">
                    <div className="panel-content">
                        <a href="#" className="content-label">
                            <House size={18} />
                            Dashboard
                        </a>

                        <a href="#" className="content-label">
                            <BookUser size={18} />
                            Absensi
                        </a>

                        <a 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); onNavigate('Izin') }} 
                            className={`menu-label ${currentPage === 'Izin' ? 'active' : ''}`}
                        >
                            <NotepadText size={18} />
                            Izin
                        </a>
                    </div>
                </div>
            )}
        </header>
    )
}