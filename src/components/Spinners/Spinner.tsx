import * as React from 'react';
import { SyncLoader } from 'react-spinners';

import s from './styles.scss';

type Props = {
  active?: boolean;
  size?: number;
  position?: 'absolute' | 'fixed';
};

export const Spinner: React.SFC<Props> = ({ active = true, size = 10, position = 'absolute' }) => (
  <div className={s.spinnerContainer} style={{ position }}>
    <SyncLoader color={'red'} loading={active} size={size} />
  </div>
);
