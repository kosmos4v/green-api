import React from 'react';
import classnames from 'classnames';

import './MessageCard.scss';
import { TMessageType } from '../../../models/message';

type TMessageCardProps = {
  children: React.ReactNode;
  type: TMessageType
};

export const MessageCard: React.FC<TMessageCardProps> = ({ children, type }) => (
  <div className={classnames('message-card', `message-card__${type}`)}>
    {children}
  </div>
);
