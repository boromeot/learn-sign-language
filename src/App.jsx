import { useState, useRef, useEffect } from 'react'
import Webcam from 'react-webcam'
import * as handtrack from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs';
import './App.css'

function App() {
  const webCamRef = useRef(null);
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

  return (
    <>
      <Webcam 
        ref={webCamRef}
      />
    </>
  )
}

export default App
