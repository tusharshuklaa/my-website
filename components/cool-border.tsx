import { FC } from 'react';

export const CoolBorder:FC = () => (
  <div
    data-testid="cmp-cool-border"
    className={`absolute inset-0 block h-full w-full animate-gradient rounded-full bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] -z-[1]`}
  />
);

CoolBorder.displayName = 'CoolBorder';
