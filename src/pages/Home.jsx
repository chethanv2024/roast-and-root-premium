import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import BeanCanvas from '../components/BeanCanvas'
import { products } from '../data/products'

export default function Home() {
  return <>
    <section className="hero shell" id="top">
      <div className="hero-copy">
        <motion.p className="eyebrow" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15 }}>SMALL BATCH. BIG FEELING.</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: 'easeOut' }}>Make room<br/>for <em>good</em> things.</motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}>Thoughtfully sourced coffee for slower mornings, longer conversations, and all the little moments that make a day.</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}><Link className="button button-dark" to="/shop">Find your coffee <ArrowRight size={17}/></Link><Link className="text-link" to="/story">Our way of doing things <ArrowDownRight size={16}/></Link></motion.div>
        <div className="hero-proof"><div className="avatar-stack"><span>✳</span><span>R</span><span>☼</span></div><p><strong>4.9/5</strong> from coffee people<br/><small>ROASTED WITH A LITTLE MORE CARE</small></p></div>
      </div>
      <div className="hero-art hero-art-cup">
        <div className="cup-glow" aria-hidden="true"></div>
        <BeanCanvas/>
        <div className="cup-brand-label">ROAST <span>&amp;</span> ROOT</div>
        <div className="hero-caption"><span>SMALL BATCH COFFEE</span><span>THE EVERYDAY COLLECTION</span></div>
      </div>
      <div className="hero-side-note">SLOW DOWN. SIP WELL. REPEAT.</div>
    </section>
    <section className="marquee-band" aria-label="Brand values"><div className="marquee-track">{Array.from({length: 4}, (_, i) => <span key={i}>GOOD COFFEE, NO SHORTCUTS <b>✳</b> ROOTED IN GOODNESS <b>✳</b> MADE FOR YOUR MOMENT <b>✳</b></span>)}</div></section>
    <section className="section-pad product-section shell">
      <div className="section-heading"><div><p className="eyebrow"><Sparkles size={13}/> THE GOOD STUFF</p><h2>Your daily <em>little luxury.</em></h2></div><Link className="text-link" to="/shop">Shop all coffee <ArrowRight size={16}/></Link></div>
      <div className="product-grid">{products.slice(0,3).map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div>
    </section>
    <section className="manifesto">
      <div className="manifesto-image"><img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85" alt="Warm, sunlit coffee shop"/></div>
      <div className="manifesto-copy"><p className="eyebrow">A SMALL THING, DONE WELL</p><h2>Not just coffee.<br/><em>A way to come back</em><br/>to yourself.</h2><p>We believe the best things aren't rushed. That's why we work with thoughtful growers, roast in small batches, and leave room for the flavour to tell its story.</p><Link to="/story" className="button button-outline">Get to know us <ArrowRight size={16}/></Link><span className="handwritten">A little more present, every day.</span></div>
    </section>
    <section className="ritual-section shell section-pad"><div className="ritual-copy"><p className="eyebrow">YOUR RITUAL, YOUR RULES</p><h2>Find your kind<br/>of <em>slow.</em></h2><p>Espresso before the world wakes up. A pour-over while the rain taps the window. Your coffee should fit the life you live.</p><Link to="/shop" className="text-link">Explore the collection <ArrowRight size={16}/></Link></div><div className="ritual-collage"><img className="ritual-main" src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=85" alt="Pour-over coffee ritual"/><img className="ritual-small" src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=700&q=85" alt="Coffee cup and notebook"/><div className="round-note">PAUSE<br/>HERE <b>✳</b></div></div></section>
    <section className="newsletter"><div className="newsletter-inner shell"><div><p className="eyebrow">LETTERS, NOT NOISE</p><h2>A good thing<br/><em>in your inbox.</em></h2></div><form onSubmit={e=>{e.preventDefault();alert('Thanks for joining the Roast & Root list!')}}><label htmlFor="email">Occasional notes on coffee, rituals, and the art of slowing down.</label><div className="email-field"><input id="email" type="email" placeholder="Your email address" required/><button aria-label="Subscribe"><ArrowRight/></button></div><small>NO SPAM. JUST THE GOOD STUFF.</small></form></div></section>
  </>
}
