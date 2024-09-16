import { Link } from "react-router-dom"

const FormDetail = ({ link, text }) => {
    return (
        <div className="text-center text-gray-200">
            {text}
            <Link to={link} className="text-red-500 hover:underline">
                {link === '/signup' ? 'Sign Up' : 'Login'}
            </Link>
        </div>
    )
}

export default FormDetail