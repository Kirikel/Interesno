import * as React from 'react';
import { SVGProps } from 'react';
import styles from './loader.module.css';

export const Loader = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    preserveAspectRatio='xMidYMid'
    style={{
      shapeRendering: 'auto',
      display: 'block',
      background: '0 0'
    }}
    viewBox='0 0 100 100'
    {...props}
    className={styles.loader}
  >
    <path fill='#fff' d='M10 50a40 40 0 0 0 80 0 40 42 0 0 1-80 0'>
      <animateTransform
        attributeName='transform'
        dur='1s'
        keyTimes='0;1'
        repeatCount='indefinite'
        type='rotate'
        values='0 50 51;360 50 51'
      />
    </path>
  </svg>
);
