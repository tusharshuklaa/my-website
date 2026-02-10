import type { Metadata } from 'next';
import { GlitchText, Underline } from '@/components/text';
import { BackgroundBeams } from '@/components/ui/background-beams';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotFound() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center rounded-md bg-neutral-950 antialiased">
      <div className="mx-auto max-w-4xl p-4">
        <GlitchText className="mb-8 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text font-sans text-8xl font-bold text-transparent">
          404: NOT FOUND!
        </GlitchText>
        <p></p>
        <p className="relative z-10 mx-auto my-2 max-w-lg text-center text-neutral-500">
          Oops! The page you&apos;re looking for is either moved or doesn&apos;t exist. <br />
          If you think this is a mistake, please{' '}
          <a href="mailto:tusharshukla.dev@gmail.com">
            <Underline>contact me</Underline>
          </a>
          . <br />
          <br />
          Feel free to checkout the{' '}
          <a href="/">
            <Underline>rest of my site</Underline>
          </a>{' '}
          :)
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
}
