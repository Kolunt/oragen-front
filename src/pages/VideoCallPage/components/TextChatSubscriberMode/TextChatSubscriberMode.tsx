import React, { FC, useEffect, useMemo, useState } from 'react';
import { IChatMessages, ITextСhatParticipants } from '../../hooks/useJanusInit';
import './TextChatSubscriberMode.scss';
import { v1 } from 'uuid';
import { TextChatInstructions } from '../../../../enums';
import { useFullScreenModeVideoCall } from '../../../../store/useFullScreenModeVideoCall';

interface ITextChatSubscriberMode {
  messages: IChatMessages[];
  textChatParticipants: ITextСhatParticipants[];
  checkCallOwner: boolean;
}

export const TextChatSubscriberMode: FC<ITextChatSubscriberMode> = (props) => {
  const { messages, textChatParticipants, checkCallOwner } = props;
  const toggleGeneralFullScreen = useFullScreenModeVideoCall(
    (state) => state.toggleGeneralFullScreen
  );
  const [isChangeGeneralScreen, setIsChangeGeneralScreen] =
    useState<string>('');

  useEffect(() => {
    toggleGeneralFullScreen(isChangeGeneralScreen);
  }, [isChangeGeneralScreen]);

  const filteredMessages = useMemo(() => {
    let data = messages;
    const openInstructionLength =
      TextChatInstructions.OPEN_GENERAL_FULL_SCREEN.length;

    const instruction = [...data].reverse().find((item) => {
      let openInstruction = item.message.slice(0, openInstructionLength);
      return (
        openInstruction === TextChatInstructions.OPEN_GENERAL_FULL_SCREEN ||
        item.message === TextChatInstructions.CLOSE_GENERAL_FULL_SCREEN
      );
    });

    if (instruction) {
      if (
        instruction.message === TextChatInstructions.CLOSE_GENERAL_FULL_SCREEN
      ) {
        setIsChangeGeneralScreen('');
      } else {
        let id = instruction.message.slice(openInstructionLength);
        setIsChangeGeneralScreen(id);
      }
    }

    return instruction && !checkCallOwner
      ? data.filter((item) => {
          let openInstruction = item.message.slice(0, openInstructionLength);
          return (
            openInstruction !== TextChatInstructions.OPEN_GENERAL_FULL_SCREEN &&
            item.message !== TextChatInstructions.CLOSE_GENERAL_FULL_SCREEN
          );
        })
      : data;
  }, [messages.length]);

  const fromMessage = (user: string) =>
    textChatParticipants.find((item) => item.username === user)?.display;

  return (
    <div className='TextChatSubscriberMode'>
      <div className='TextChat__Messages'>
        <h4 className='Title'>Чат конференции</h4>
        <div className='Messages'>
          {filteredMessages.map((message) => (
            <p key={v1()} className='Message'>
              <span className='Message__User'>
                [ {fromMessage(message.user)} ] :
              </span>
              <span className='Message__Text'>{message.message}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
