import { MyAvatar } from '@components/my-avatar';
import { PaymentButton } from '@components/payment-button';
import { PrettyLink } from '@components/pretty-link';
import { AnimatedHeading } from '@components/text';
import { CardDescription, CardTitle, MagicCard } from '@components/ui';
import type { FC } from 'react';

const SupportMePage: FC = () => (
  <div className="m-auto max-w-sm antialiased md:max-w-5xl">
    <section className="relative mx-auto mt-20 max-w-4xl px-4 md:mt-40 md:px-2">
      <AnimatedHeading className="mb-8 sm:mb-40">Support my Work</AnimatedHeading>

      <p className="text-lg leading-7 md:text-xl">
        <MyAvatar className="mx-auto mb-8 mr-16 h-48 w-48 sm:float-start sm:h-72 sm:w-72 sm:[shape-outside:ellipse(47.7%_53.8%_at_8.88rem_8.88rem)]" />
        Hi there! 👋
        <br />
        <br />
        My name is Tushar Shukla, and I&apos;m a Senior Frontend Developer passionate about the latest web trends, CSS
        art, and creating free tools and articles to help the community. You can check out my work on my{' '}
        <PrettyLink title="showcase page" href="/showcase" hoverEffect={false}>
          Showcase page
        </PrettyLink>
        <br />
        <br />
        All of my content is free to access and open source and your support would be greatly appreciated. If
        your&apos;e inclined to contribute, and only if you can afford to, consider making a donation through any of the
        listed platforms.
        <br />
        <br />
        Even if you&apos;re not in a position to contribute financially, you can still make a difference by giving the{' '}
        <PrettyLink title="Tushar's portfolio GitHub repository" href="https://github.com/tusharshuklaa/my-website">
          GitHub repository
        </PrettyLink>{' '}
        a star, sharing my content with your friends, or dropping a quick message to let me know how my work has helped
        you.
        <span className="mt-12 block w-full text-center text-2xl">
          Your feedback and support are always welcome and much appreciated!
        </span>
      </p>
    </section>

    <section className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-2">
      <MagicCard className="flex flex-col justify-between rounded-lg p-4" containerClassName="flex flex-col h-full">
        <div className="h-full">
          <CardTitle className="text-center text-2xl">Support with a Coffee</CardTitle>
          <CardDescription className="mt-8 p-4 text-center text-base leading-loose">
            You can buy me a virtual coffee (or a 🍺).
            <br />
            <br />
            This is probably a great option for my international friends!
          </CardDescription>
        </div>
        <div className="mt-8 flex justify-center">
          <PaymentButton
            url="https://buymeacoffee.com/tusharshukla.dev"
            logoSrc="images/buy-me-a-coffee.svg"
            logoAlt="Buy me a coffee logo"
            buttonText="Buy me a Coffee"
            variant="yellow"
          />
        </div>
      </MagicCard>

      <MagicCard className="rounded-lg p-4" containerClassName="flex flex-col h-full">
        <div className="h-full">
          <CardTitle className="text-center text-2xl">Pay via UPI or Card</CardTitle>
          <CardDescription className="mt-8 p-4 text-center text-base leading-loose">
            You can also use the secure Razorpay gateway to contribute via UPI (GPay, PhonePe, etc.), credit/debit
            cards.
            <br />
            <br />
            This might be a better option for my friends in India.
          </CardDescription>
        </div>

        <div className="mt-8 flex justify-center">
          <PaymentButton
            url="https://razorpay.me/@tusharshukladev"
            logoSrc="images/razorpay-logo.svg"
            logoAlt="Razorpay logo"
            buttonText="Pay with Razorpay"
            buttonSubText="Secured by RazorPay"
            variant="blue"
          />
        </div>
      </MagicCard>
    </section>
  </div>
);

export default SupportMePage;
