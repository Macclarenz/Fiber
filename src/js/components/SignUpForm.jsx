import React, { useEffect, useState } from "react";
import { checkEmail, checkNotDuplicate, checkName, checkPassword, checkTerms } from "../inputValidation";

// components
import { landingPage, signPage } from "./app";

export default function ({ signIn }) {
    const [value, setValue] = useState(null)
    const [emails, setEmails] = useState(null)

    const getValue = ({ target }) => {
        const { name, value } = target
        setValue(prevValue => ({
            ...prevValue,
            [name]: value
        }))

        const errorMessage = document.querySelector(`.sign-error-message[data-label=${name}]`)
        errorMessage.textContent = ''
        target.removeAttribute('error')
    }

    const getEmails = async () => {
        try {
            const response = await fetch('/api/users')
            if (response.ok) {
                const jsonResponse = await response.json()
                setEmails(() => jsonResponse.users.map(el => el.email))
            }
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getEmails()
    }, [])

    const createUser = async () => {
        try {
            await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(value)
            })
            clearInputs()
            sessionStorage.setItem('name', value.name)
            sessionStorage.setItem('isLogged', 'true')
            setValue(null)
            return landingPage()
        } catch (err) {
            console.error(err.message)
        }
    }

    const clearInputs = () => {
        const form = document.querySelector('#SU_form')
        const inputs = form.querySelectorAll('input[type=text], input[type=email], input[type=password]')
        inputs.forEach(el => el.value = '')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = document.querySelector('input[name=name]')
        const email = document.querySelector('input[name=email]')
        const password = document.querySelector('input[name=password]')
        const terms = document.querySelector('input[name=terms]')

        let isValid =
            checkName(name) &&
            checkEmail(email) &&   
            checkPassword(password) &&
            checkTerms(terms) && 
            checkNotDuplicate(email, emails) 

        if (isValid) {
            createUser()
            return setEmails(null)
        }
    }

    const handleClick = () => landingPage()

    const handleClick_signIn = ({ target }) => {
        const { dataset } = target
        signPage(dataset.typeSign)
    }

    const handleChecked = ({target}) => {
        const { parentElement } = target
        parentElement.removeAttribute('error')
    }

    return (
        <div className="sign-form-container" onSubmit={handleSubmit}>
            <h2><a href="#Home" onClick={handleClick}>Fiber</a></h2>
            <h1>Create your Fiber account</h1>
            <form className="sign-form" id='SU_form'>
                <label htmlFor="SU_name">Your Name</label>
                <input type="text" name="name" id="SU_name" onChange={getValue} placeholder='John Doe' />
                <small data-label='name' className="sign-error-message"></small>

                <label htmlFor="SU_email">E-mail</label>
                <input type="text" name="email" id="SU_email" onChange={getValue} placeholder='john@example.com' />
                <small data-label='email' className="sign-error-message"></small>

                <label htmlFor="SU_password">Password</label>
                <input type="password" name="password" id="SU_password" onChange={getValue} placeholder='At least 8 characters' />
                <small data-label='password' className="sign-error-message"></small>

                <label htmlFor="SU_terms">
                    <input type="checkbox" name="terms" id="SU_terms" onChange={handleChecked} />
                    <p>By creating an account on Fiber, you agree to the <a href="#">Terms & Conditions</a></p>
                </label>

                <input type="submit" value="Create Fiber Account" />
                <p>Already have an account? <a href="#" data-type-sign={signIn} onClick={handleClick_signIn}>Sign in</a></p>
            </form>
        </div>
    )
}