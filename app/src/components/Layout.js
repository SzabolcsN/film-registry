import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {
    return (
        <div>
            <div className="text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Layout;