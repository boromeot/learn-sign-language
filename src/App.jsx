import { useState, useRef, useEffect } from 'react'
import { useInterval } from './hooks';
import { draw } from './draw';
import Webcam from 'react-webcam';

import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';
import './App.css'

function App() {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    // Load mediapipe hand detection model
    const loadModel = async () => {
      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: 'node_modules/@mediapipe/hands',
        maxHands: 2,
        modelType: 'full',
      };
      const detector = await handPoseDetection.createDetector(model, detectorConfig);
      setModel(detector);
    }

    loadModel();
  }, [])
  
  async function detect(model) {
    const video = webCamRef.current.video;
    const { videoWidth } = video;
    const { videoHeight } = video;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const ctx = canvasRef.current.getContext('2d');
    const detections = await model.estimateHands(video);

    draw(detections, ctx);
  }

  useInterval(() => {
    if (model) {
      detect(model);
    }
  }, 10);


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
