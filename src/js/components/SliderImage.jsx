import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function () {
    const [images, setImages] = useState(null)

    useEffect(() => {
        getImages()
    }, [])

    const getImages = async () => {
        try {
            const response = await fetch('/api/images')
            if (response.ok) {
                const jsonResponse = await response.json()
                setImages(jsonResponse.images)
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    const imageEl = images?.map(el => (
        <img src={el.image} key={el.id} alt="page image" className="slider-image" />
    ))

    const buttonsSliderEl = images?.map(el => (
        <button disabled="disabled" key={el.id} className='slider-button'></button>
    ))

    // SLIDER IMAGE
    const [length, setLength] = useState(0)

    useEffect(() => {
        if (!imageEl) return
        setLength(imageEl.length)
    }, [imageEl])

    const [index, setIndex] = useState(0)

    const changeIndex = () => setIndex(prevIndex => {
        if (prevIndex === length - 1) return prevIndex = 0
        else return prevIndex + 1
    })

    useEffect(() => {
        const idInterval = setInterval(changeIndex, 5000)
        return () => clearInterval(idInterval)
    }, [length])

    const clearDisplayAttr = (arrEl) => {
        return arrEl.forEach(el => el.removeAttribute('display'))
    }

    const changeDisplayAttr = (arrEl, index) => {
        if (!arrEl.length) return
        clearDisplayAttr(arrEl)
        arrEl[index].toggleAttribute('display')
    }

    useEffect(() => {
        const sliderImages = document?.querySelectorAll('.slider-image')
        const sliderButtons = document?.querySelectorAll('.slider-button')
        changeDisplayAttr(sliderImages, index)
        changeDisplayAttr(sliderButtons, index)
    }, [index, imageEl])

    // animation
    useEffect(() => {
        const sliderContainer = document.querySelector('.slider-container')
        const sliderTextContainer = document.querySelector('.slider-text-container')
        const tl = gsap.timeline({ defaults: { ease: 'power2.out', delay: .5 } })

        tl.from(sliderContainer, { y: 30, opacity: 0, duration: 1 })
        tl.from(sliderTextContainer.children, { y: 30, opacity: 0, duration: 1, stagger: 0.10 }, '-=1')
    }, [])


    return (
        <div className="sign-slider-image-container">
            <div className="slider-container">
                {images && imageEl}
            </div>
            <div className="slider-text-container">
                <h2>Unparalleled Templates</h2>
                <p>Crafted by a team of professional designers, our templates are eunparalleled in the market</p>
                <div className="slider-button-container">
                    {images && buttonsSliderEl}
                </div>
            </div>
        </div>
    )
}