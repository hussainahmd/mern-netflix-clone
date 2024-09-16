import { useState } from "react"

import FormInput from "./FormInput"
import FormButton from "./FormButton"
import { useAuthStore } from "../../store/authUser"

const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, isLoggingIn } = useAuthStore()

    const handleSubmit = (e) => {
        e.preventDefault()
        login({ email, password })
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
                type='password'
                id='password'
                placeholder='********'
                value={password}
                onChange={setPassword}
            />
            <FormButton disabled={isLoggingIn} title={ isLoggingIn ? 'Loading...' : 'Login' } />
        </form>
    )
}

export default LoginForm