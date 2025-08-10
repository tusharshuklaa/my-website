"use client";

import { FC, useState, useCallback, lazy, Suspense } from "react";
import { Command, Search } from "lucide-react";
import { Button } from "@ui";
import { useKeyboardShortcut } from "@hooks/use-command-plus-key";
import { shootConfetti } from "@/lib/commandCenterUtils";

const CommandCenterContent = lazy(() =>
  import("@components/command-center-content").then(module => ({
    default: module.CommandCenterContent,
  })),
);

export const CommandCenter: FC = () => {
  const [open, setOpen] = useState(false);

  const openCommandCenter = useCallback(() => setOpen(true), []);

  useKeyboardShortcut({
    key: "k",
    callback: openCommandCenter,
    modifiers: { ctrl: true, meta: true },
  });

  useKeyboardShortcut({
    key: "j",
    callback: () => shootConfetti("basic"),
    modifiers: { ctrl: true, meta: true },
  });

  return (
    <>
      <Button
        size="sm"
        onClick={openCommandCenter}
        variant="ghost"
        aria-label="Open command center"
        className="relative w-40 justify-between rounded-full bg-gray-900 transition-colors hover:bg-muted"
      >
        <Search className="h-[1rem] w-[1rem]" />
        <span className="flex items-center font-poppins">
          <Command className="h-3 w-3" />
          &nbsp;K
        </span>
      </Button>

      {open && (
        <Suspense fallback={<div>Loading...</div>}>
          <CommandCenterContent isOpen={open} setIsOpen={setOpen} />
        </Suspense>
      )}
    </>
  );
};
