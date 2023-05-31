import React from "react";

import './Button.scss'

type TButtonProps = {
  text: string,
  disabled?: boolean,
  onClick: () => void,
}
export const Button: React.FC<TButtonProps> = ({
  text,
  disabled=false,
  onClick
}) => {

  return (
    <div>
      <button
        className="button"
        type="button"
        onClick={onClick}
        disabled={disabled}
        >
        {text}
      </button>
    </div>
  );
}
