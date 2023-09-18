import React, { useState, useRef, useEffect } from 'react';
import { draw, setHandDetector, detect } from './utills';
import { useParams } from 'react-router-dom';
import lessons from './words';
import Webcam from 'react-webcam';
import './App.css'

function App() {
  const imageSrc = {};
  for (let letter = 'A'.charCodeAt(0); letter <= 'Z'.charCodeAt(0); letter++) {
    const letterSrc = `/handSigns/letter${String.fromCharCode(letter)}.png`;
    imageSrc[String.fromCharCode(letter)] = letterSrc
  }
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  
  const { lessonId } = useParams();
  
  const [words, setWords] = useState(lessons[lessonId]);
  const [wordIndex, setWordIndex] = useState(0);
  const [word, setWord] = useState(words[0]);
  const [letterIndex, setIndex] = useState(0);
  const [guessLetter, setGuessLetter] = useState('');

  const [loading, setLoading] = useState(false);

  // Load model
  useEffect(() => {
    const run = async () => {
      try {
        const handModel = await setHandDetector();
        console.log('Model loaded', handModel);
        setModel(handModel);
      } catch (error) {
        console.error('Error loading hand model:', error);
      }
    };
    run();
  }, []);

  // Create game loop
  useEffect(() => {
    if (model) {
      const interval = setInterval(async () => {
        const detections = await detect(model, webCamRef);
        if (detections?.gestures[0]) setGuessLetter(detections.gestures[0][0].categoryName);
        if (detections) draw(detections, canvasRef, webCamRef);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [model]);

  // 
  useEffect(() => { 
    if (word[letterIndex].toLocaleUpperCase() === guessLetter) {
      setIndex((i) => i + 1);
    }
  }, [guessLetter]);

  useEffect(() => {
    if (letterIndex === word.length) {
      setIndex(0);
      setWord(words[wordIndex + 1]);
      setWordIndex((i) => i + 1);
    }
  }, [letterIndex]);


  const currentLetter = word[letterIndex]?.toLocaleUpperCase();

  return (
    <div className='lessonBackground'>
      <h1 className='word'>{
        word && word.split('').map((letter, i) => ( 
          <span className={letterIndex === i ? '' : 'letter'} key={i}>
            {letter}
          </span>
        ))
      }</h1>
      {<img
        onLoad={() =>{
          console.log('loaded');
          setLoading(true)
        }}
        loading='lazy'
        src={imageSrc[currentLetter]} 
        className='handSign'
      />}
      <div className='webcamContainer'>
        <Webcam className='webcam' ref={webCamRef} />
        <canvas className='canvas' ref={canvasRef} />
      </div>
    </div>
  );
}

export default App
