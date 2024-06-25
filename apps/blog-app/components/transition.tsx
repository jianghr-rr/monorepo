/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, usePresence } from 'framer-motion';
import { useEffect, useRef, useState, type MutableRefObject } from 'react';

interface TransitionProps {
  children: any;
  in: boolean;
  unmount?: boolean;
  initial?: boolean;
  [key: string]: any;
}
/**
 * A lightweight Framer Motion `AnimatePresence` implementation of
 * `react-transition-group` to be used for simple vanilla css transitions
 */
export const Transition = ({
  children,
  in: show,
  unmount,
  initial = true,
  ...props
}: TransitionProps) => {
  const enterTimeout = useRef<number>();
  const exitTimeout = useRef<number>();

  useEffect(() => {
    if (show) {
      clearTimeout(exitTimeout.current);
    } else {
      clearTimeout(enterTimeout.current);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {(show || !unmount) && (
        <TransitionContent
          enterTimeout={enterTimeout}
          exitTimeout={exitTimeout}
          in={show}
          initial={initial}
          {...props}
        >
          {children}
        </TransitionContent>
      )}
    </AnimatePresence>
  );
};

interface TransitionContentProps {
  children: React.ReactNode;
  timeout?: number;
  enterTimeout?: MutableRefObject<number | undefined>;
  exitTimeout?: MutableRefObject<number | undefined>;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  initial?: boolean;
  nodeRef?: React.MutableRefObject<HTMLElement | null>;
  in?: boolean;
}
const TransitionContent = ({
  children,
  timeout = 0,
  enterTimeout,
  exitTimeout,
  onEnter,
  onEntered,
  onExit,
  onExited,
  initial,
  nodeRef: defaultNodeRef,
  in: show,
}: TransitionContentProps) => {
  const [status, setStatus] = useState(initial ? 'exited' : 'entered');
  const [isPresent, safeToRemove] = usePresence();
  const [hasEntered, setHasEntered] = useState(initial ? false : true);
  const splitTimeout = typeof timeout === 'object';
  const internalNodeRef = useRef(null);
  const nodeRef = defaultNodeRef ?? internalNodeRef;
  const visible = hasEntered && show ? isPresent : false;

  useEffect(() => {
    if (hasEntered || !show) return;

    // @ts-ignore
    const actualTimeout = splitTimeout ? timeout.enter : timeout;

    clearTimeout(enterTimeout?.current);
    clearTimeout(exitTimeout?.current);

    setHasEntered(true);
    setStatus('entering');
    onEnter?.();

    // Force reflow
    nodeRef.current?.offsetHeight;

    // @ts-ignore
    enterTimeout.current = setTimeout(() => {
      setStatus('entered');
      onEntered?.();
    }, actualTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEnter, onEntered, timeout, status, show]);

  useEffect(() => {
    if (isPresent && show) return;

    // @ts-ignore
    const actualTimeout = splitTimeout ? timeout.exit : timeout;

    clearTimeout(enterTimeout?.current);
    clearTimeout(exitTimeout?.current);

    setStatus('exiting');
    onExit?.();

    // Force reflow
    nodeRef.current?.offsetHeight;

    // @ts-ignore
    exitTimeout.current = setTimeout(() => {
      setStatus('exited');
      safeToRemove?.();
      onExited?.();
    }, actualTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent, onExit, safeToRemove, timeout, onExited, show]);

  // @ts-ignore
  return children({ visible, status, nodeRef });
};
