import type { FC, SVGAttributes } from 'react';

type IconProfileProps = SVGAttributes<SVGSVGElement>;

const IconProfile: FC<IconProfileProps> = ({ width = '1rem', height = '1rem', ...props }) => (
  <svg {...props} width={width} height={height} version="1.1" viewBox="0 0 100 100">
    <path d="M50,46.5c-7.2,0-13-5.8-13-13s5.8-13,13-13c7.2,0,13,5.8,13,13S57.2,46.5,50,46.5z M50,24.5c-5,0-9,4-9,9s4,9,9,9s9-4,9-9  S55,24.5,50,24.5z" />
    <path d="M69.2,67.1H31.3c-2,0-2.9-2.2-2.9-3.7v-6.6c0-7.9,9.7-14,22-14c12.3,0,22,6.1,22,14v6.6C72.4,64.6,71.3,67.1,69.2,67.1z   M32.4,63.1h36v-6.3c0-5.4-8.2-10-18-10s-18,4.6-18,10V63.1z" />
  </svg>
);

export { IconProfile };
