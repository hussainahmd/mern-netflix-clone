
const FormInput = ({type, placeholder, id, value, onChange}) => {

    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-gray-300 block mb-1">
                {id.charAt(0).toUpperCase() + id.slice(1)}
            </label>
            <input
                type={type}
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white
                                focus:outilne-none focus:ring"
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            />
        </div>
    )
}

export default FormInput