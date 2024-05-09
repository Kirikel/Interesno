import * as React from 'react';

const CloseIcon = ({ color = '#000', ...props }: any) => (
    <svg width='1em' height='1em' fill='none' {...props}>
        <path
            fill={color}
            d='M6.98 5.707A.9.9 0 0 0 5.705 6.98L10.727 12l-5.02 5.02a.9.9 0 0 0 1.273 1.273l5.02-5.02 5.02 5.02a.9.9 0 1 0 1.273-1.273L13.273 12l5.02-5.02a.9.9 0 1 0-1.272-1.273L12 10.727l-5.02-5.02Z'
        />
    </svg>
);
export default CloseIcon;
