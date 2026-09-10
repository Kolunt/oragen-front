import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import BgMain from 'assets/img/presentationpage/Presentation.png';
import BgSecond from 'assets/img/presentationpage/Presentation2.png';
import BgThird from 'assets/img/presentationpage/Presentation3.png';
import BgFourth from 'assets/img/presentationpage/Presentation4.png';
import Prev from 'assets/svg/icons/ArrowLeft.svg';
import Next from 'assets/svg/icons/ArrowRight.svg';
import FullScreen from 'assets/svg/presentationPage/fullscreen.svg';
import Notification from 'assets/svg/presentationPage/notification.svg';
import Zoom from 'assets/svg/presentationPage/zoom.svg';
import { Layout } from 'components/Layout/Layout';
import { ROUTES } from 'enums';
import { Button, Image, Input } from 'ui-kit';
import './PresentationMedia.scss';

const images = [BgMain, BgSecond, BgThird, BgFourth];

// todo не используется

export const PresentationMedia = () => {
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
    <div className='PresentationMedia'>
      <Layout>
        <div className='PresentationMedia__Content'>
          <div className='Presentation'>
            <div className='Presentation__Media'>
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
            </div>

            <div className='Presentation__Notes'>
              <div className='Info'>
                <h3 className='Title'>Файлы</h3>
                <div className='File'>Файл №1</div>
                <div className='File'>Файл №2</div>
                <div className='File'>Файл №3</div>
                <div className='File'>Файл №4</div>
                <div className='File'>Файл №5</div>
              </div>

              <Button
                className='ButtonFinish'
                onClick={() => navigate(ROUTES.MEDIA)}
              >
                Финиш
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
