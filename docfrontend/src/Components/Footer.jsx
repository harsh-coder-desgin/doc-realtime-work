function Footer() {
    return (
        <footer className="bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center md:items-start justify-between">
                <div className="text-center md:text-left mt-6 md:mt-0 max-w-md space-y-3">
                    <h3 className="text-[25px] font-semibold">About Us</h3>
                    <p className="text-white text-sm leading-relaxed">
                        We empower learners to make confident decisions by providing trusted course reviews, genuine student feedback and carefully curated learning recommendations.
                    </p>
                    <div className="flex justify-end space-x-2 mr-90 mt-5">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src="/linkedin.png" alt="LinkedIn" className="h-9 w-10 hover:opacity-80 transition" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src="/github.png" alt="GitHub" className="h-9 w-10 hover:opacity-80 transition" />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <img src="/logoreview.png" alt="Logo" className="h-16 w-16 object-contain" />
                    <p className="text-sm text-white mt-20">© 2026. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer
