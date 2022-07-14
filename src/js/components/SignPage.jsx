import React, { useEffect } from "react";

// components
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import SliderImage from "./SliderImage";
import { imageServer, userServer } from "../server";

export default function ({type}) {
    let form
    const typeForm = ['Sign In', 'Sign Up']

    if (type === typeForm[0]) form = <SignInForm signUp = {typeForm[1]} />
    else form = <SignUpForm signIn = {typeForm[0]}/>

    return (
        <div className="sign-page-container">
            {form}
            <SliderImage />
        </div>
    )
}