import React, { FC, memo, useState } from 'react';

import classNames from 'classnames';
import { SlideDown } from 'react-slidedown';

import 'react-slidedown/lib/slidedown.css';
import './Accordion.scss';
import { Icon } from 'ui-kit';

export interface IAccordionProps {
  className?: string;
  title?: string;
  isActive?: boolean;
  children?: React.ReactNode;
}

const AccordionComponent: FC<IAccordionProps> = (props) => {
  const { className, title, isActive = false, children = null } = props;

  const [isOpen, setIsOpen] = useState(isActive);

  const handleToggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={classNames('Accordion', className, {
        Accordion__active: isOpen,
      })}
    >
      <div className='Accordion-Header' onClick={handleToggleAccordion}>
        <div className='Accordion-HeaderTitle'>
          {title || <span>Не выбрано</span>}
        </div>
        <Icon
          className='Accordion-HeaderIcon'
          type={isOpen ? 'ArrowTop' : 'ArrowDown'}
        />
      </div>
      <SlideDown className='Accordion-ContentSlideDown'>
        {isOpen && <div className='Accordion-Content'>{children}</div>}
      </SlideDown>
    </div>
  );
};

export const Accordion = memo(AccordionComponent);
