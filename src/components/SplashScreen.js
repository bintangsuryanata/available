
import React from 'react';
import './SplashScreen.css';
import  maskot from '../assets/icon.png'

function SplashScreen() {
  const blueBackgroundColor = "#00479c";
  const montserratFont = "Montserrat, sans-serif";
  const titleStyle = {
    fontFamily: montserratFont,
    textAlign: 'center',
    color: 'white',
  };

  return (
    <div className="splash-screen">
      <div className=' bg-[#1E005D] w-full h-screen flex flex-col justify-center items-center '>
        <img src={maskot} className='text-center w-60 h-60'/> 
        <h1 style={titleStyle} className='text-center text-white text-xl font-bold'>SMK Telkom Banjarbaru</h1>
      </div>
    </div>
  );
}

export default SplashScreen;