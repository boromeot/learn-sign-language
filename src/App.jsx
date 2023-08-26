import { useState, useRef, useEffect } from 'react'
import { useInterval } from './hooks';
import Webcam from 'react-webcam'
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
  
  async function detect(model) {
    const video = webCamRef.current.video;
    const { videoWidth } = video;
    const { videoHeight } = video;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

     
    const ctx = canvasRef.current.getContext('2d');

    const detection = await model.estimateHands(video);
      for (let i = 0; i < detection.length; i++) {
        const { keypoints } = detection[i];
        for (const {x, y} of keypoints) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = 'violet';
          ctx.fill();
          ctx.closePath();
        }

        ctx.beginPath();
        for (let i = 0; i < keypoints.length; i++) {
          const {x, y} = keypoints[i];
          if ((i - 1) % 4 === 0) ctx.lineTo(keypoints[0].x, keypoints[0].y);
          ctx.lineTo(x, y);
          if ((i) % 4 === 0) {
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
          }
          
        }
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
        ctx.closePath();
      }
  }

  useEffect(() => {
    // Load mediapipe hand detection model
    const loadModel = async () => {
      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
                      // or 'base/node_modules/@mediapipe/hands' in npm.
        maxHands: 2,
        modelType: 'full',
      };
      const detector = await handPoseDetection.createDetector(model, detectorConfig);
      setModel(detector);
    }

    loadModel();
  }, [])

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
