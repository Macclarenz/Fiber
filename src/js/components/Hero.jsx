import React, { useEffect, useState } from "react";

// icons and images
import heroImg from '../../Assets/hero-Illustration.png'
import checkLogo from '../../Assets/Checkmark.svg'
import starIcon from '../../Assets/star.svg'

export default function () {
    const [displayRating, setDisplayRating] = useState(() => window.innerWidth >= 1024 ? { display: 'block' } : { display: 'none' })

    const handleResize = ({ target }) => {
        if (target.innerWidth >= 1024) setDisplayRating({ display: 'block' })
        else setDisplayRating({ display: 'none' })
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const checkListArr = [
        'No Credit Card Required',
        '10 Free Templates'
    ]

    const checkListEl = checkListArr.map((el, i) => (
        <li key={i}><img src={checkLogo} alt="check logo" /> {el}</li>
    ))

    const rating = {
        icon: function () {
            let i = 1
            let starArr = []
            while (i <= 5) {
                starArr.push(<img src={starIcon} alt='star icon' key={i} />)
                i++
            }
            return starArr
        },
        rate: 'Rated 4.8/5 (243 reviews)'
    }

    return (
        <div className="hero-container">
            <div className="hero-first-column">
                <img src={heroImg} className="hero-img" alt="vr, social platform image" />
            </div>
            <div className="hero-second-column">
                <div className="hero-rating-container" style={displayRating}>
                    <span className="hero-rating-star-container">{rating.icon()}</span> <span>{rating.rate}</span>
                </div>
                <h1>Create your portfolio in minutes.</h1>
                <p>With Fiber, you can setup your own personal portfolio in minutes with dozens of premade, beautiful templates.</p>
                <div className="hero-link-container">
                    <a href="#" className="hero-link-free-trial">Start Free Trial</a>
                    <a href="#" className="hero-link-view-examples">View Examples</a>
                </div>
                <ul className="hero-checklist-container">{checkListEl}</ul>
            </div>
        </div>
    )
}