import React, { useEffect, useState } from "react";

export default function () {
    const [portfolio, setPortfolio] = useState(null)

    useEffect(() => {
        getPortfolios()
        return () => getPortfolios
    }, [])

    const getPortfolios = async () => {
        try {
            const response = await fetch('/api/reviews')
            if (response.ok) {
                const jsonResponse = await response.json()
                setPortfolio(jsonResponse.reviews)
            }
        } catch(err) {
            console.error("Error failed to connect: " + err)
        }
    }

    const footerLinksArr = {
        sitemap: [
            'Homepage', 'Pricing', 'Testimonials', 'Features'
        ], resource: [
            'Support', 'Contact', 'FAQ'
        ], company: [
            'About', 'Customer', 'Blog'
        ], portfolio
    }

    const sitemapLinks = footerLinksArr.sitemap.map((el, i) => (
        <li className="footer-list-item" key={i}><a href={`#${el}`} className="footer-link">{el}</a></li>
    ))

    const resourceLinks = footerLinksArr.resource.map((el, i) => (
        <li className="footer-list-item" key={i}><a href={`#${el}`} className="footer-link">{el}</a></li>
    ))

    const companyLinks = footerLinksArr.company.map((el, i) => (
        <li className="footer-list-item" key={i}><a href={`#${el}`} className="footer-link">{el}</a></li>
    ))

    const portfolioLinks = footerLinksArr.portfolio?.map(el => (
        <li className="footer-list-item" key={el.id}><a href={`#${el.user.name}`} className='footer-link'>{el.user.name}</a></li>
    ))

    return (
        <div className="footer-container">
            <div className="footer-text">
                <h3>Fiber</h3>
                <p>With Fiber, you can setup your own personal portfolio in minutes with dozens of premade, beautiful templates.</p>
                <p>Made with ♥ in the Netherlands.</p>
            </div>
            <ul className="footer-link-list footer-link-list-1 footer-sitemap-list">
                <li><h3>Sitemap</h3></li>
                {sitemapLinks}
            </ul>
            <ul className="footer-link-list footer-link-list-2 footer-resource-list">
                <li><h3>Resource</h3></li>
                {resourceLinks}
            </ul>
            <ul className="footer-link-list footer-link-list-3 footer-company-list">
                <li><h3>Company</h3></li>
                {companyLinks}
            </ul>
            <ul className="footer-link-list footer-link-list-4 footer-portfolio-list">
                <li><h3>Portfolios</h3></li>
                {footerLinksArr.portfolio && portfolioLinks}
            </ul>
        </div>
    )
}