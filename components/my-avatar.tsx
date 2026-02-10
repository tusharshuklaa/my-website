import { Avatar, AvatarFallback } from '@components/ui';
import Image from 'next/image';
import type { FC } from 'react';

type MyAvatarProps = {
  src?: string;
  alt?: string;
  title?: string;
  fallback?: string;
  className?: string;
};

const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dx91z87ok/image/upload';
const DEFAULT_AVATAR_PUBLIC_ID = 'tushar-shukla_xcsbbs';
const DEFAULT_TRANSFORMS = 'f_auto,q_auto,c_fill,g_face,w_128,h_128,r_max';

export const MyAvatar: FC<MyAvatarProps> = ({ alt, className, fallback, src, title }) => {
  const avatarSrc = src
    ? src.startsWith('http')
      ? src
      : `${CLOUDINARY_BASE_URL}/${DEFAULT_TRANSFORMS}/v1/${src}`
    : `${CLOUDINARY_BASE_URL}/${DEFAULT_TRANSFORMS}/v1/${DEFAULT_AVATAR_PUBLIC_ID}`;

  return (
    <Avatar data-testid="cmp-my-avatar" className={className}>
      <Image
        className="aspect-square"
        src={avatarSrc}
        alt={alt || '@tusharshuklaa'}
        title={title || 'Tushar Shukla'}
        width={128}
        height={128}
        priority
      />
      <AvatarFallback>{fallback || 'TS'}</AvatarFallback>
    </Avatar>
  );
};

MyAvatar.displayName = 'MyAvatar';
