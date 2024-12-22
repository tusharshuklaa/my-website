export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col w-full pt-32 pb-8 max-w-7xl m-auto">
      <div className="mb-14 flex space-between">
        <div className="w-1/2">
          <h3 className="text-3xl mb-4">Tushar's Personal Website</h3>
          <p>Design inspired by casual internet surfing 😆 and coded in Visual Studio Code. Built with Next.js, Tailwind, lots of coffee and ❤️</p>
          <p className="mt-4">Show some love to my Github repository for this website</p>
          <p>Pro Tip: You can find some more cool stuff in command center (Cmd + K)</p>
        </div>

        <div className="w-1/4 shrink-0">
          <h4 className="text-3xl mb-4">Pages</h4>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Work</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent to-transparent via-[#68d0ee] mb-4" />

      <div className="text-center text-gray-300">
        Copyright © {currentYear} Tushar Shukla. All rights reserved.
      </div>
    </footer>
  );
};
