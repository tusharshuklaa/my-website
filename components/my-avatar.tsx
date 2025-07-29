import { FC } from "react";
import { Avatar, AvatarFallback } from "@components/ui";
import { AdvImage } from "./adv-image";

type MyAvatarProps = {
  src?: string;
  alt?: string;
  title?: string;
  fallback?: string;
};

export const MyAvatar: FC<MyAvatarProps> = ({ alt, fallback, src, title }) => {
  return (
    <Avatar data-testid="cmp-my-avatar">
      <AdvImage
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
