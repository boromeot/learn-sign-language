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

  async function detect(model) {
    const detection = await model.estimateHands(webCamRef.current);
    console.log(detection, 'detection')
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
