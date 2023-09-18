import { Link } from 'react-router-dom';
import './lessons.css';

export default function Lessons() {
  return (
    <div className="lessons-background">
      <div className='lessons-container --abcs'>
        <h1 className='lessons-header'>1.) Learning your abcs</h1>
        <Link to={'/lessons/A-I'} className='btn btn1'>A - I</Link>
        <Link to={'/lessons/J-R'} className='btn btn1'>J - R</Link>
        <Link to={'/lessons/S-Z'} className='btn btn1'>S - Z</Link>
      </div>
      <div className='lessons-container --practice'>
        <h1 className='lessons-header'>2.) Practice</h1>
        <Link to={'/lessons/1'} className='btn btn1'>Lesson 1</Link>
        <Link to={'/lessons/2'} className='btn btn1'>Lesson 2</Link>
        <Link to={'/lessons/3'} className='btn btn1'>Lesson 3</Link>
        <Link to={'/lessons/4'} className='btn btn1'>Lesson 4</Link>
      </div>
    </div>
  )
}