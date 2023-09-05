import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';
import taskUrl from './models/gesture_recognizer.task';

async function setHandDetector() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  const handLandmarker = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: taskUrl,
      delegate: "GPU"
    },
    runningMode: 'VIDEO',
    numHands: 2
  });
  return handLandmarker;
}

async function detect(model, webCamRef) {
  if (typeof webCamRef.current === undefined ||
      webCamRef.current === null ||
      webCamRef.current.video.readyState !== 4
    ) return null;
  // Get video
  const video = webCamRef.current.video;

  const startTimeMs = performance.now();
  const detections = await model.recognizeForVideo(video, startTimeMs);
  
  return detections;
}

function draw(detections, canvasRef, webCamRef) {
  const video = webCamRef.current.video;
  const { videoWidth, videoHeight } = webCamRef.current.video;
  video.width = videoWidth, video.height = videoHeight;
  
  const canvasContext = canvasRef.current.getContext('2d');
  // Set canvas settings
  canvasRef.current.width = videoWidth;
  canvasRef.current.height = videoHeight;
  canvasContext.clearRect(0, 0, videoWidth, videoHeight);
  canvasContext.lineWidth = 1;
  canvasContext.strokeStyle = 'black';
  
  for (let i = 0; i < detections.landmarks.length; i++) {
    const landmarks = detections.landmarks[i] ? detections.landmarks[i] : [];
    // Draw key points
    for (let {x, y} of landmarks) {
      x *= videoWidth, y *= videoHeight;
      canvasContext.beginPath();
      canvasContext.arc(x, y, 2, 0, 3 * Math.PI);
      canvasContext.fillStyle = 'pink';
      canvasContext.fill();
      canvasContext.closePath();
    }

    // Draw connectors between keypoints
    canvasContext.beginPath();
    for (let i = 0; i < landmarks.length; i++) {
      let {x, y} = landmarks[i];
      x *= videoWidth, y *= videoHeight;
      if ((i - 1) % 4 === 0) canvasContext.lineTo(landmarks[0].x * videoWidth, landmarks[0].y * videoHeight);
      canvasContext.lineTo(x, y);
      if ((i) % 4 === 0) {
        canvasContext.stroke();
        canvasContext.closePath();
        canvasContext.beginPath();
      }
    }
    canvasContext.closePath();
  }
}


export { setHandDetector, detect, draw};