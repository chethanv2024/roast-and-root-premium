import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plus, ArrowUpRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()
  return <motion.article className="product-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-35px' }} transition={{ delay: index * .07, duration: .55 }}>
    <Link to={`/product/${product.id}`} className="product-image-wrap"><img src={product.image} alt={product.name} loading="lazy"/><span className="product-tag">{product.tag}</span><span className="product-view"><ArrowUpRight size={17}/></span></Link>
    <div className="product-card-info"><div><p className="product-origin">{product.origin}</p><Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link><p className="tasting-notes">{product.notes}</p></div><div className="product-buy"><span>${product.price}</span><button aria-label={`Add ${product.name} to cart`} onClick={() => addToCart(product)}><Plus size={17}/></button></div></div>
  </motion.article>
}
