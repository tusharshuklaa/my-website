"use client";

import { FC } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';
import { ClipboardCopy } from 'lucide-react';
import { toast } from "sonner"
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from '@ui';
import { CoolBorder } from '@components/cool-border';

export const SocialShare: FC<UiComponent> = ({ className }) => {
  if (typeof window === 'undefined') return;

  const socialShareClasses = cn(
    "w-80 h-14 rounded-full py-2 px-6 flex justify-between items-center z-30 bg-black fixed left-0 right-0 bottom-6 m-auto",
    className
  );
  const shareUrl = window?.location.href || "https://tusharshukla.dev/blog";
  const shareContent = `Hey! Checkout this article - "${document.title}" - `;
  const htmlTitle = "Share this article on ";

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(shareUrl);
    toast.info("Link copied to clipboard");
  };

  return (
    <div
      data-testid="cmp-social-share"
      className={socialShareClasses}
    >
      <CoolBorder />
      <TwitterShareButton
        url={shareUrl}
        title={shareContent}
        htmlTitle={`${ htmlTitle } Twitter/X`}
      >
        <XIcon size={28} round />
      </TwitterShareButton>

      <LinkedinShareButton url={shareUrl} htmlTitle={`${ htmlTitle } Linkedin`}>
        <LinkedinIcon size={28} round />
      </LinkedinShareButton>

      <FacebookShareButton url={shareUrl} htmlTitle={`${ htmlTitle } Facebook`}>
        <FacebookIcon size={28} round />
      </FacebookShareButton>

      <WhatsappShareButton
        url={shareUrl}
        title={shareContent}
        separator=":: "
        htmlTitle={`${ htmlTitle } Whatsapp`}
      >
        <WhatsappIcon size={28} round />
      </WhatsappShareButton>

      <TelegramShareButton
        url={shareUrl}
        title={shareContent}
        htmlTitle={`${ htmlTitle } Telegram`}
      >
        <TelegramIcon size={28} round />
      </TelegramShareButton>

      <EmailShareButton
        url={shareUrl}
        subject="Check this out!"
        body={shareContent}
        htmlTitle={`${ htmlTitle } Email`}
      >
        <EmailIcon size={28} round />
      </EmailShareButton>

      <Button
        onClick={copyToClipboard}
        className="rounded-full border border-white flex items-center justify-center h-7 w-7"
        variant="clear"
        size="icon"
        title="Copy link"
      >
        <ClipboardCopy className="cursor-pointer" size="14" />
      </Button>
    </div>
  );
};

SocialShare.displayName = 'SocialShare';
