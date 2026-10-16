import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
const articles = [
 { category:'THE BREW GUIDE', date:'5 MIN READ', title:'A softer start: the case for a slower morning', image:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1100&q=85', text:'A few small changes that make your first cup feel less like a task and more like a ritual.' },
 { category:'BREW BETTER', date:'4 MIN READ', title:'Pour-over, without the pressure', image:'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1100&q=85', text:'A friendly guide to getting a bright, balanced cup—no barista degree required.' },
 { category:'BEHIND THE BEANS', date:'6 MIN READ', title:'Why origin is only the beginning', image:'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1100&q=85', text:'Meet the details that shape a coffee, from the people who grow it to the roast that brings it to life.' }
]
export default function Journal() {
 return <section className="journal-page shell section-pad"><div className="page-intro"><p className="eyebrow">NOTES FROM OUR WORLD</p><h1>The slow <em>edit.</em></h1><p>Good reads for curious coffee people and anyone learning to take a breath.</p></div><div className="journal-grid">{articles.map((a,i)=><article className={`journal-card journal-card-${i+1}`} key={a.title}><Link to="/story" className="journal-image"><img src={a.image} alt={a.title}/><span><ArrowUpRight size={19}/></span></Link><div className="journal-meta"><span>{a.category}</span><span>{a.date}</span></div><h2><Link to="/story">{a.title}</Link></h2><p>{a.text}</p><Link className="text-link" to="/story">Read the story <ArrowUpRight size={15}/></Link></article>)}</div><div className="journal-note"><span>✳</span><p>Take what you need. Leave the rush behind.</p></div></section>
}
