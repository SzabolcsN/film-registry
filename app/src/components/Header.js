import logo from "../images/logo.png"
import ThemeChanger from "./ThemeChanger"

const Header = () => {
    return(
        <header className="py-2 inset-x-0 top-0">
            <nav className="relative flex justify-between">
                <img src={logo} alt="Logo" className="h-16" />
                <ThemeChanger />
            </nav>
        </header>
    )
}

export default Header;