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

export { draw };