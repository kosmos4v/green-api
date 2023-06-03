import React, { useCallback } from 'react';
import classnames from 'classnames';

import './Input.scss';

type TInputProps = {
  type?: 'text'
  name?: string,
  value: string,
  isErrorMessage?: boolean;
  message?: string,
  label?: string,
  placeholder: string,
  disabled?: boolean,
  fullwidth?: boolean,
  onEnter?: () => void,
  onChange: (event: React.ChangeEvent<HTMLInputElement> | undefined, value: string) => void,
};

export const Input: React.FC<TInputProps> = ({
  placeholder = '',
  value = '',
  type = 'text',
  message = '',
  disabled = false,
  isErrorMessage = true,
  onChange,
  onEnter,
  fullwidth = false,
  name,
  label = '',
}) => {
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    if (typeof onChange === 'function' && !disabled) {
      const newValue = event.target.value;
      onChange(event, newValue as never);
    }
  }, [onChange, disabled]);

  const handleEnterDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (typeof onEnter === 'function' && !disabled && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
      onEnter();
    }
  }, [disabled, onEnter]);

  return (
    <div className={classnames('input__wrapper', { nput__wrapper_fullwidth: fullwidth })}>
      <span>{label}</span>
      <input
        type={type}
        name={name}
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleEnterDown}
        disabled={disabled}
      />
      {isErrorMessage && (
      <span
        className="input__message"
      >
        {message}
      </span>
      )}
    </div>
  );
};
