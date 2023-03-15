import React, { useEffect, useState } from 'react';

// kuvan ottaminen
const PictureTaking = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    handleTakePicture()
  }, [])

  const handleTakePicture = async () => {
    try {
      try {
        setPlaying(true)
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        const video = document.querySelector('video');
        video.srcObject = stream;
        video.play(); 
      } catch (accepted) {
        return <>Kuva tallennettu</>
      }
      } catch (error) {
        console.error(error);
      }
  }

  const handleCapture = async () => {
    try {
      const video = document.querySelector('video');
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const imageSrc = canvas.toDataURL();
      setImageSrc(imageSrc);
      const stream = video.srcObject;
      stream.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    } catch (error) {
      console.error(error);
    }
  }

  const handleAccept = async () => {
    try {
            // Save the imageSrc to the Images folder
          //  const link = document.createElement('a');
          //  link.href = imageSrc;
          //  link.download = 'captured.jpeg';
          //  document.body.appendChild(link);
          //  link.click();
          //  document.body.removeChild(link);
      const response = await fetch(imageSrc);
      const file = await response.blob();
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
      const buffer = new Uint8Array(reader.result);
      const file = new File([buffer], `${new Date().getTime()}.jpg`, { type: 'image/jpeg' });
      setAccepted(true);
      setImageSrc(null);
      stream.getTracks().forEach(track => track.stop());
      //   setStream(null);
    };
    const video = document.querySelector('video');
    const stream = video.srcObject;
    setPlaying(false)
    } catch (error) {
      console.error(error);
    }
  }

  const handleDiscard = () => {
    setImageSrc(null);
    const video = document.querySelector('video');
    const stream = video.srcObject;
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
    setPlaying(false)
  }

  return (
    <div>
      <div className='flex flex-row justify-center my-4 gap-x-8'>
       {/* <button className='border-2 border-primary-blue rounded-lg mx-2 my-1 px-3 py-1 ml-4 hover:scale-110 transition ease-in-out duration-300 hover:bg-primary-blue hover:text-white' onClick={handleTakePicture}>Avaa kamera</button> */}
        {(playing) && <button className='border-2 border-primary-blue rounded-lg mx-2 my-1 px-3 py-1 ml-4 hover:scale-110 transition ease-in-out duration-300 hover:bg-primary-blue hover:text-white' onClick={handleCapture}>Ota kuva</button>}
      </div>
      {(imageSrc) && (
        <div>
          <img src={imageSrc} alt="captured" />
          <div className='flex flex-row justify-center my-4 gap-x-8'>
            <button className='border-2 border-oamk-orange rounded-lg mx-2 my-1 px-3 py-1 ml-4 hover:scale-110 transition ease-in-out duration-300 hover:bg-oamk-orange'  onClick={handleDiscard}>Hylkää</button>
            <button className='border-2 border-primary-blue rounded-lg mx-2 my-1 px-3 py-1 ml-4 hover:scale-110 transition ease-in-out duration-300 hover:bg-primary-blue hover:text-white' onClick={handleAccept}>Tallenna kuva</button>
          </div>
        </div>
      )}
      <video id="video" style={{ width: '100%' }} />
    </div>
  )
} 

export default PictureTaking