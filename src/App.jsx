import { useState, useRef, useEffect } from 'react'
import { useInterval } from './hooks';
import { draw, setHandDetector } from './utills';
import Webcam from 'react-webcam';
import './App.css'

import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';

function App() {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  const run = async () => {
    const MediaPipeHands = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: 'mediapipe',
      solutionPath: 'node_modules/@mediapipe/hands',
      maxHands: 2,
      modelType: 'full',
    };
    const model = await handPoseDetection.createDetector(MediaPipeHands, detectorConfig);
    console.log('model loaded', model);
    setTimeout(() => {
      setInterval(() => {
        detect(model);
      }, 10);
    }, 5000);
  }
  run();
  
  async function detect(model) {
    const video = webCamRef.current.video;
    const { videoWidth } = video;
    const { videoHeight } = video;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const ctx = canvasRef.current.getContext('2d');
    const detections = await model.estimateHands(video);
    console.log(detections, 'detections', '\n', model, 'model');

    draw(detections, ctx);
  }
  return (
    <>
      <Webcam 
        ref={webCamRef}
      />
      <canvas 
        ref={canvasRef}
      />
    </>
  )
}

export default App
