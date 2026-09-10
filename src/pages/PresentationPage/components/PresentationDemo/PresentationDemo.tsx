import React, { useState } from 'react';
import BgMain from 'assets/img/presentationpage/Presentation.png';
import BgSecond from 'assets/img/presentationpage/Presentation2.png';
import BgThird from 'assets/img/presentationpage/Presentation3.png';
import BgFourth from 'assets/img/presentationpage/Presentation4.png';
import { Button, Image } from 'ui-kit';
import Prev from 'assets/svg/icons/ArrowLeft.svg';
import FullScreen from 'assets/svg/presentationPage/fullscreen.svg';
import Notification from 'assets/svg/presentationPage/notification.svg';
import Zoom from 'assets/svg/presentationPage/zoom.svg';
import Next from 'assets/svg/icons/ArrowRight.svg';
import './PresentationDemo.scss';
import { ROUTES } from 'enums';
import { useNavigate } from 'react-router-dom';

const images = [BgMain, BgSecond, BgThird, BgFourth];

// todo не используется

export const PresentationDemo = () => {
  const [bgImage, setBgImage] = useState(0);
  const navigate = useNavigate();

  const nextImage = () => {
    if (bgImage < images.length - 1) {
      setBgImage((prev) => prev + 1);
    } else {
      setBgImage(0);
    }
  };

  const prevImage = () => {
    if (bgImage > 0) {
      setBgImage((prev) => prev - 1);
    } else {
      setBgImage(images.length - 1);
    }
  };
  return (
    <div className='PresentationDemo'>
      <img className='BG-Image' src={images[bgImage]} alt='bg-image' />
      <div className='Presentation__Control'>
        <Image className='pointer' src={Prev} onClick={prevImage} />
        <Image src={FullScreen} />
        <Image src={Notification} />
        <div className='Presentation__Zoom'>
          <Image src={Zoom} />
          <span>75%</span>
        </div>
        <Image className='pointer' src={Next} onClick={nextImage} />
      </div>
      <Button
        className='ButtonFinish'
        onClick={() => navigate(ROUTES.CONTACTS_INFO)}
      >
        Финиш
      </Button>
    </div>
  );
};
