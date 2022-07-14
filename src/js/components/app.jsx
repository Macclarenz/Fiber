// scss file
import '../../sass/style.scss'

// React
import react from 'react'
import reactDom from 'react-dom'
import {createRoot} from 'react-dom/client'

// components
// import { SignPage } from './sign-up-page'
import LandingPage from './LandingPage'
import SignPage from './SignPage'

// server
import server from '../server'

const outerContainer = document.querySelector('.outer-container')
const root = createRoot(outerContainer)

server()

export function landingPage() {
    const name = sessionStorage.getItem('name')
    const isLogged = sessionStorage.getItem('isLogged') ? true : false
    root.render(
        <LandingPage 
            signPage={signPage} 
            name = {name} 
            isLogged = {isLogged} 
        />
    )
}

landingPage()

export function signPage(type) {
    root.render(
        <SignPage type = {type}/>
    )
}

