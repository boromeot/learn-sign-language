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

function draw(detections, canvasContext) {
  // Set canvas settings
  canvasContext.lineWidth = 1;
  canvasContext.strokeStyle = 'black';
  
  for (let i = 0; i < detections.landmarks.length; i++) {
    const landmarks = detections.landmarks[i] ? detections.landmarks[i] : [];
    // Draw key points
    for (let {x, y} of landmarks) {
      x *= 640, y *= 480;
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
      x *= 640, y *= 480;
      if ((i - 1) % 4 === 0) canvasContext.lineTo(landmarks[0].x * 640, landmarks[0].y * 480);
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

export { setHandDetector, draw};