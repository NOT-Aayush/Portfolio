import "../css/Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-left">
      © {new Date().getFullYear()} Aayush Pandey
    </div>
    <div className="footer-right">
      Built with <span className="footer-heart">♥</span> by Aayush
    </div>
  </footer>
);

export default Footer;
