import { useEffect, useCallback } from "react";

type UseKeyboardShortcutOptions = {
  key: string;
  callback: () => void;
  modifiers?: {
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
    alt?: boolean;
  };
  preventDefault?: boolean;
  enabled?: boolean;
};

export const useKeyboardShortcut = ({
  key,
  callback,
  modifiers = { ctrl: true, meta: true },
  preventDefault = true,
  enabled = true,
}: UseKeyboardShortcutOptions) => {
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const keyMatches =
        event.key.toLowerCase() === key.toLowerCase() || event.code.toLowerCase() === key.toLowerCase();

      if (!keyMatches) return;

      const hasRequiredModifier = Object.entries(modifiers).some(([modifier, required]) => {
        if (!required) return false;

        switch (modifier) {
          case "ctrl":
            return event.ctrlKey;
          case "meta":
            return event.metaKey;
          case "shift":
            return event.shiftKey;
          case "alt":
            return event.altKey;
          default:
            return false;
        }
      });

      const shouldTrigger = Object.keys(modifiers).length === 0 || hasRequiredModifier;

      if (shouldTrigger) {
        if (preventDefault) {
          event.preventDefault();
        }
        memoizedCallback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, modifiers, preventDefault, enabled, memoizedCallback]);
};
