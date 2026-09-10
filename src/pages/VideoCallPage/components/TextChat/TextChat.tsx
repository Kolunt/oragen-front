import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { v1 } from 'uuid';
import { InputForm } from 'ui-kit';
import { IChatMessages, ITextСhatParticipants } from '../../hooks/useJanusInit';
import classNames from 'classnames';
import { useFullScreenModeVideoCall } from '../../../../store/useFullScreenModeVideoCall';
import { TextChatInstructions } from '../../../../enums';
import './TextChat.scss';

interface ITextChat {
  messages: IChatMessages[];
  textChatParticipants: ITextСhatParticipants[];
  sendMessage: (newMessage: string) => void;
  isShow: boolean;
  className?: string;
  checkCallOwner: boolean;
}

export const TextChat: FC<ITextChat> = (props) => {
  const {
    messages,
    textChatParticipants,
    sendMessage,
    className,
    isShow,
    checkCallOwner,
  } = props;
  const [title, setTitle] = useState<string>('');
  const isFullScreen = useFullScreenModeVideoCall(
    (state) => state.isFullScreen
  );
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const toggleGeneralFullScreen = useFullScreenModeVideoCall(
    (state) => state.toggleGeneralFullScreen
  );
  const [isChangeGeneralScreen, setIsChangeGeneralScreen] =
    useState<string>('');
  const instructions: string[] = [...Object.values(TextChatInstructions)];

  const handleSendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      title.trim().length &&
      e.key === 'Enter' &&
      !instructions.includes(title.trim())
    ) {
      sendMessage(title);
      setTitle('');
    }
  };

  useEffect(() => {
    toggleGeneralFullScreen(isChangeGeneralScreen);
  }, [isChangeGeneralScreen]);

  const filteredMessages = useMemo(() => {
    let data: IChatMessages[] = messages;

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
        let id: string = instruction.message.slice(openInstructionLength);
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
    <div
      className={classNames('TextChat', className, {
        'TextChat--active': isShow,
        'TextChat--fullscreen': isFullScreen,
      })}
    >
      <div className='TextChat__Messages'>
        <h4 className='Title'>Чат конференции</h4>
        <div className='Messages'>
          {filteredMessages.map((message) => (
            <p key={v1()} className='Message'>
              <span className='Message__User'>
                [ {fromMessage(message.user)} ] :
              </span>
              {/*<span className='Message__User'>[ {message.user} ] :</span>*/}
              <span className='Message__Text'>{message.message}</span>
            </p>
          ))}
        </div>
      </div>
      <div className='TextChat__InputField'>
        <InputForm
          value={title}
          onChange={handleTitle}
          placeholder='Введите сообщение'
          onKeyDown={handleSendMessage}
        />
      </div>
    </div>
  );
};
