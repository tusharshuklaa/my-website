import { FC } from 'react';
import { getMDXComponent } from 'next-contentlayer2/hooks';

type MdxProps = {
  code: string;
};

const components = {
  // Heading
  h1: ({...props}) => (
    <h1 {...props}></h1>
  ),
};

export const Mdx:FC<MdxProps> = ({ code }) => {
  const Component = getMDXComponent(code);

  return <Component components={components} />;
};

Mdx.displayName = 'MdxComponent';
