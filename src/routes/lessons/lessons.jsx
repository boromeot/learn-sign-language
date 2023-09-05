import { Link } from 'react-router-dom';
import './lessons.css';

export default function Lessons() {
  return (
    <div className="lessons-background">
      <Link to={'/lessons/1'} className='lesson-btn hlb1 btn'>
        Lesson 1
      </Link>
      <Link to={'/lessons/2'} className='lesson-btn hlb2 btn'>
        Lesson 2
      </Link>
      <Link to={'/lessons/3'} className='lesson-btn hlb3 btn'>
        Lesson 3
      </Link>
      <Link to={'/lessons/4'} className='lesson-btn hlb4 btn'>
        Lesson 4
      </Link>
    </div>
  )
}