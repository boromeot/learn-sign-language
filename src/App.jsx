import React, { useState, useRef, useEffect } from 'react';
import { draw, setHandDetector } from './utills';
import Webcam from 'react-webcam';
import './App.css'

function App() {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [letter, setLetter] = useState('none');
  const [word, setWord] = useState('hello');

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

  async function detect(model) {
    if (typeof webCamRef.current === undefined ||
        webCamRef.current === null ||
        webCamRef.current.video.readyState !== 4
      ) return;
    const video = webCamRef.current.video;
    // Get video dimensions
    const { videoWidth, videoHeight } = video;

    // Set video dimensions
    video.width = videoWidth;
    video.height = videoHeight;

    // Set canvas dimensions
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const startTimeMs = performance.now();
    const detections = await model.recognizeForVideo(video, startTimeMs);
    if (detections.gestures[0]) {
      setLetter(detections.gestures[0][0].categoryName)
    }
    // Clear the canvas before drawing
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, videoWidth, videoHeight);
    
    draw(detections, ctx);
    return;
  }

  return (
    <>
      <div className='wordBox'>
        <h1>{word}</h1>
        <h2>{letter}</h2>
      </div>
      <Webcam ref={webCamRef} />
      <canvas ref={canvasRef} />
    </>
  );
}

export default App
