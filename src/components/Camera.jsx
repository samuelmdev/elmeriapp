import React, { useState, useEffect, useRef } from 'react';

// Kuvan ottaminen
const Camera = () => {
  const [photoURL, setPhotoURL] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    handleStartCapture()
  }, [])

  // Ottaa kuvan, eli pysäyttaa videon sen hetkiseen kuvaan ja ottaa URL:n talteen
  const handleCapture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    setPhotoURL(canvasRef.current.toDataURL('image/png'));
    handleStopCapture();
  };

  // Tarkistaa laitteiston ja aloittaa videon
  // Avaa takakameran, jos se on saatavilla
  const handleStartCapture = async () => {
    let constraints;
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const backCamera = devices.find(device => device.kind === 'videoinput' && device.label.toLowerCase().includes('back'));
      if (backCamera) {
        constraints = { video: { deviceId: backCamera.deviceId }, audio: false };
      } else {
        constraints = { video: true, audio: false };
      }
    } else {
      constraints = { video: true, audio: false };
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  // Pysäyttää videon ottamisen
  const handleStopCapture = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
  };

  const handleNewCapture = () => {
    setPhotoURL(null)
    handleStartCapture()
  }

  const handleAccept = () => {
    
  }

  // Kamera-komponentin näkymä
  return (
    <div>
      {(photoURL) ? 
        <>
          <img src={photoURL} alt="Otettu kuva" />
          <button className='border-2 border-oamk-orange rounded-lg mx-2 my-1 px-3 py-1 ml-4 hover:scale-110 transition ease-in-out duration-300 hover:bg-oamk-orange' onClick={handleNewCapture}>Ota uusi kuva</button>
          <button className='border-2 border-primary-blue rounded-lg mx-2 my-1 px-3 py-1 ml-4 hover:scale-110 transition ease-in-out duration-300 hover:bg-primary-blue hover:text-white' onClick={handleAccept}>Tallenna kuva</button>
        </> :
        <>
          <video ref={videoRef} />
          <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }} />
          <button className='border-2 border-primary-blue rounded-lg mx-2 my-1 px-3 py-1 ml-4 hover:scale-110 transition ease-in-out duration-300 hover:bg-primary-blue hover:text-white' onClick={handleCapture}>Ota kuva</button>
        </>}
    </div>
  )
}

export default Camera

// <button onClick={handleStartCapture}>Start Capture</button>