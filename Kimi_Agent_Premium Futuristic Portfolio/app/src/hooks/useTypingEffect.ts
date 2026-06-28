import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypingEffectOptions {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  startDelay?: number;
}

export function useTypingEffect({
  strings,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseAfterType = 2000,
  pauseAfterDelete = 500,
  startDelay = 1200,
}: UseTypingEffectOptions) {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const stringIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const type = useCallback(() => {
    const currentString = strings[stringIndexRef.current];

    if (!isDeletingRef.current) {
      // Typing
      charIndexRef.current += 1;
      setText(currentString.slice(0, charIndexRef.current));

      if (charIndexRef.current === currentString.length) {
        isDeletingRef.current = true;
        timeoutRef.current = setTimeout(type, pauseAfterType);
        return;
      }
      timeoutRef.current = setTimeout(type, typeSpeed);
    } else {
      // Deleting
      charIndexRef.current -= 1;
      setText(currentString.slice(0, charIndexRef.current));

      if (charIndexRef.current === 0) {
        isDeletingRef.current = false;
        stringIndexRef.current = (stringIndexRef.current + 1) % strings.length;
        timeoutRef.current = setTimeout(type, pauseAfterDelete);
        return;
      }
      timeoutRef.current = setTimeout(type, deleteSpeed);
    }
  }, [strings, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete]);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      type();
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [type, startDelay]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return { text, showCursor };
}
