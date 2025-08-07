import { FC } from "react";
import { Avatar, AvatarFallback } from "@components/ui";
import { AdvImage } from "./adv-image";

type MyAvatarProps = {
  src?: string;
  alt?: string;
  title?: string;
  fallback?: string;
  className?: string;
};

export const MyAvatar: FC<MyAvatarProps> = ({ alt, className, fallback, src, title }) => {
  return (
    <Avatar data-testid="cmp-my-avatar" className={className}>
      <AdvImage
        className="aspect-square"
        src={src || "tushar-shukla_xcsbbs"}
        alt={alt || "@tusharshuklaa"}
        title={title || "Tushar Shukla"}
        priority
      />
      <AvatarFallback>{fallback || "TS"}</AvatarFallback>
    </Avatar>
  );
};

MyAvatar.displayName = "MyAvatar";
