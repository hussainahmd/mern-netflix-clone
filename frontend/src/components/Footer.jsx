const Footer = () => {
    return (
        <footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t-8 border-[#232323]'>
            <div className='flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row'>
                <p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-right'>
                    Built by{" "}
                    <a
                        href='https://github.com/hussainahmd'
                        target='_blank'
                        className='font-medium underline underline-offset-4 hover:text-blue-500'
                    >
                        Hussain
                    </a>
                    . The source code is available on{" "}
                    <a
                        href='https://github.com/hussainahmd'
                        target='_blank'
                        rel='noreferrer'
                        className='font-medium underline underline-offset-4 hover:text-blue-500'
                    >
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
}
export default Footer