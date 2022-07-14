import React from "react";

// components
import NavBar from "./NavBar";
import Hero from "./Hero";
import Content from "./Content";
import Review from "./Review";
import Footer from "./Footer";

export default function ({signPage, name, isLogged}) {
    return (
        <>
            <header>
                <NavBar 
                    signPage = {signPage} 
                    name = {name} 
                    isLogged = {isLogged} 
                />
                <Hero />
            </header>
            <main>
                <Content />
                <Review />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}