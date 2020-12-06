import React from 'react'

const LoginPage = () => {
    return (
        <a href={process.env.REACT_APP_LOGIN_URL}>login</a>
    )
}

export { LoginPage as default }