/* eslint-disable no-useless-escape */
import { useState, useEffect } from 'react'
import { FaTimes, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa'

const PasswordInput = ({ value, onChange, placeholder, setIsValidPassword }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const criteria = [
        { label: '≥ 8 characters', regex: /.{8,}/ },
        { label: '≥ 1 number', regex: /[0-9]/ },
        { label: '≥ 1 lowercase letter', regex: /[a-z]/ },
        { label: '≥ 1 uppercase letter', regex: /[A-Z]/ },
        { label: '≥ 1 special character or space', regex: /[!@#$%^&*()_\-+=\[\]{};:"'<>,.?/\\|~`]|[^ ]( ).*[^ ]/ },
        { label: 'no leading or trailing spaces', regex: /^[^\s]+(\s+[^\s]+)*$/ },
    ]

    const checkCriteria = (value) => {
        return criteria.map((criterion) => ({
            ...criterion,
            isValid: criterion.regex.test(value),
        }))
    }

    const validationResults = checkCriteria(value)

    useEffect(() => {
        const allValid = validationResults.every(criterion => criterion.isValid)
        setIsValidPassword(allValid)
    }, [value, setIsValidPassword, validationResults])

    return (
        <>
            <div className='relative'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    name="password"
                    autoComplete="new-password"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white
                                focus:outilne-none focus:ring"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center focus:outline-none"
                >
                    {showPassword ? <FaEyeSlash size={16} color='white' /> : <FaEye size={16} color='white' />}
                </button>
            </div>
            {isFocused && (
                <ul className="mt-2 space-y-1">
                    {validationResults.map((criterion, index) => (
                        <li key={index} className="flex items-center">
                            {criterion.isValid ? (
                                <FaCheck className="text-green-400 mr-2" size={12} />
                            ) : (
                                <FaTimes className="text-red-400 mr-2" size={12} />
                            )}
                            <span className={`text-xs ${criterion.isValid ? 'text-green-400' : 'text-red-400'}`}>
                                {criterion.label}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default PasswordInput