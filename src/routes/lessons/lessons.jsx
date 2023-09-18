import { Link } from 'react-router-dom';
import './lessons.css';

export default function Lessons() {
  return (
    <div className="lessons-background">
      <div className='lessons-container'>
        <h1 className='lessons-header'>Learning your abcs</h1>
        <Link to={'/lessons/0'} className='btn btn1'>A - I</Link>
        <Link to={'/lessons/0'} className='btn btn1'>J - R</Link>
        <Link to={'/lessons/0'} className='btn btn1'>S - Z</Link>
      </div>
      <Link to={'/lessons/1'} className='lesson-btn hlb1 btn btn1'>
        Lesson 1
      </Link>
      <Link to={'/lessons/2'} className='lesson-btn hlb2 btn btn1'>
        Lesson 2
      </Link>
      <Link to={'/lessons/3'} className='lesson-btn hlb3 btn btn1'>
        Lesson 3
      </Link>
      <Link to={'/lessons/4'} className='lesson-btn hlb4 btn btn1'>
        Lesson 4
      </Link>
    </div>
  )
}