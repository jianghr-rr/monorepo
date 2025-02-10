import Image from 'next/image';

const Picture = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center overflow-hidden">
      <div className="flex w-[108rem] flex-none justify-end">
        <Image
          src="/tinypng.png"
          width={1600}
          height={900}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
};

export default Picture;
export { Picture };
