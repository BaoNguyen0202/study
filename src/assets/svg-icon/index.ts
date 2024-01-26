// your-svg-file.ts
import FilterSvg from './filter.svg';

const Filter: string = FilterSvg as any;
export const SvgComponent = { Filter };
export type SvgIconTypes = keyof typeof SvgComponent;
