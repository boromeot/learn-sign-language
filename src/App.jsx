import React, { useState, useRef, useEffect } from 'react';
import { draw, setHandDetector } from './utills';
import Webcam from 'react-webcam';
import './App.css'

function App() {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const handModel = await setHandDetector();
        console.log('Model loaded');
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

    const ctx = canvasRef.current.getContext('2d');
    const detections = await model.estimateHands(video);
    
    // Clear the canvas before drawing
    ctx.clearRect(0, 0, videoWidth, videoHeight);
    
    draw(detections, ctx);
    return;
  }

  return (
    <>
      <Webcam ref={webCamRef} />
      <canvas ref={canvasRef} />
    </>
  );
}

export default App;