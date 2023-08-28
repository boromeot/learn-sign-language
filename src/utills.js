import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';

async function setHandDetector() {
  const MediaPipeHands = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: 'mediapipe',
    solutionPath: 'node_modules/@mediapipe/hands',
    maxHands: 2,
    modelType: 'full',
  };
  return await handPoseDetection.createDetector(MediaPipeHands, detectorConfig);
}

function draw(detections, canvasContext) {
  for (let i = 0; i < detections.length; i++) {
    const { keypoints } = detections[i];
    for (const {x, y} of keypoints) {
      canvasContext.beginPath();
      canvasContext.arc(x, y, 2, 0, 2 * Math.PI);
      canvasContext.fillStyle = 'violet';
      canvasContext.fill();
      canvasContext.closePath();
    }

    canvasContext.beginPath();
    for (let i = 0; i < keypoints.length; i++) {
      const {x, y} = keypoints[i];
      if ((i - 1) % 4 === 0) canvasContext.lineTo(keypoints[0].x, keypoints[0].y);
      canvasContext.lineTo(x, y);
      if ((i) % 4 === 0) {
        canvasContext.stroke();
        canvasContext.closePath();
        canvasContext.beginPath();
      }
      
    }
    canvasContext.lineWidth = 3;
    canvasContext.strokeStyle = 'black';
    canvasContext.closePath();
  }
}

export { setHandDetector, draw};