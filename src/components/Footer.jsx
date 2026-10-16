import { Link } from 'react-router-dom'
import { ArrowUpRight, Instagram } from 'lucide-react'
export default function Footer() {
  return <footer className="footer">
    <div className="footer-top shell">
      <div className="footer-brand"><Link to="/" className="brand brand-light"><span className="brand-mark">✳</span><span>ROAST <i>&</i> ROOT<small>COFFEE, ROOTED IN RITUAL</small></span></Link><p>Good coffee. Grounded values.<br/>A little more present, every day.</p></div>
      <div className="footer-col"><p className="eyebrow">EXPLORE</p><Link to="/shop">Shop coffee</Link><Link to="/story">Our story</Link><Link to="/journal">Journal</Link></div>
      <div className="footer-col"><p className="eyebrow">SAY HELLO</p><a href="mailto:hello@roastandroot.example">hello@roastandroot.example <ArrowUpRight size={14}/></a><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <Instagram size={14}/></a></div>
      <div className="footer-note"><span className="sun-stamp">R<span>✳</span>R</span><p>Made for the moments<br/>in between.</p></div>
    </div>
    <div className="footer-bottom shell"><span>© 2026 ROAST & ROOT CO.</span><span>THOUGHTFULLY SOURCED. SLOWLY ROASTED.</span><a href="#top">BACK TO TOP ↑</a></div>
  </footer>
}
