import { useState } from "react"

import FormInput from "./FormInput"
import { useLocation } from "react-router-dom"

import { useAuthStore } from "../../store/authUser"
import PasswordInput from "./PasswordInput"
import toast from "react-hot-toast"

const SignupForm = () => {

    const location = useLocation()
    let emailValue = location.state?.email || ''

    const [email, setEmail] = useState(emailValue)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isValidPassword, setIsValidPassword] = useState(false)

    const { signup, isSigningUp } = useAuthStore()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!isValidPassword) {
            toast.error('Enter a valid password')
            return
        }
        signup({ email, username, password })
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <FormInput
                type='email'
                id='email'
                placeholder='you@example.com'
                value={email}
                onChange={setEmail}
            />
            <FormInput
                type='text'
                id='username'
                placeholder='johndoe'
                value={username}
                onChange={setUsername}
            />

            <div className="flex flex-col mb-4">
                <label className="text-sm font-medium text-gray-300 block mb-1">
                    Password
                </label>
                <PasswordInput
                    value={password}
                    onChange={setPassword}
                    placeholder={'Enter password'}
                    setIsValidPassword={setIsValidPassword}
                />
            </div>

            {/* <button disabled={!allValid} className={`w-full py-2 bg-red-600 text-white font-semibold rounded-md ${allValid ? 'hover:bg-red-700' : ''} transition duration-300 ease-in-out ${allValid ? 'hover:scale-x-90' : ''} ${allValid ? 'hover:shadow-[0px_0px_8px_0px_#ffffffcc]' : ''}`}> */}
            {/* <button disabled={!isValidPassword} className={`w-full py-2 bg-red-600 text-white font-semibold rounded-md ${isValidPassword ? 'hover:bg-red-700' : ''} transition duration-300 ease-in-out ${isValidPassword ? 'hover:scale-x-90' : ''} ${isValidPassword ? 'hover:shadow-[0px_0px_8px_0px_#ffffffcc]' : ''}`}> */}
            <button disabled={isSigningUp} className={`w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 ease-in-out hover:scale-x-90 hover:shadow-[0px_0px_8px_0px_#ffffffcc]`}>
                {isSigningUp ? 'Loading...' : 'Sign Up'}
            </button>
        </form>
    )
}

export default SignupForm