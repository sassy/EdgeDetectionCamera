
function getPosition(i, j, width) {
  return (i * 4 * width) + j * 4;
}

function displayEdgeToCanvas(srcCanvas, dstCanvas) {
  const srcCtx = srcCanvas.getContext("2d");
  const dstCtx = dstCanvas.getContext("2d");
  const src = srcCtx.getImageData(0, 0, srcCanvas.width, srcCanvas.height);
  const dst3 = dstCtx.createImageData(dstCanvas.width, dstCanvas.height);
  for (let i = 1; i < dstCanvas.height-1; i++) {
      for (let j = 1; j < dstCanvas.width-1; j++) {
          const pos = new Array();
          pos[0] = getPosition(i-1, j-1, dstCanvas.width);
          pos[1] = getPosition(i-1, j,   dstCanvas.width);
          pos[2] = getPosition(i-1, j+1, dstCanvas.width);
          pos[3] = getPosition(i,   j-1, dstCanvas.width);
          pos[4] = getPosition(i,   j,   dstCanvas.width);
          pos[5] = getPosition(i,   j+1, dstCanvas.width);
          pos[6] = getPosition(i+1, j-1, dstCanvas.width);
          pos[7] = getPosition(i+1, j,   dstCanvas.width);
          pos[8] = getPosition(i+1, j+1, dstCanvas.width);

          dst3.data[pos[4]] = 255 - (src.data[pos[0]] + src.data[pos[1]] + src.data[pos[2]] + src.data[pos[3]] + (src.data[pos[4]] * -8) + src.data[pos[5]] + src.data[pos[6]] + src.data[pos[7]] + src.data[pos[8]]);
          dst3.data[pos[4]+1] = 255 - (src.data[pos[0]+1] + src.data[pos[1]+1] + src.data[pos[2]+1] + src.data[pos[3]+1] + (src.data[pos[4]+1] * -8) + src.data[pos[5]+1] + src.data[pos[6]+1] + src.data[pos[7]+1] + src.data[pos[8]+1]);
          dst3.data[pos[4]+2] = 255 - (src.data[pos[0]+2] + src.data[pos[1]+2] + src.data[pos[2]+2] + src.data[pos[3]+2] + (src.data[pos[4]+2] * -8) + src.data[pos[5]+2] + src.data[pos[6]+2] + src.data[pos[7]+2] + src.data[pos[8]+2]);
          dst3.data[pos[4]+3] = src.data[pos[4]+3];

      }
  }
  dstCtx.putImageData(dst3, 0, 0);
}
