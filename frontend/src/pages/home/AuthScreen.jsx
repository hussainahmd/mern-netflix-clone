import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Separator from '../../components/Separator'

const AuthScreen = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    // Email validation function using a regex pattern
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    // Handle input change
    const handleChange = (e) => {
        setEmail(e.target.value)
        // Clear error when user starts typing again
        if (error) setError('')
    }

    // Validate email on blur (when input loses focus)
    const handleBlur = () => {
        if (email && !validateEmail(email)) {
            setError('Please enter a valid email address.')
        }
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.')
        } else {
            setError('')
            navigate('/signup', { state: { email } })
        }
    }

    return (
        <div className='hero-bg relative'>
            <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
                <img src="/netflix-logo.png" alt="Netflix logo" className="w-32 md:w-52 shadow-md" />
                <Link to={'/login'} className='text-white bg-red-600 py-1 px-2 rounded transition duration-300 ease-in-out hover:bg-red-700 hover:scale-x-110 hover:shadow-[0px_0px_0px_2px_rgb(400,70,50)]'>
                    Sign In
                </Link>
            </header>

            {/* Hero section */}
            <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Unlimited movies, TV shows, and more.</h1>
                <p className="text-2xl mb-6">Watch anywhere. Cancel anytime.</p>
                <p className=" mb-4">Ready to watch? Enter your email to create or restart your membership.</p>

                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 w-1/2">
                    <div className="relative flex-1 ">
                        <input
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            id="inputEmail"
                            className={`block rounded px-2.5 pb-2.5 pt-5 w-full text-sm bg-black/80 border-0 border-b-[3px] appearance-none text-white focus:border-blue-500 focus:outline-none focus:ring-0 peer ${error ? 'border-red-500' : 'border-gray-600'} ${error ? 'focus:border-red-500' : 'focus:border-blue-500'}`}
                            placeholder=" "
                        />
                        {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
                        <label
                            htmlFor="inputEmail"
                            className={`absolute text-sm 'text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}>
                            Email address {error && <span className="text-red-500">- {error}</span>}
                        </label>
                    </div>
                    <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center transition duration-300 ease-in-out hover:bg-red-700 hover:scale-x-95 hover:shadow-[0px_0px_0px_2px_rgb(400,70,50)]">
                        Get Started
                        <ChevronRight className="size-8 md:size-10" />
                    </button>
                </form>
            </div>

            <Separator />

            {/* 1st section */}

            <div className="py-10 bg-black text-white shadow-[0_0_80px_5px_rgba(255,255,255,0.4)]">
                <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
                    {/* Left */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Enjoy on your TV</h2>
                        <p className="text-lg md:text-xl">
                            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
                        </p>
                    </div>
                    {/* Right */}
                    <div className="flex-1 relative">
                        <img src="/tv.png" alt="tv image" className='mt-4 z-20 relative' />
                        <video
                            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10'
                            playsInline
                            autoPlay
                            muted
                            loop
                        >
                            <source src='/hero-vid.m4v' type='video/mp4' />
                        </video>
                    </div>
                </div>
            </div>

            <Separator />

            {/* 2nd section */}

            <div className="py-10 bg-black text-white shadow-[0_0_80px_5px_rgba(255,255,255,0.4)]">
                <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
                    {/* Left */}
                    <div className="flex-1">
                        <div className="relative">
                            <img src="/stranger-things-lg.png" alt="Stranger things image large" className='mt-4 rounded-b-xl' />
                            <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
                                <img src="/stranger-things-sm.png" alt="Stranger things image med" className="h-full rounded" />
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex flex-col gap-0">
                                        <span className="text-md lg:text-lg font-bold">Stranger Things</span>
                                        <span className="text-sm text-blue-500">Downloading...</span>
                                    </div>
                                    <img src="/download-icon.gif" alt="" className="h-12" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right */}
                    <div className="flex-1 md:text-left text-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
                            Download your shows to watch offline.
                        </h2>
                        <p className="text-lg md:text-xl">
                            Save your favorites easily and always have something to watch.
                        </p>
                    </div>
                </div>
            </div>

            <Separator />

            {/* 3rd section */}

            <div className="py-10 bg-black text-white shadow-[0_0_80px_5px_rgba(255,255,255,0.4)]">
                <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
                    {/* Left */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Watch everywhere</h2>
                        <p className="text-lg md:text-xl">
                            Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.
                        </p>
                    </div>
                    {/* Right */}
                    <div className="flex-1 relative overflow-hidden">
                        <img src="/device-pile.png" alt="Device image" className='mt-4 z-20 relative' />
                        <video
                            className='absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%]'
                            playsInline
                            autoPlay
                            muted
                            loop
                        >
                            <source src='/video-devices.m4v' type='video/mp4' />
                        </video>
                    </div>
                </div>
            </div>

            <Separator />

            {/* 4th section */}
            <div className="py-10 bg-black text-white shadow-[0_0_80px_5px_rgba(255,255,255,0.4)]">
                <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
                    {/* Left */}
                    <div className="flex-1 relative">
                        <img src="/kids.png" alt="Kids image" className='mt-4' />
                    </div>
                    {/* Right */}
                    <div className="flex-1 md:text-left text-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
                            Create profiles for kids.
                        </h2>
                        <p className="text-lg md:text-xl">
                            Send kids on adventures with their favorite characters in a space made just for them, free with your membership.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthScreen