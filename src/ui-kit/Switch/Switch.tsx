import { FC } from 'react';

import classNames from 'classnames';
import ReactSwitch from 'react-switch';
import './Switch.scss';

interface ISwitch {
  checked: boolean;
  onChange: (value: boolean) => void;
  className?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  handleDiameter?: number;
}

export const Switch: FC<ISwitch> = (props) => {
  const {
    className,
    checked,
    onChange,
    width,
    height,
    borderRadius,
    handleDiameter,
  } = props;

  return (
    <div className={classNames('Switch', className)}>
      <ReactSwitch
        checked={checked}
        onChange={onChange}
        checkedIcon={false}
        uncheckedIcon={false}
        width={width ?? 35}
        height={height ?? 18}
        borderRadius={borderRadius ?? 9}
        handleDiameter={handleDiameter ?? 10}
        activeBoxShadow=''
        offColor='#e0e0e0'
        onColor='#deb373'
      />
    </div>
  );
};
