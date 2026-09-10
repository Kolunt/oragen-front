import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import './ImgButton.scss';

export interface IImgButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  src: string;
  onClick?: (event: React.MouseEvent) => void;
}

export const ImgButton: FC<IImgButtonProps> = (props) => {
  const { className, src, onClick, ...rest } = props;

  return (
    <button className='ImgButton' onClick={onClick} {...rest} type='button'>
      <img src={src} alt='Icon' />
    </button>
  );
};
