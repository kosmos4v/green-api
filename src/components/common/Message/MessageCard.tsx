import React from "react";
import classnames from "classnames";

import './MessageCard.scss';

type TMessageCardProps = {
  children: React.ReactNode;
  type?: 'incoming' | 'outgoing'
};

export const MessageCard: React.FC<TMessageCardProps> = ({ children, type }) => {

  return (
    <div className={classnames("message-card", `message-card__${type}`)}>
      {children}
    </div>
  );
}