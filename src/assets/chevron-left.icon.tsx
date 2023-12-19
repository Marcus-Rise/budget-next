import type { FC, SVGAttributes } from 'react';

type IconChevronLeftProps = SVGAttributes<SVGSVGElement>;

const IconChevronLeft: FC<IconChevronLeftProps> = ({
  width = '1rem',
  height = '1rem',
  ...props
}) => (
  <svg
    {...props}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" fill="none" />
    <path
      d="M14.5 17L9.5 12L14.5 7"
      className={'stroke-font'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { IconChevronLeft };
