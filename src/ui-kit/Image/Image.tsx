import React, { FC } from 'react';

import cn from 'classnames';
import './Image.scss';

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const Image: FC<ImageProps> = (props) => {
  const { alt, className } = props;

  return <img className={cn('Image', className)} alt={alt} {...props} />;
};
