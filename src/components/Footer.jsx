function Footer() {
    return (
        <div className='bg-gradient-to-r from-slate-200 from-0% via-slate-400 to-slate-200 to-100% text-center w-screen border-t-4 border-teal-200'>
            <p>
                By danishKodeMonkey@
                <a href='https://github.com/DanishKodeMonkey'>GitHub.com</a>
            </p>
            <p>
                Powered by <a href='https://vitejs.dev/'>React-Vite</a> and{' '}
                <a href='https://github.com/DanishKodeMonkey/DKM-blog-backend'>
                    DKM blog backend API
                </a>
            </p>
        </div>
    );
}

export default Footer;
