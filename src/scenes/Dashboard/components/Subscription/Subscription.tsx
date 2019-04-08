import * as React from 'react';

import { Button } from 'Components/Button';

import s from './styles.scss';

type Props = {
  active: boolean;
  handleClick: () => void;
};

export const Subscription = (props: Props) => {
  const { active, handleClick } = props;

  return (
    <div
      className={active ? s.subscription : s.hidden}
    >
      <span className={s.title}>Subscription</span>
      <div className={s.content}>
        <header>
          <div className={s.tray} />
          <span>This customer doesn't have any active subscriptions</span>
        </header>
        <Button
          className={'btn-middle'}
          theme={'blue'}
          onClick={() => handleClick()}
        >
          Add product
        </Button>
      </div>
    </div>
  );
};
