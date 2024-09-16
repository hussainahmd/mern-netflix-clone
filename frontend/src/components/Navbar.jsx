import { useState } from 'react'
import { useAuthStore } from '../store/authUser'
import { LogOut, Menu, Search } from "lucide-react"
import { Link } from 'react-router-dom'
import { useContentStore } from '../store/content'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { user, logout } = useAuthStore()
    const { setContentType, contentType } = useContentStore()

    const toggleMobileMenu = (contentType) => {
        if (!contentType) {
            setIsMobileMenuOpen(!isMobileMenuOpen)
            return
        }
        setIsMobileMenuOpen(!isMobileMenuOpen)
        setContentType(contentType)
    }

    const { pathname } = useLocation()
    const onHistoryPage = pathname.includes('history')

    return (
        // <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 border rounded-lg backdrop-blur-md drop-shadow-lg shadow-[0px_0px_10px_10px_rgb(0,0,0,.3)]">
        <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
            <div className="flex items-center gap-10 z-50">
                <Link to='/'>
                    <img src="/netflix-logo.png" alt="Netflix logo" className="w-32 sm:w-40" />
                </Link>

                {/* desktop navbar items */}
                <div className="hidden sm:flex gap-2 items:center">
                    <Link to='/' className={`hover:underline ${contentType === 'movie' && !onHistoryPage ? 'underline text-red-500' : ''}`} onClick={() => setContentType('movie')}>
                        Movies
                    </Link>
                    <Link to='/' className={`hover:underline ${contentType === 'tv' && !onHistoryPage ? 'underline text-red-500' : ''}`} onClick={() => setContentType('tv')}>
                        Tv Shows
                    </Link>
                    <Link to='/history' className={`hover:underline ${onHistoryPage ? 'underline text-red-500' : ''}`}>
                        Search History
                    </Link>

                </div>
            </div>

            <div className="flex gap-2 items-center z-50">
                <Link to='/search'>
                    <Search className='size-6 cursor-pointer' />
                </Link>
                <img src={user?.image} alt="Avatar" className="h-8 rounded cursor-pointer" />
                <LogOut className='size-6 cursor-pointer' onClick={logout} />
                <div className="sm:hidden">
                    <Menu className='size-6 cursor-pointer' onClick={() => toggleMobileMenu(null)} />
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
                    <Link
                        to='/'
                        className={`block hover:underline p-2 ${contentType === 'movie' && !onHistoryPage ? 'underline text-red-500' : ''}`}
                        onClick={() => toggleMobileMenu('movie')}
                    >
                        Movies
                    </Link>
                    <Link
                        to='/'
                        className={`block hover:underline p-2 ${contentType === 'tv' && !onHistoryPage ? 'underline text-red-500' : ''}`}
                        onClick={() => toggleMobileMenu('tv')}
                    >
                        Tv Shows
                    </Link>
                    <Link to='/history'
                        className={`block hover:underline p-2 ${onHistoryPage ? 'underline text-red-500' : ''}`}
                        onClick={toggleMobileMenu}
                    >
                        Search History
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Navbar