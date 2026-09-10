import React, { FC } from 'react';

import Folder from 'assets/img/mediaPage/Folder.png';
import Folder1 from 'assets/img/mediaPage/Folder1.png';
import Folder2 from 'assets/img/mediaPage/Folder2.png';
import Folder3 from 'assets/img/mediaPage/Folder3.png';
import Folder4 from 'assets/img/mediaPage/Folder4.png';
import { Icon, Image } from 'ui-kit';
// import './MediaBlock.scss';

interface IMediaBlock {
  onClick: () => void;
}

export const MediaBlock: FC<IMediaBlock> = (props) => {
  const { onClick } = props;

  return (
    <div className='MediaBlock'>
      <div className='FilterPanel'>
        <h4 className='Title'>Медиа</h4>

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
        <div className='Folder' onClick={onClick}>
          <Image src={Folder} width={100} height={100} />
          <span>Ибупрофен</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder} width={100} height={100} />
          <span>Дигоксин</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder1} width={100} height={100} />
          <span>Амиодарон</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder} width={100} height={100} />
          <span>Пропафенон</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder} width={100} height={100} />
          <span>Атенолол</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder} width={100} height={100} />
          <span>Бисопролол</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder} width={100} height={100} />
          <span>Амлодипин</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder2} width={100} height={100} />
          <span>Нифедипин</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder} width={100} height={100} />
          <span>Амлодипин</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder} width={100} height={100} />
          <span>Амлодипин</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder3} width={100} height={100} />
          <span>Фамотидин</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder} width={100} height={100} />
          <span>Амлодипин</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder} width={100} height={100} />
          <span>Амлодипин</span>
        </div>

        <div className='Folder' onClick={onClick}>
          <Image src={Folder4} width={100} height={100} />
          <span>Глимепирид</span>
        </div>
      </div>
    </div>
  );
};
