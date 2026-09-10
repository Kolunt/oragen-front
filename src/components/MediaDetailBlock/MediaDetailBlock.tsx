import React, { FC } from 'react';

import './MediaDetailBlock.scss';

import Audio from 'assets/img/mediaPage/Audio.png';
import Folder from 'assets/img/mediaPage/Folder.png';
import PDF from 'assets/img/mediaPage/PDF.png';
import PPTX from 'assets/img/mediaPage/PPTX.png';
import Preload from 'assets/img/mediaPage/Preload.png';
import Preview from 'assets/img/mediaPage/Preview.png';
import PreviewVideo from 'assets/img/mediaPage/PreviewVideo.png';
import TXT from 'assets/img/mediaPage/TXT.png';
import { Icon, Image } from 'ui-kit';

/* const options: ISelectOption[] = [
  { value: 'all', label: 'Все' },
  { value: 'first', label: 'Первый вариант' },
  { value: 'second', label: 'Второй вариант' },
]; */

interface IMediaDetailBlock {
  onClick: () => void;
}

export const MediaDetailBlock: FC<IMediaDetailBlock> = (props) => {
  const { onClick } = props;

  return (
    <div className='MediaDetailBlock'>
      <div className='FilterPanel'>
        <h4 className='Title' onClick={onClick}>
          <Icon type='ArrowLeft' />
          Вернуться назад
        </h4>

        <div className='Filters'>
          <div className='Filters__Item'>
            <Icon type='MediaCheck' />
            <span>Выделить все</span>
          </div>

          <div className='Filters__Item Download'>
            <Icon type='MediaDownload' />
            <span>Скачать</span>
          </div>

          <div className='Filters__Item Select'>
            <Icon type='MediaTile' />
            <span>По дате</span>
            <Icon type='MediaArrowDown' />
          </div>

          <div className='Filters__Item Select'>
            <Icon type='MediaApps' />
            <Icon type='MediaArrowDown' />
          </div>
        </div>
      </div>

      <div className='Folders'>
        <div className='Folder'>
          <Image src={Folder} width={100} height={100} />
          <span>Ибупрофен</span>
        </div>

        <div className='Folder'>
          <Image src={PDF} width={100} height={100} />
          <span>Брошюра.pdf</span>
        </div>

        <div className='Folder'>
          <Image src={PDF} width={100} height={100} />
          <span>Модуль.pdf</span>
        </div>

        <div className='Folder'>
          <Image src={Preload} width={100} height={100} />
          <span>Ознакомительный ролик</span>
        </div>

        <div className='Folder'>
          <Image src={Preview} width={100} height={100} />
          <span>Инструкция по приему</span>
        </div>

        <div className='Folder'>
          <Image src={Audio} width={100} height={100} />
          <span>Аудио</span>
        </div>

        <div className='Folder'>
          <Image src={TXT} width={100} height={100} />
          <span>Инструкция по приему</span>
        </div>

        <div className='Folder'>
          <Image src={PPTX} width={100} height={100} />
          <span>Презентация препарата</span>
        </div>

        <div className='Folder'>
          <Image src={PreviewVideo} width={100} height={100} />
          <span>Рекламный ролик препарата</span>
        </div>
      </div>
    </div>
  );
};
