
const FormButton = ({title, disabled}) => {
    return (
        <button disabled={disabled} className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 ease-in-dout hover:scale-x-90 hover:shadow-[0px_0px_8px_0px_#ffffffcc]">
            {title}
        </button>
    )
}

export default FormButton