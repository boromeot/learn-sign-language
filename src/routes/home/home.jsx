import './home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='home-background'>
      <h1 className='home-heading'>Hand speak</h1>
      <Link to={'/lessons'} className="home-cta btn">
        Let's go
      </Link>
    </div>
  )
}