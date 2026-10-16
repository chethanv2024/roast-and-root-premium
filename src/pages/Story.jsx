
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import FallingCoffeeBeans from '../components/FallingCoffeeBeans'

export default function Story() {
  return (
    <section className="story-page">
      <FallingCoffeeBeans />

      <div className="story-hero shell section-pad">
        <p className="eyebrow">OUR LITTLE CORNER OF COFFEE</p>

        <h1>
          Rooted in good.
          <br />
          <em>Roasted with care.</em>
        </h1>

        <p>
          We started with a simple thought: coffee could be more than a
          caffeine fix. It could be a reason to pause, gather, and feel a
          little more here.
        </p>

        <div className="story-hero-image">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1800&q=90"
            alt="Coffee being prepared with care"
          />
          <span>GOOD THINGS GROW SLOWLY</span>
        </div>
      </div>

      <div className="story-values shell section-pad">
        <div>
          <p className="eyebrow">WHAT WE BELIEVE</p>
          <h2>
            Better coffee begins
            <br />
            with <em>better choices.</em>
          </h2>
        </div>

        <div className="values-grid">
          <article>
            <span>01</span>
            <h3>Know the roots.</h3>
            <p>
              We build relationships with growers and importers who care
              about the land, the people, and the long view.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Let it take time.</h3>
            <p>
              Small batches, thoughtful profiles, and a little patience
              make room for each coffee's own character.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Share the good.</h3>
            <p>
              Coffee is better together. We want every bag to create a
              moment worth sharing.
            </p>
          </article>
        </div>
      </div>

      <div className="story-quote">
        <span>✳</span>
        <blockquote>
          “The point was never to make mornings faster. It was to make
          them feel like yours.”
        </blockquote>
        <small>THE ROAST & ROOT WAY</small>
      </div>

      <div className="story-cta shell">
        <div>
          <p className="eyebrow">READY WHEN YOU ARE</p>
          <h2>
            Let's make a little <em>ritual.</em>
          </h2>
        </div>

        <Link to="/shop" className="button button-dark">
          Find your coffee <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
