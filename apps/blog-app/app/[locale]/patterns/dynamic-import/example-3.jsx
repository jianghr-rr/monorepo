/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRef, useEffect } from 'react';

const Example3 = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      // @ts-ignore
      videoRef.current.play();
    }
  }, [videoRef]);

  return (
    <video ref={videoRef} width="1280" height="720" controls>
      <source
        src="/videos/patterns/dynamic-import/dynamic-import.webm"
        type="video/webm"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default Example3;
export { Example3 };