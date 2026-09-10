import PerfectScrollbar from 'react-perfect-scrollbar';
import React, { FC, useCallback, useState, forwardRef, ReactNode } from 'react';
import styled from 'styled-components';

const ContainerContext = React.createContext(document.body);

const StyledScrollBar = styled(PerfectScrollbar)`
  .ps__rail-x {
    z-index: 100;
  }
  .ps__rail-y {
    z-index: 100;
  }
  background: inherit;
`;

interface Props {
  children?: ReactNode;
}

export type Ref = HTMLButtonElement;

export const ScrollBar = forwardRef<Ref, Props>((props, ref) => {
  const [container, setContainer] = useState<object>({});
  const refHandler = useCallback(
    (object: any) => {
      if (object) {
        if (ref) {
          // @ts-ignore
          ref.current = object;
        }
        setContainer(object._container);
      }
    },
    [ref]
  );
  return (
    // @ts-ignore
    <ContainerContext.Provider value={container}>
      <StyledScrollBar {...props} ref={refHandler} />
    </ContainerContext.Provider>
  );
});
