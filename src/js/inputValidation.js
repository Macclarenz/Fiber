// input value validation
const isRequired = value => !value ? false : true
const isEmailValid = value => {
    const emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return emailRegExp.test(value)
}
const isBetween = value => {
    const passwordRegExp = new RegExp(/^(?=.{8,})/)
    return passwordRegExp.test(value)
}

// error message
const errorMessage = {
    isRequired: 'Please fill the blank.',
    isEmailValid: 'Wrong email format.',
    isBetween: 'Must be atleast 8 characters.',
    isEmailDuplicate: 'Email already exist.'
}

// show error success func
const showError = (input, message) => {
    input.setAttribute('error', '')

    const errorMessage = document.querySelector(`small[data-label=${input.name}]`)
    if (!errorMessage) return

    errorMessage.textContent = message
    return
}

const showSuccess = input => {
    input.removeAttribute('error')
    const errorMessage = document.querySelector(`small[data-label=${input.name}]`)
    errorMessage.textContent = ''
    return
}

// check input func
const checkName = input => {
    const { value } = input
    if (!isRequired(value)) {
        showError(input, errorMessage.isRequired)
        return false
    } else {
        showSuccess(input)
        return true
    }
}

const checkEmail = input => {
    const { value } = input
    if (!isRequired(value)) {
        showError(input, errorMessage.isRequired)
        return false
    }

    if (!isEmailValid(value)) {
        showError(input, errorMessage.isEmailValid)
        return false
    }

    showSuccess(input)
    return true
}

const checkPassword = (input, isSignUp = true) => {
    const { value } = input
    if (!isRequired(value)) {
        showError(input, errorMessage.isRequired)
        return false
    }

    if (isSignUp) {
        if (!isBetween(value)) {
            showError(input, errorMessage.isBetween)
            return false
        }
    }

    showSuccess(input)
    return true
}

const checkTerms = (input) => {
    const { checked, parentElement } = input
    if (!checked) {
        parentElement.setAttribute('error', '')
        return false
    }

    parentElement.removeAttribute('error')

    return true
}

const checkNotDuplicate = (input, data) => {
    if (!data) return

    const { value } = input
    let duplicate = data.find(el => el === value)

    if (duplicate) {
        showError(input, errorMessage.isEmailDuplicate)
        return false
    } else return true
}

export {
    checkName,
    checkEmail,
    checkPassword,
    checkTerms,
    checkNotDuplicate
}