import React, { FC } from 'react';
import classNames from 'classnames';
import { VideoUnitBottomPanel } from './VideoUnitBottomPanel/VideoUnitBottomPanel';
import { IRemoteUser } from '../../hooks/useRemoteUsersVideoCall';
import { ActionButtonsBottomPanel } from './ActionButtosBottomPanel/ActionButtonsBottomPanel';
import { useFullScreenModeVideoCall } from '../../../../store/useFullScreenModeVideoCall';
import './ChatterListBottomPanel.scss';

interface IChatterListBottomPanel {
  users: IRemoteUser[];
}

export const ChatterListBottomPanel: FC<IChatterListBottomPanel> = (props) => {
  const { users } = props;
  const isFullScreen = useFullScreenModeVideoCall(
    (state) => state.isFullScreen
  );
  const isShowListChattererPanel = useFullScreenModeVideoCall(
    (state) => state.isShowListChattererPanel
  );

  return (
    <>
      <div
        className={classNames('ChatterListBottomPanel', {
          'ChatterListBottomPanel--active': isFullScreen,
        })}
      >
        <div
          className={classNames('ChatterListBottomPanel__List', {
            'ChatterListBottomPanel__List--hidden': isShowListChattererPanel,
          })}
        >
          {users.map((user) => (
            <VideoUnitBottomPanel key={user.id} user={user} />
          ))}
        </div>
      </div>
      {isFullScreen && <ActionButtonsBottomPanel />}
    </>
  );
};
