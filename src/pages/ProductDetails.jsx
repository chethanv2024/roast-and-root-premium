import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, Check } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()
  const navigate = useNavigate()
  if (!product) return <section className="not-found section-pad shell"><p className="eyebrow">NOT FOUND</p><h1>This coffee has wandered off.</h1><Link className="button button-dark" to="/shop">Back to shop</Link></section>
  return <section className="detail-page shell section-pad"><Link to="/shop" className="back-link"><ArrowLeft size={15}/> Back to all coffee</Link><div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.name}/><span className="product-tag">{product.tag}</span></div><div className="detail-copy"><p className="eyebrow">{product.origin}</p><h1>{product.name}</h1><p className="detail-price">${product.price} <span>/ {product.weight}</span></p><p className="detail-description">{product.description}</p><div className="detail-note"><span>IN THE CUP</span><strong>{product.notes}</strong><small>{product.roast.toUpperCase()}</small></div><div className="quantity-row"><span>QUANTITY</span><div><button onClick={()=>setQuantity(q=>Math.max(1,q-1))} aria-label="Decrease quantity"><Minus size={15}/></button><b>{quantity}</b><button onClick={()=>setQuantity(q=>q+1)} aria-label="Increase quantity"><Plus size={15}/></button></div></div><button className="button button-dark add-to-cart" onClick={()=>{addToCart(product,quantity);setAdded(true)}}>{added?<><Check size={17}/> Added to your bag</>:<>Add to bag — ${(product.price*quantity).toFixed(2)} <Plus size={17}/></>}</button>{added&&<button className="text-link view-bag" onClick={()=>navigate('/cart')}>View your bag →</button>}<p className="shipping-note">✳ Thoughtfully packed · Ships in 1–2 business days</p></div></div><div className="related-products"><div className="section-heading"><div><p className="eyebrow">KEEP EXPLORING</p><h2>More good <em>things.</em></h2></div></div><div className="product-grid">{products.filter(p=>p.id!==id).slice(0,3).map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div></div></section>
}
