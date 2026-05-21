import '../css/Footer.css'

export default function Footer() {
    return (
        <div className="footer-content">
            <span>&copy; {new Date().getFullYear()} Company Platform Inc. All rights reserved.</span>
            <span className="footer-label">
                Build verified with
                <span className="dot-icon" />
                React & ASP.Net
            </span>
        </div>
    )
}