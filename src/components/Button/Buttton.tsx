import s from './styles.scss';

import * as React from 'react';
import classNames from 'classnames';

export type ButtonTheme = 'primary' | 'blue';

export type Props = {
  className?: string;
  theme?: ButtonTheme;
  disabled?: boolean;
  children?: any;
  title?: string;
  type?: string;
  onClick?: () => void;
};

export const Button: React.SFC<Props> = ({
  className,
  theme,
  disabled,
  onClick,
  children,
  title,
  type,
}) => {
  const btnClassName = classNames(
    s.button,
    theme ? s[theme] : null,
    className,
  );

  return (
    <button
      type={type || 'button'}
      className={btnClassName}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  theme: 'primary',
  disabled: false,
  className: 'btn-small',
};
