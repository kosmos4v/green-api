import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '../../components/common/Input/Input';
import { Button } from '../../components/common/Button/Button';
import {
  sendMessage,
  addNewChat,
  setCurrentChat,
  receiveNotification,
  deleteNotification,
} from '../../redux/actions/chat';
import { MessageCard } from '../../components/common/Message';
import { TMessage } from '../../models/message';
import { TRootState } from '../../redux/reducers';

import './Home.scss';

const сheckPhoneInput = /^\d+$/;

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const userApiToken = localStorage.getItem('userApiToken');
  const { userId } = useSelector((state: TRootState) => state.user);
  const {
    chats,
    receiptId,
    currentChat,
    isNotificationRendered,
  } = useSelector((state: TRootState) => state.chat);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState<TMessage>({
    messageId: '', text: '', timestamp: '', type: '',
  });

  const handleChangePhone = useCallback((_: unknown, value: string): void => {
    setPhone(value);
  }, []);

  const handleChangeMessage = useCallback((_: unknown, value: string): void => {
    setMessage({ ...message, text: value });
  }, [message]);

  const handleClickCreateChat = useCallback((): void => {
    if (сheckPhoneInput.test(phone)) {
      if (!chats[phone]) {
        dispatch(addNewChat(phone));
        setPhone('');
      }
    }
  }, [phone, dispatch, chats]);

  const handleClickCurrentChat = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
    setMessage({
      messageId: '', text: '', timestamp: '', type: '',
    });
    const liElement = event.target as HTMLLIElement;
    const currentNumber = liElement.innerText;
    dispatch(setCurrentChat(chats[currentNumber]));
  }, [chats, dispatch]);

  const handleSendMessage = useCallback(() => {
    if (userId && userApiToken) {
      dispatch(sendMessage(
        currentChat.phone,
        { ...message, timestamp: new Date().getTime().toString(), type: 'outgoing' },
        userId,
      ));
    }
    setMessage({
      messageId: '', text: '', timestamp: '', type: '',
    });
  }, [dispatch, message, currentChat, userId, userApiToken]);

  useEffect(() => {
    if (
      userId
        && userApiToken
        && typeof receiptId === 'undefined'
        && !isNotificationRendered
    ) dispatch(receiveNotification(userId));
  }, [
    dispatch, userId, userApiToken, receiptId, isNotificationRendered,
  ]);

  useEffect(() => {
    if (
      userId
      && userApiToken
      && receiptId
      && isNotificationRendered
    ) {
      dispatch(deleteNotification(userId, receiptId));
    }
  }, [
    dispatch,
    userId,
    userApiToken,
    receiptId,
    isNotificationRendered,
  ]);
  return (
    <div className="home">
      <div className="home__chat-panel">
        <div className="home__chat-panel__header">
          <Input
            placeholder="Введите 11 цифр номера телефона"
            value={phone}
            onChange={handleChangePhone}
            isErrorMessage={false}
            onEnter={handleClickCreateChat}
          />
          <Button
            text="OK"
            onClick={handleClickCreateChat}
            disabled={!phone}
          />
        </div>
        <div className="home__chat-panel__chats">
          {Object.keys(chats).map((chat) => (
            <button
              type="button"
              onClick={handleClickCurrentChat}
              className="home__chat-panel__chat-card"
              key={chat}
            >
              {chat}
            </button>
          ))}
        </div>
      </div>
      <div className="home__conversation-panel">
        <div className="home__conversation-panel__message-wrapper">
          {currentChat?.messages
            .sort((max, min) => parseInt(max.timestamp, 10) - parseInt(min.timestamp, 10))
            .map((chat) => (
              <MessageCard key={chat.timestamp} type={chat.type}>
                {chat.text}
              </MessageCard>
            ))}
        </div>
        <div className="home__conversation-panel__input-fields">
          <Input
            placeholder={!currentChat.phone ? 'Чтобы напечатать сообщение выберите чат' : 'Введите текст сообщения'}
            onChange={handleChangeMessage}
            value={message.text}
            isErrorMessage={false}
            onEnter={handleSendMessage}
            disabled={!currentChat.phone}
          />
          <Button
            text="Отправить"
            onClick={handleSendMessage}
            disabled={!message.text}
          />
        </div>
      </div>
    </div>
  );
};
