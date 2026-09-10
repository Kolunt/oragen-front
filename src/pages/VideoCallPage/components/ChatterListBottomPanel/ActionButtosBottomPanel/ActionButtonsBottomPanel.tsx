import React, { FC } from 'react';
import { Icon } from '../../../../../ui-kit';
import { useFullScreenModeVideoCall } from '../../../../../store/useFullScreenModeVideoCall';
import './ActionButtonsBottomPanel.scss';

interface IActionButtonsBottomPanel {}

export const ActionButtonsBottomPanel: FC<IActionButtonsBottomPanel> = () => {
  const toggleFullScreen = useFullScreenModeVideoCall(
    (state) => state.toggleFullScreen
  );
  const isChattererPanel = useFullScreenModeVideoCall(
    (state) => state.isShowListChattererPanel
  );
  const toggleChattererPanel = useFullScreenModeVideoCall(
    (state) => state.toggleShowListChattererPanel
  );
  const fullScreenUserId = useFullScreenModeVideoCall(
    (state) => state.fullScreenUserId
  );
  const changeId = useFullScreenModeVideoCall(
    (state) => state.changeFullScreenUserId
  );
  const generalFullScreen = useFullScreenModeVideoCall(
    (state) => state.generalFullScreen
  );

  const handleToggleChattererPanel = () => {
    toggleChattererPanel(!isChattererPanel);
  };

  const exitFullScreen = () => {
    changeId(undefined);
    toggleFullScreen(false);
  };

  return (
    <div className='ActionButtonsBottomPanel'>
      <div className='IconWrapper' onClick={handleToggleChattererPanel}>
        {isChattererPanel ? <Icon type={'EyeOff'} /> : <Icon type={'EyeOn'} />}
      </div>

      {(!generalFullScreen || +generalFullScreen !== fullScreenUserId) && (
        <div className='IconWrapper' onClick={exitFullScreen}>
          <Icon type={'FullScreenExit'} />
        </div>
      )}
    </div>
  );
};
