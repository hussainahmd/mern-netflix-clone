import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import WatchPage from "./pages/WatchPage"
import SearchPage from "./pages/SearchPage"
import SearchHistoryPage from "./pages/SearchHistoryPage"
import NotFoundPage from "./pages/404"


export default function App() {
    const { user, isCheckingAuth, authCheck } = useAuthStore()

    useEffect(() => {
        authCheck()
    }, [authCheck])

    if (isCheckingAuth) {
        return (
            <div className="h-screen">
                <div className="flex justify-center items-center bg-black h-full">
                    <Loader className="animate-spin text-red-600 size-10" />
                </div>
            </div>
        )
    }

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={!user ? <Login /> : <Navigate to={'/'} />} />
                <Route path='/signup' element={!user ? <Signup /> : <Navigate to={'/'} />} />
                <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={'/login'} />} />

                <Route path='/search' element={user ? <SearchPage /> : <Navigate to={'/login'} />} />
                {/* <Route path='/search/:q' element={user ? <SearchPage /> : <Navigate to={'/login'} />} /> */}

                <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={'/login'} />} />
                
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
            <Footer />

            <Toaster />
        </>
    )
}