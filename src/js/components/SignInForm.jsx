import React, { useState } from "react";

// components
import { landingPage, signPage } from "./app";
import { checkEmail, checkPassword } from "../inputValidation";

export default function ({signUp}) {
    const [value, setValue] = useState(null)

    const handleChange = ({ target }) => {
        setValue(prevValue => ({
            ...prevValue,
            [target.name]: target.value
        }))

        const errorMessage = document.querySelector(`.sign-error-message[data-label=${target.name}]`)
        const errorAuthnMessage = document.querySelector('.sign-error-authn-message')
        errorMessage.textContent = ''
        errorAuthnMessage.textContent = ''
        target.removeAttribute('error')
    }

    const getUsers = async () => {
        try {
            const response = await fetch('/api/users')
            if (response.ok) {
                const jsonResponse = await response.json()
                return jsonResponse.users
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    const userAuthn = (users, value, inputs) => {
        const {email, password} = value
        let findUser = users.find(el => {
            return el.password === password && el.email === email
        })
    
        if (findUser) {
            sessionStorage.setItem('name', findUser.name)
            sessionStorage.setItem('isLogged', 'true')
            landingPage()
        } else if (findUser === undefined || !findUser) {
            const errorAuthnMessage = document.querySelector('.sign-error-authn-message')
            errorAuthnMessage.textContent = 'Wrong email or password.'
            inputs.forEach(el => el.setAttribute('error', ''))
        }

        return findUser = null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = document.querySelector('input[name=email]')
        const password = document.querySelector('input[name=password]')

        let isValid =
            checkEmail(email) &&
            checkPassword(password, false)
        if (isValid) {
            const users = await getUsers()
            userAuthn(users, value, [email, password])
        }

        return
    }

    const handleClick = () => landingPage()

    const handleClick_signUp = ({target}) => {
        const {dataset} = target
        signPage(dataset.typeSign)
    }

    return (
        <div className="sign-form-container">
            <h2><a href="#Home" onClick={handleClick} >Fiber</a></h2>
            <h1>Sign in you Fiber account</h1>
            <form className="sign-form" id='SU_form' onSubmit={handleSubmit} >
                <label htmlFor="">E-mail</label>
                <input type="email" name="email" id="SI_email" onChange={handleChange} placeholder='john@example.com' />
                <small className="sign-error-message" data-label = 'email'></small>

                <label htmlFor="">Password</label>
                <input type="password" name="password" id="SI_password" onChange={handleChange} placeholder='Password' />
                <small className="sign-error-message" data-label = 'password'></small>

                <small className="sign-error-authn-message"></small>
                <input type="submit" value="Sign in Fiber Account" />
                <p>You don't have an account yet? <a href="#" data-type-sign={signUp} onClick={handleClick_signUp}>Create an account</a></p>
            </form>
        </div>
    )
}