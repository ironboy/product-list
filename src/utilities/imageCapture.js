// A variable to save the taken picture in 
let picture;

function dataURItoBlob(dataURI) {
  let byteString = atob(dataURI.split(',')[1]);
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  let blob = new Blob([ab], { type: mimeString });
  return blob;
}

export async function initializeMedia() {

  let videoPlayer = document.querySelector('.product-edit video');
  let canvasElement = document.querySelector('.product-edit canvas');

  // if the elements do not exist yet, retry in 10 ms...
  if (!videoPlayer || !canvasElement) {
    setTimeout(initializeMedia, 10);
    return;
  }

  if (!('mediaDevices' in navigator)) {
    navigator.mediaDevices = {};
  }
  // handle different browser implementations
  if (!('getUserMedia' in navigator.mediaDevices)) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented!'));
      }

      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }

  // this prompts the user to enable the camera
  let stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "user" // front-camera (back-camera is 'environment')
    }
  }).catch(() => {
    // do nothing on error
  });

  // stream the camera-image to the video
  videoPlayer.srcObject = stream;
  videoPlayer.style.display = 'block';
  canvasElement.style.display = 'none';
}

export function captureImage() {

  let videoPlayer = document.querySelector('.product-edit video');
  let canvasElement = document.querySelector('.product-edit canvas');

  // take the image from the videoplayer and add to the canvas
  // to enable converting the image to a blob (file)
  let context = canvasElement.getContext('2d');
  context.drawImage(videoPlayer, 0, 0, canvasElement.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvasElement.width));

  // stop player
  videoPlayer.srcObject.getVideoTracks().forEach(function (track) {
    track.stop();
  });

  // store picture blob in variable, and set quality to 80%
  // to decrease file-size
  picture = dataURItoBlob(canvasElement.toDataURL('image/jpeg', 0.8));
}

export async function uploadImage(productId) {

  let formData = new FormData();

  formData.append('file', picture, Date.now() + '.jpg');

  // TEMPORARILY DO NOT USE fetchedLocation
  // (since it would take some more analyzing of original code example)
  // formData.append('location', JSON.stringify(fetchedLocation));
  // formData.append('address', JSON.stringify(address));

  formData.append('id', productId);

  let response = await (await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })).json();

  // to check what the server answers
  // console.log(response)
}