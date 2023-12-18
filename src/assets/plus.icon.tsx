import type { FC, SVGAttributes } from 'react';

type IconPlusProps = SVGAttributes<SVGSVGElement>;

const IconPlus: FC<IconPlusProps> = ({ width = '1rem', height = '1rem', ...props }) => (
  <svg {...props} width={width} height={height} version="1.1" id="Capa_1" viewBox="0 0 455 455">
    <polygon
      points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5
	455,242.5 "
    />
  </svg>
);

export { IconPlus };
