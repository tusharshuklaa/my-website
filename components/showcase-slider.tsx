import { FC } from "react";
import Link from "next/link";
import { UiComponent } from "@/types";
import { cn } from "@/lib/utils";
import { ThreeDSliderContainer, ThreeDSliderItem } from "@components/three-d-slider";
import ShowcaseData from "@/data/showcase.json";
import { Button, Card, CardDescription, CardTitle } from "@ui";
import { GradientText } from "@components/text";
import { AnimatedHeading } from "@components/text/heading";
import { AdvImage } from "@components/adv-image";

export type Showcase = {
  title: string;
  url: string;
  img: string;
  description: string;
  tags: Array<string>;
  featured: boolean;
};

const ShowcaseCard: FC<Showcase> = ({ title, url, img, description }) => {
  return (
    <Card className="relative p-0">
      <div className="before:margin-auto absolute inset-0 before:absolute before:inset-0 before:z-[1] before:h-full before:w-full before:bg-black before:opacity-70">
        <AdvImage
          src={img}
          alt={title}
          fill
          className="object-fit"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-2 font-dongle text-white">
        <div className="flex flex-col">
          <CardTitle className="mt-0 text-left text-xl leading-none">
            <Link href={url}>
              <GradientText text={title} color="green" />
            </Link>
          </CardTitle>
        </div>
        <CardDescription className="mt-1 line-clamp-3 text-left leading-none">{description}</CardDescription>
      </div>
    </Card>
  );
};

const SliderBgContent: FC = () => {
  return (
    <>
      <div className="absolute bottom-0 left-0 z-[1] h-[40vmin] w-full animate-pulse bg-cosmic-bot bg-[length:auto_140%] bg-[top_center] bg-no-repeat"></div>
      <Button
        variant="magic"
        size="auto"
        className="absolute inset-0 -bottom-40 m-auto max-h-max w-[40vmin] sm:w-[20vmin]"
      >
        <Link href="/showcase">See More</Link>
      </Button>
    </>
  );
};

export const ShowcaseSlider: FC<UiComponent> = ({ className }) => {
  const showcaseSliderClasses = cn(
    "flex h-screen min-h-svh w-full flex-col items-start justify-center gap-5 mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-10",
    className,
  );

  const showcaseData: Array<Showcase> = ShowcaseData.showcase.filter(item => item.featured).slice(0, 7);

  return (
    <section data-testid="cmp-showcase-slider" className={showcaseSliderClasses} id="my-crafts">
      <AnimatedHeading className="mb-20 w-full text-center">
        <GradientText text={"A Cluster of my Crafts"} className="mb-4 max-w-4xl text-screen-md" color="indigo" />
      </AnimatedHeading>

      <ThreeDSliderContainer
        className="overflow-visible"
        sliderClassName="w-[35vmin] sm:w-[25vmin] h-[50vmin] sm:h-[20vmin] z-[2]"
        extraContent={<SliderBgContent />}
      >
        {showcaseData.map((item, index) => (
          <ThreeDSliderItem key={index} position={index + 1}>
            <ShowcaseCard {...item} />
          </ThreeDSliderItem>
        ))}
      </ThreeDSliderContainer>
    </section>
  );
};

ShowcaseSlider.displayName = "ShowcaseSlider";
