import React, { useState, useRef, useEffect } from 'react';
import { draw, setHandDetector } from './utills';
import { useParams } from 'react-router-dom';
import lessons from './words';
import Webcam from 'react-webcam';
import './App.css'

function App() {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  
  const { lessonId } = useParams();
  
  const [words, setWords] = useState(lessons[lessonId]);
  const [wordIndex, setWordIndex] = useState(0);
  const [word, setWord] = useState(words[0]);
  const [letterIndex, setIndex] = useState(0);
  const [guessLetter, setGuessLetter] = useState('');

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
      const interval = setInterval(() => {
        detect(model);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [model]);

  useEffect(() => { 
    if (word[letterIndex].toLocaleUpperCase() === guessLetter) {
      setIndex((i) => i + 1);
    }
  }, [guessLetter]);

  useEffect(() => {
    if (letterIndex === word.length) {
      setIndex(0);
      console.log(words)
      setWord(words[wordIndex + 1]);
      setWordIndex((i) => i + 1);
    }
  }, [letterIndex]);

  async function detect(model) {
    if (typeof webCamRef.current === undefined ||
        webCamRef.current === null ||
        webCamRef.current.video.readyState !== 4
      ) return;
    // Get video dimensions
    const video = webCamRef.current.video;
    const { videoWidth, videoHeight } = video;

    // Set video and canvas dimensions
    video.width = videoWidth;
    video.height = videoHeight;
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const startTimeMs = performance.now();
    const detections = await model.recognizeForVideo(video, startTimeMs);
    if (detections.gestures[0]) {
      setGuessLetter(detections.gestures[0][0].categoryName);
    }
    // Get and Clear canvas before drawing
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, videoWidth, videoHeight);
    
    draw(detections, ctx, videoWidth, videoHeight);
    return;
  }

  return (
    <div className='lessonBackground'>
      <h1 className='word'>{
        word && word.split('').map((letter, i) => ( 
          <span className={letterIndex === i ? '' : 'letter'} key={i}>
            {letter}
          </span>
        ))
      }</h1>
      <div className='webcamContainer'>
        <Webcam className='webcam' ref={webCamRef} 
        />
        <canvas className='canvas' ref={canvasRef} />
      </div>
    </div>
  );
}

export default App
