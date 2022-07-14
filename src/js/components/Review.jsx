import React, { useEffect, useRef, useState } from "react";
import DragToScroll from "../DragToScroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function () {
    const [review, setReview] = useState(null)

    useEffect(() => {
        getReviews()
    }, [])

    const getReviews = async () => {
        try {
            const response = await fetch('/api/reviews')
            if (response.ok) {
                const jsonResponse = await response.json()
                setReview(jsonResponse.reviews)
            }
        } catch (err) {
            console.error('Error failed to connect:' + err.message)
        }
    }

    const addPossessionName = (name) => {
        if (!name) return
        const firstName = name.split(' ')[0]
        const lastLetter = firstName[firstName.length - 1]
        return lastLetter === 's' ? `${firstName}'` : `${firstName}'s`
    }

    useEffect(() => {
        if (window.innerWidth >= 1024) {
            const reviewContainer = document.querySelector('.review-container')
            DragToScroll(reviewContainer)
            return () => DragToScroll(reviewContainer)
        } else return
    }, [])

    const handleResize = ({ target }) => {
        if (target.innerWidth >= 1024) {
            const reviewContainer = document.querySelector('.review-container')
            DragToScroll(reviewContainer)
        } else return
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const reviewEl = review?.map(el => (
        <section className={`review-${el.id} review`} key={el.id}>
            <div className="review-user-container">
                <img src={el.user.profileImage} alt="Profile image" />
                <div className="review-user-text-container">
                    <h3>{el.user.name}</h3>
                    <p>{el.user.revenue}</p>
                </div>
            </div>
            <p>{el.text}</p>
            <a href={`#${addPossessionName(el.user.name)}`}>View {addPossessionName(el.user.name)} Portfolio</a>
        </section>
    ))

    // animation
    const reviewRef = useRef(null)

    useEffect(() => {
        const reviews = document?.querySelectorAll('.review')
        if (!reviews.length) return
        gsap.registerPlugin(ScrollTrigger)
        gsap.from(reviewRef.current.children, {
            scrollTrigger: reviews,
            opacity: 0,
            x: 200, 
            duration: 1.5, 
            ease: 'power3.out',
            stagger: .10
        })
    }, [review])

    return (
        <div className="review-container" ref={reviewRef}>
            {reviewEl}
        </div>
    )
}

// window.addEventListener('i')