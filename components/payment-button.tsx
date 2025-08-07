import { FC } from "react";
import { UiComponent } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type PaymentButtonProps = UiComponent<{
  url: string;
  logoSrc: string;
  logoAlt: string;
  buttonText: string;
  buttonSubText?: string;
  variant: "yellow" | "blue";
  iconWidth?: number;
  iconHeight?: number;
}>;

export const PaymentButton: FC<PaymentButtonProps> = ({
  url,
  logoSrc,
  logoAlt,
  buttonText,
  buttonSubText,
  variant = "yellow",
  iconWidth = 25,
  iconHeight = 32,
}) => {
  const buttonClasses = cn(
    "gap-2 inline-flex items-center px-5 py-3 text-white font-semibold rounded-lg shadow transition-colors duration-200 transform before:content-[''] before:absolute before:top-0 before:left-[-6px] before:w-16 before:h-full before:rounded-lt-lg before:transform before:skew-x-[-15deg] overflow-hidden",
    {
      "bg-[#072654] hover:bg-[#1e40a0] before:bg-[#1e40a0]": variant === "blue",
      "bg-yellow-700 hover:bg-yellow-500 before:bg-yellow-500": variant === "yellow",
    },
  );

  return (
    <Link
      data-testid="cmp-buy-me-a-coffee"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses}
    >
      <Image src={logoSrc} alt={logoAlt} width={iconWidth} height={iconHeight} className="z-[1] mr-4" />

      <div className="flex flex-col items-center">
        <span>{buttonText}</span>
        {buttonSubText && <span className="text-[9px] italic text-gray-200">{buttonSubText}</span>}
      </div>
    </Link>
  );
};

PaymentButton.displayName = "BuyMeACoffee";
