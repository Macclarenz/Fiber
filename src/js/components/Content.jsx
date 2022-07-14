import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// images and icons
import pageImg from '../../Assets/Page-Image.png'
import timeIcon from '../../Assets/time.svg'
import codeIcon from '../../Assets/code.svg'
import responsiveIcon from '../../Assets/allSizes.svg'


export default function () {
    const contentSectionArr = [
        {
            h2: <h3>Build in minutes</h3>,
            p: <p>With a selection of premade templates, you can build out a portfolio in less than 10 minutes.</p>,
            icon: timeIcon,
            iconAlt: 'Time icon'
        }, {
            h2: <h3>Add custom CSS</h3>,
            p: <p>Customize your personal portfolio even more with the ability to add you own custom CSS styles.</p>,
            icon: codeIcon,
            iconAlt: 'Code icon'
        }, {
            h2: <h3>Responsive</h3>,
            p: <p>All Fiber templates are fully responsive to ensure the experience is seemless acorss all devices.</p>,
            icon: responsiveIcon,
            iconAlt: 'All size icon (tablet, mobile icons)'
        }, 
    ]

    const contentSectionEl = contentSectionArr.map((el, i) => (
        <section key={i} className="content-section content-section-1">
            <img src={el.icon} alt={el.iconAlt} />
            {el.h2}
            {el.p}
        </section>
    ))

    const contentSectionRef = useRef(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.from(contentSectionRef.current.children, {
            scrollTrigger: {
                trigger: contentSectionRef.current,
                toggleActions: 'play none none none',
                start: 150
            },
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            stagger: .25,
        })
    }, [])

    return (
        <div className="content-container">
            <div className="content-small-container-1 content-small-container">
                <h3>Why Fiber?</h3>
                <h2>A good portfolio means good employability</h2>
                <div className="content-section-container" ref={contentSectionRef}>
                    {contentSectionEl}
                </div>
            </div>
            <div className="content-small-container-2 content-small-container">
                <section className="content-text-container">
                    <h2>Diversify your portfolio.</h2>
                    <p>Create an even more impressive portfolio by creating case studies for your projects. Simply follow our step-by-step guide.</p>
                    <a href="#" className="content-link-free-trial">Start Free Trial</a>
                </section>
                <div className="content-image-container"><img src={pageImg} alt="Page image" /></div>
            </div>
        </div>
    )
}