import { useState, useRef, useEffect } from 'react'
import { useInterval } from './hooks';
import Webcam from 'react-webcam'
import * as handtrack from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
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

    console.log(canvasRef.current.width)
    console.log(canvasRef.current.height)
     
    const ctx = canvasRef.current.getContext('2d');



    const detection = await model.estimateHands(video);
    if (detection.length > 0) {
      const { landmarks } = detection[0];
      const { annotations } = detection[0];
      for (const [x, y ,z] of landmarks) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'violet';
        ctx.fill();
      }

    }
  }

  useEffect(() => {
    // Load mediapipe hand detection model
    const loadModel = async () => {
      const model = await handtrack.load();
      setModel(model);
      console.log(model);
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
