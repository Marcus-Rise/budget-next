import type { FC, SVGAttributes } from 'react';

type IconChevronRightProps = SVGAttributes<SVGSVGElement>;

const IconChevronRight: FC<IconChevronRightProps> = ({
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
      d="M9.5 7L14.5 12L9.5 17"
      className={'stroke-font'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { IconChevronRight };
