import { connect, useDispatch } from "react-redux"
import { useEffect } from "react"

import { ReactComponent as DarkTheme } from "../images/dark-theme.svg"
import { ReactComponent as LightTheme } from "../images/light-theme.svg"

import { updateTheme } from "../actions/theme"

// add and remove "dark" class to the html tag - control tailwind css dark and light theme
function ThemeChanger(props) {
    const dispatch = useDispatch()
    const theme = props.theme

    const handleThemeSwitch = () => {
        dispatch(updateTheme())
    }

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    return (
        <div className="grid place-items-center">
            <button onClick={handleThemeSwitch}>
                <LightTheme className="hidden dark:block h-7 w-auto" />
                <DarkTheme className="dark:hidden block h-7 w-auto" />
            </button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme,
    }
}

export default connect(mapStateToProps, {
    updateTheme,
})(ThemeChanger)
