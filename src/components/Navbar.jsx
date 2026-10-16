import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ShoppingBag, Coffee } from 'lucide-react'
import { useCart } from '../context/CartContext'
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()
  const links = [['Shop', '/shop'], ['Our story', '/story'], ['Journal', '/journal'], ['Contact', '/contact']]
  return <header className="site-header">
    <div className="announcement">A LITTLE RITUAL, A BETTER MORNING <span>✳</span> FREE SHIPPING OVER $45</div>
    <nav className="navbar shell">
      <button className="icon-button mobile-menu" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <Link to="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark"><Coffee size={20}/></span><span>ROAST <i>&</i> ROOT<small>COFFEE, ROOTED IN RITUAL</small></span></Link>
      <div className={`nav-links ${open ? 'is-open' : ''}`}>{links.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}</div>
      <Link className="cart-link" to="/cart" aria-label={`Cart, ${itemCount} items`}><span>Cart</span><ShoppingBag size={19}/><b>{itemCount}</b></Link>
    </nav>
  </header>
}
