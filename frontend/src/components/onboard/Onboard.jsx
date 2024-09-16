import { Link } from "react-router-dom"

import FormDetail from "./FormDetail"
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"

const Onboard = ({ title, newRouteLink, detailText }) => {

    return (
        <div className='h-screen w-full hero-bg'>
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
                <Link to={'/'}>
                    <img src="/netflix-logo.png" alt="logo" className="w-52" />
                </Link>
            </header>
            <div className={`flex justify-center items-center ${title === 'Sign Up' ? 'mt-5' : 'mt-20'} mx-3`}>
                <div className="w-full max-w-md p-8 space-y-6 bg-black/20 rounded-lg backdrop-blur-md drop-shadow-lg shadow-[0_0_4px_2px_rgb(255,255,255,0.3)]">
                    <h1 className="text-center text-white text-3xl font-bold mb-4">{title}</h1>
                    {title === 'Sign Up' ? <SignupForm /> : <LoginForm />}
                    <FormDetail link={newRouteLink} text={detailText} />
                </div>
            </div>
        </div>
    )

}

export default Onboard