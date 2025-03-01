import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui";

export const MyAvatar: FC = () => {
  return (
    <Avatar data-testid="cmp-my-avatar">
      <AvatarImage src="https://avatars.githubusercontent.com/u/7785066?v=4" alt="@tusharshuklaa" />
      <AvatarFallback>TS</AvatarFallback>
    </Avatar>
  );
};

MyAvatar.displayName = "MyAvatar";
