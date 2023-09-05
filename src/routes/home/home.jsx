import './home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='home-background'>
      <h1 className='home-heading'>Hand speak</h1>
      <h3 className='home-heading-secondary'>An interactive sign language learning experience</h3>
      <Link to={'/lessons'} className="home-cta btn btn1">
        Let's go
      </Link>
    </div>
  )
}