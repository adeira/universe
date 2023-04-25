// @flow

import sx from '@adeira/sx';
import jsQR from 'jsqr';
import { useEffect, useRef, type Node } from 'react';

type Props = {
  +onData: (string) => void,
  +onNotAllowedError: (Error) => void,
  +onUnknownError: (Error) => void,
};

/**
 * For more info visit:
 *
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
 * - https://github.com/cozmo/jsQR
 * - https://webrtc.github.io/samples/
 *
 * TODO in the future: https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector
 */
export default function QrCodeReader(props: Props): Node {
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const constraints = {
      audio: false,
      video: {
        facingMode: 'environment', // prefer rear camera (use "user" for front camera)
        // frameRate: {
        //   ideal: 10,
        //   max: 15,
        // },
      },
    };

    const videoElement = videoElementRef.current;
    const canvasElement = canvasElementRef.current;
    if (canvasElement == null || videoElement == null) {
      return;
    }

    navigator.mediaDevices
      ?.getUserMedia(constraints)
      .then((mediaStream) => {
        const canvas = canvasElement.getContext('2d', {
          willReadFrequently: true,
        });

        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
          /* $FlowFixMe[unused-promise] This comment suppresses an error when
           * upgrading Flow to version 0.201.0. To see the error delete this
           * comment and run Flow. */
          videoElement.play();
        };

        function drawLine<Point: { +x: number, +y: number }>(
          begin: Point,
          end: Point,
          color: string,
        ) {
          canvas.beginPath();
          canvas.moveTo(begin.x, begin.y);
          canvas.lineTo(end.x, end.y);
          canvas.lineWidth = 4;
          canvas.strokeStyle = color;
          canvas.stroke();
        }

        function tick() {
          if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
            canvasElement.height = videoElement.videoHeight;
            canvasElement.width = videoElement.videoWidth;
            canvas.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
            const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: 'dontInvert',
            });
            if (code) {
              const qrLocation = code.location;
              const color = '#ff3b58';
              drawLine(qrLocation.topLeftCorner, qrLocation.topRightCorner, color);
              drawLine(qrLocation.topRightCorner, qrLocation.bottomRightCorner, color);
              drawLine(qrLocation.bottomRightCorner, qrLocation.bottomLeftCorner, color);
              drawLine(qrLocation.bottomLeftCorner, qrLocation.topLeftCorner, color);
              props.onData(code.data);
            }
          }
          requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      })
      .catch((error) => {
        if (error.name === 'NotAllowedError') {
          props.onNotAllowedError(error);
        } else {
          props.onUnknownError(error);
        }
      });
  }, [props]);

  return (
    <>
      <canvas ref={canvasElementRef} className={styles('canvas')} />
      <video ref={videoElementRef} className={styles('video')} />
    </>
  );
}

const styles = sx.create({
  canvas: {
    maxWidth: 500,
    maxHeight: 500,
    backgroundColor: 'grey',
  },
  video: {
    display: 'none',
  },
});
