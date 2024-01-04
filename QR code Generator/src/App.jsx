import React, { useEffect, useRef, useState } from "react";
import './index.css'
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
 
  qrOptions:{
    errorCorrectionLevel:'M'
  },
  dotsOptions: {
    color: "#8fc0a9",
    gradient:{
      type:"linear",
      colorStops:[{ offset: 0, color: '#ff8500' }, 
      { offset: 1, color: '#ffaa00' }]
    },
    type: "dots",
  },
  cornersSquareOptions:{
    type:"square"
  },
  backgroundOptions:{
    color:"black"
  }
});

export default function App() {
  const [url, setUrl] = useState("https://qr-code-styling.com");
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url
    });
  }, [url]);

  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt
    });
  };

  return (
    <div className="app">
    
        <h1>QR Code Generator</h1>
        <input value={url} onChange={onUrlChange} />
        <select onChange={onExtensionChange} value={fileExt}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
        
      <div className='img' ref={ref} />
      <button onClick={onDownloadClick}>Download</button>
    </div>
  );
}

