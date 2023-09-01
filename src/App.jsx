import React, { useState, useRef, useEffect } from 'react';
import { draw, setHandDetector } from './utills';
import Webcam from 'react-webcam';
import './App.css'

function App() {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [guessLetter, setGuessLetter] = useState('none');
  const [word, setWord] = useState('HELLO');
  const [index, setIndex] = useState(0);

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

  useEffect(() => {
    if (model) {
      const interval = setInterval(() => {
        detect(model);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [model]);

  useEffect(() => { 
    if (word[index] === guessLetter) {
      setIndex((i) => i + 1);
    }
  }, [guessLetter]);

  useEffect(() => {
    if (index === word.length) {
      setIndex(0);
    }
  }, [index]);

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
    // Clear the canvas before drawing
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, videoWidth, videoHeight);
    
    draw(detections, ctx, videoWidth, videoHeight);
    return;
  }

  return (
    <div className='lessonBackground'>
      <h1 className='word'>{
        word && word.split('').map((letter, i) => ( 
          <span className={index === i ? '' : 'letter'} key={i}>
            {letter}
          </span>
        ))
      }</h1>
      <h2 className='guess'>guess: {guessLetter}</h2>
      <div className='webcamContainer'>
        <Webcam className='webcam' ref={webCamRef} 
        />
        <canvas className='canvas' ref={canvasRef} />
      </div>
    </div>
  );
}

export default App
