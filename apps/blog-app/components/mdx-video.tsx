/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRef, useEffect } from 'react';

const MdxVideo = (props: {
  videoSrc: string;
  videoType?: string;
  width?: number;
  height?: number;
}) => {
  const videoRef = useRef(null);
  const {
    videoSrc,
    videoType = 'video/webm',
    width = 1280,
    height = 720,
  } = props;

  useEffect(() => {
    if (videoRef && videoRef.current) {
      // @ts-ignore
      videoRef.current.play();
    }
  }, [videoRef]);

  return (
    <video ref={videoRef} width={width} height={height} controls loop>
      <source src={videoSrc} type={videoType} />
      Your browser does not support the video tag.
    </video>
  );
};

export default MdxVideo;
export { MdxVideo };
