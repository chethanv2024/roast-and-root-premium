import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
export default function Shop() {
  const [filter, setFilter] = useState('All coffee')
  const [sort, setSort] = useState('featured')
  const filters = ['All coffee', 'Light roast', 'Medium roast', 'Dark roast']
  const visible = useMemo(() => {
    let result = filter === 'All coffee' ? [...products] : products.filter(p => p.roast === filter)
    if (sort === 'price-low') result.sort((a,b)=>a.price-b.price)
    if (sort === 'price-high') result.sort((a,b)=>b.price-a.price)
    return result
  }, [filter, sort])
  return <section className="shop-page shell section-pad"><div className="page-intro"><p className="eyebrow">THE ROAST & ROOT COLLECTION</p><h1>Find your <em>favourite.</em></h1><p>Every bag has a place, a person, and a little story behind it.</p></div><div className="shop-toolbar"><div className="filter-list"><SlidersHorizontal size={16}/>{filters.map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}</button>)}</div><label className="sort-label">SORT BY <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div><p className="result-count">{visible.length} coffees to fall for</p><div className="product-grid shop-grid">{visible.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div><div className="shop-promise"><span>✳</span><p><strong>Freshly roasted, always.</strong><br/>Your coffee is roasted in small batches and packed with care.</p></div></section>
}
