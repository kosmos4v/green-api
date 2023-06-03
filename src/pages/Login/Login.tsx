import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { saveUserData } from '../../redux/actions/user';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

import './Login.scss';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [userApiToken, setUserApiToken] = useState('');
  const [idError, setIdError] = useState('');
  const [tokenError, setTokenError] = useState('');

  const handleChangeId = useCallback((_: unknown, value: string): void => {
    setUserId(value);
  }, []);

  const handleChangeToken = useCallback((_: unknown, value: string): void => {
    setUserApiToken(value);
  }, []);

  const handleLogin = useCallback((): void => {
    if (!userId) setIdError('Введите ваш id');
    if (!userApiToken) setTokenError('Введите ваш token');
    if (userId && userApiToken) {
      localStorage.setItem('userApiToken', userApiToken);
      dispatch(saveUserData(userId));
      navigate('/home');
    }
  }, [userId, userApiToken, navigate, dispatch]);

  useEffect((): void => {
    if (userId) setIdError('');
    if (userApiToken) setTokenError('');
  }, [userId, userApiToken]);

  return (
    <div className="login">
      <Input
        placeholder="Введите Ваш Id"
        value={userId}
        label="Ваш Id"
        onChange={handleChangeId}
        message={idError}
        fullwidth
      />
      <Input
        label="Ваш Token"
        placeholder="Введите Ваш Token"
        value={userApiToken}
        onChange={handleChangeToken}
        message={tokenError}
        fullwidth
      />
      <Button
        text="Войти"
        onClick={handleLogin}
      />
    </div>
  );
};
