import React, { useEffect, useState } from "react";

// icons
import hamburgerMenu from '../../Assets/Hamburger Menu.svg'
import { landingPage } from "./app";

export default function ({signPage, name, isLogged}) {
    const navArr = [
        ['Community', 'Pricing', 'Features'],
        ['Sign In', 'Sign Up']
    ]

    const navMainEl = navArr[0].map((el, i) => (
        <a href={el} key={i}>{el}</a>
    ))

    const handleClick_sign = ({target}) => {
        const { dataset } = target
        loadSignPage(dataset.typeSign)
    }

    const loadSignPage = (typeSign) => {
        signPage(typeSign)
    }

    // DEFAULT (SIGN-IN & SIGN-UP)
    const navSignEl = navArr[1].map((el, i) => (
        <a href={`#${el}`} key={i} onClick={handleClick_sign} data-type-sign = {el}>{el}</a>
    ))

    const logout = () => {
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('isLogged')
        landingPage()
    }

    const handleClick_user = (e) => {
        logout()
    }

    // IF USER IS ALREADY LOGGED OR SIGNED
    const navUserEl = [
        <a href="#" key={1}>{name}</a>, 
        <a href="#" key={2} onClick={handleClick_user}>Log out</a>
    ]

    const handleResize = ({target}) => {
        if (target.innerWidth >= 1024) setNavHamburger({display: 'none'})
        else setNavHamburger({display: 'block'})
    }

    const [navHamburger, setNavHamburger] = useState(() => window.innerWidth >= 1024 ? {display: 'none'} : {display: 'block'})

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const navOpen = () => {
        const navContainer = document.querySelector('.nav-container')
        navContainer.toggleAttribute('open')
    }

    const handleClick_nav = () => {
        return navOpen()
    }

    return (
        <div className="navBar-container">
            <a href="Home" className="nav-logo">Fiber</a>
            <button className="nav-hamburger" type='button' style={navHamburger} onClick={handleClick_nav}><img src={hamburgerMenu} alt="Hamburger menu" /></button>
            <div className="nav-container">
                <nav className="nav-main">
                    {navMainEl}
                </nav>
                <nav className="nav-sign">
                   {name && isLogged ? navUserEl : navSignEl}
                </nav>
            </div>
        </div>
    )
}