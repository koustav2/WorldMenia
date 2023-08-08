'use client'

import ThemeContext, { useTheme } from "@/context/themeContext"
import '../../styles.css/header.css'
import { BiMoon } from "react-icons/bi"


function Header() {
    const { theme } = useTheme();

    const toggleTheme = () => {
        alert(
            'Something went wrong, please try again later'
        )


    }



    return (
        <header className={`app ${theme}`}>
            <nav>
                <div className="where-to-div">
                    <h2>Where in the world?</h2>
                </div>
                <div className="theme-changer-div" onClick={toggleTheme}>
                    <BiMoon className="moon-icon" />
                    <p className="dark-mode-txt">Dark Mode</p>
                </div>
            </nav>
        </header>
    )
}

export default Header
