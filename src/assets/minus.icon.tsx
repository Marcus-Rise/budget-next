import type { FC, SVGAttributes } from 'react';

type IconMinusProps = SVGAttributes<SVGSVGElement>;

const IconMinus: FC<IconMinusProps> = ({ width = '1rem', height = '1rem', ...props }) => (
  <svg
    {...props}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" fill="none" stroke={'none'} />
    <path d="M6 12H18" className={'stroke-font'} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export { IconMinus };
