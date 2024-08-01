/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client';
import { useSize } from 'ahooks';
import {
  useLayoutEffect,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { AmbientLightBg } from '~color4bg/AmbientLightBg.module';
import { Input } from '~ui/input';
import { Slider } from '~ui/slider';

let palettes =
  '\u003CQuerySet [{\u0027id\u0027: 56, \u0027name\u0027: \u0027Clean Sky\u0027, \u0027colors\u0027: \u0027#4098DB,#ECF3FC,#C1EBFB,#A9E0F8,#5FD2FA,#4CB0ED\u0027, \u0027num\u0027: 6}, {\u0027id\u0027: 77, \u0027name\u0027: \u0027Japan Denim\u0027, \u0027colors\u0027: \u0027#193153,#CEDCEF,#95BDE2,#5886C8,#1E498A\u0027, \u0027num\u0027: 5}, {\u0027id\u0027: 120, \u0027name\u0027: \u0027Vibrant Ocean\u0027, \u0027colors\u0027: \u0027#0106AC,#F2F8F4,#B0FDC3,#70E5E6,#33D3DF,#0F67FE\u0027, \u0027num\u0027: 6}, {\u0027id\u0027: 147, \u0027name\u0027: \u0027Dark Blue Skies\u0027, \u0027colors\u0027: \u0027#004880,#CDCFCF,#3390C0,#2B71A1,#005A92\u0027, \u0027num\u0027: 5}, {\u0027id\u0027: 167, \u0027name\u0027: \u0027Ocean Energy\u0027, \u0027colors\u0027: \u0027#76EEEB,#09C4CF,#008095,#032B76,#0163DF,#B7D1FF\u0027, \u0027num\u0027: 6}, {\u0027id\u0027: 206, \u0027name\u0027: \u0027Sea Colors\u0027, \u0027colors\u0027: \u0027#085D97,#67D19F,#F8F5F0,#00EAEB,#1FB6D6,#107BAC\u0027, \u0027num\u0027: 6}, {\u0027id\u0027: 223, \u0027name\u0027: \u0027Bombay Sapphire\u0027, \u0027colors\u0027: \u0027#0F52BB,#27C6E6,#D2F6F7,#B0EEF4,#439AE6\u0027, \u0027num\u0027: 5}, {\u0027id\u0027: 415, \u0027name\u0027: \u0027Cyan Shades\u0027, \u0027colors\u0027: \u0027#4A86B4,#265999,#1781C2,#0CBCEB,#D6FFFA\u0027, \u0027num\u0027: 5}, {\u0027id\u0027: 468, \u0027name\u0027: \u0027Spring Blues\u0027, \u0027colors\u0027: \u0027#3155A0,#2984C3,#5ABAD5,#ABEDE6,#32BFAE,#118AAD\u0027, \u0027num\u0027: 6}, {\u0027id\u0027: 552, \u0027name\u0027: \u0027Feeling The Blues\u0027, \u0027colors\u0027: \u0027#565194,#64A2C2,#84BACF,#899ED6,#607CBF,#4765A8\u0027, \u0027num\u0027: 6}, {\u0027id\u0027: 612, \u0027name\u0027: \u0027Dark Blue Monotone\u0027, \u0027colors\u0027: \u0027#001657,#002688,#0135A7,#0F40C5,#3E66F0\u0027, \u0027num\u0027: 5}, {\u0027id\u0027: 705, \u0027name\u0027: \u0027Dark Ocean Waters\u0027, \u0027colors\u0027: \u0027#9FE3EE,#1E5880,#103E62,#002848,#051124\u0027, \u0027num\u0027: 5}, {\u0027id\u0027: 708, \u0027name\u0027: \u0027Clear Skies\u0027, \u0027colors\u0027: \u0027#1483C3,#429ED2,#7CD5EB,#EFF0EC,#9AB9DC\u0027, \u0027num\u0027: 5}, {\u0027id\u0027: 750, \u0027name\u0027: \u0027Pale Blues\u0027, \u0027colors\u0027: \u0027#AAD6E9,#D1E2EE,#E1EAF3,#C6D2D4,#B2C1EB,#A3AED2\u0027, \u0027num\u0027: 6}, {\u0027id\u0027: 774, \u0027name\u0027: \u0027Calming Dark Blues\u0027, \u0027colors\u0027: \u0027#473E81,#6578B9,#A9BFDC,#3D7AB1,#2B6197,#314488\u0027, \u0027num\u0027: 6}, {\u0027id\u0027: 795, \u0027name\u0027: \u0027Horizon Of Blue\u0027, \u0027colors\u0027: \u0027#0E7FB0,#88C5F9,#FFF8F1,#EEDAD3,#B8D7E4\u0027, \u0027num\u0027: 5}, {\u0027id\u0027: 5464, \u0027name\u0027: \u0027Dark Blue Pastel Gradient\u0027, \u0027colors\u0027: \u0027#9CA6D9,#8793CC,#7C8AC5,#7280BF,#6777B8\u0027, \u0027num\u0027: 5}, {\u0027id\u0027: 5469, \u0027name\u0027: \u0027Purple And Blue Gradient\u0027, \u0027colors\u0027: \u0027#8B72BE,#7863B6,#6554AE,#5245A6,#3F369E,#2C2796\u0027, \u0027num\u0027: 6}, {\u0027id\u0027: 5478, \u0027name\u0027: \u0027Lord Krishna Blue\u0027, \u0027colors\u0027: \u0027#9FCFFF,#6BA3FA,#3667F0,#284CE0\u0027, \u0027num\u0027: 4}, {\u0027id\u0027: 5484, \u0027name\u0027: \u0027Azure Gradient\u0027, \u0027colors\u0027: \u0027#007FFE,#3099FE,#60B2FE,#90CCFE,#C0E5FE,#F0FFFE\u0027, \u0027num\u0027: 6}, \u0027...(remaining elements truncated)...\u0027]\u003E';
palettes = '[' + palettes.replace(/<QuerySet \[|\]>/g, '') + ']';
palettes = JSON.parse(palettes.replace(/'/g, '"'));

const HomePage = () => {
  const ref = useRef(null);
  const size = useSize(ref);
  const [ambientLightBg, setAmbientLightBg] = useState<any>();
  const [palette, setPalette] = useState<any>([
    '#D1ADFF',
    '#98D69B',
    '#FAE390',
    '#FFACD8',
    '#7DD5FF',
    '#D1ADFF',
  ]);
  const [seed, setSeed] = useState<number>(1000);
  const [loopSpeed, setLoopSpeed] = useState<number[]>([2]);
  const [patternScale, setPatternScale] = useState<number[]>([1]);
  const [blur, setBlur] = useState<number[]>([0]);
  const [shape, setShape] = useState<number[]>([0.02]);
  const [background, setBackground] = useState<number[]>([0]);

  const randomPickPalette = useCallback(() => {
    let _palette;
    const e = Math.floor(Math.random() * 7);
    // @ts-ignore
    _palette = (_palette = palettes[e].colors).replace(/\s*/g, '').split(',');
    ambientLightBg?.colors(_palette);
    setPalette(_palette);
  }, [ambientLightBg]);

  const onSeedChange = useCallback(
    (e: any) => {
      setSeed(e.target.value - 0);
      ambientLightBg.update('seed', e.target.value);
    },
    [ambientLightBg]
  );

  const onLoopSpeedChange = useCallback(
    (e: any) => {
      setLoopSpeed(e as number[]);
      console.log(e?.[0] - 0);
      ambientLightBg.update('speed', e?.[0] - 0);
    },
    [ambientLightBg]
  );

  const onPatternScaleChange = useCallback(
    (e: any) => {
      setPatternScale(e as number[]);
      ambientLightBg.update('pattern scale', e?.[0] - 0);
    },
    [ambientLightBg]
  );

  const onBlurChange = useCallback(
    (e: any) => {
      setBlur(e as number[]);
      ambientLightBg.update('edge blur', e?.[0] - 0);
    },
    [ambientLightBg]
  );

  const onShapeChange = useCallback(
    (e: any) => {
      setShape(e as number[]);
      ambientLightBg.update('brightness', e?.[0] - 0);
    },
    [ambientLightBg]
  );

  const onBackgroundChange = useCallback(
    (e: any) => {
      setBackground(e as number[]);
      ambientLightBg.update('darkness', e?.[0] - 0);
    },
    [ambientLightBg]
  );

  useLayoutEffect(() => {
    setAmbientLightBg(
      new AmbientLightBg({
        dom: 'box',
        colors: palette,
        seed: seed,
        loop: !0,
      })
    );
  }, []);

  useEffect(() => {
    ambientLightBg?.resize();
  }, [size, ambientLightBg]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 flex size-full items-center justify-center"
    >
      <div id="box" className="size-full"></div>
      <div
        id="controls_panel"
        className="absolute right-12 top-24 w-56 rounded-lg bg-zinc-50 p-4"
      >
        <div className="palette-row flex justify-around rounded-lg py-4">
          {palette.map((c: string, i: number) => (
            <div
              key={c + ' ' + i}
              className={`size-6 rounded-3xl`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <div className="options flex justify-between">
          <div
            className="button stroke flex-1 cursor-pointer"
            onClick={randomPickPalette}
          >
            随机颜色
          </div>
        </div>
      </div>

      <div className="info-title-options absolute bottom-48 left-24 w-2/6 rounded-sm bg-white/[.06] p-2">
        <div id="options_box">
          <div className="options-row mb-2 flex items-center justify-center gap-4">
            <div className="basis-48 text-white">Random Seed</div>
            <Input
              type="text"
              className="border-none bg-white/[.06] text-white"
              value={seed}
              onChange={onSeedChange}
            />
          </div>
          <div className="options-row mb-2 flex items-center justify-center gap-4">
            <div className="basis-48 text-white">Loop speed</div>
            <Slider
              className="flex-auto"
              max={10}
              min={1}
              step={1}
              value={loopSpeed}
              onValueChange={onLoopSpeedChange}
            />
            <p className="basis-14 text-white">{loopSpeed?.[0]}</p>
          </div>

          <div className="options-row mb-2 flex items-center justify-center gap-4">
            <div className="basis-48 text-white">Scale</div>
            <Slider
              className="flex-auto"
              max={1}
              min={0}
              step={0.15}
              value={patternScale}
              onValueChange={onPatternScaleChange}
            />
            <p className="basis-14 text-white">{patternScale?.[0]}</p>
          </div>

          <div className="options-row mb-2 flex items-center justify-center gap-4">
            <div className="basis-48 text-white">Blur</div>
            <Slider
              className="flex-auto"
              max={1}
              min={0}
              step={0.01}
              value={blur}
              onValueChange={onBlurChange}
            />
            <p className="basis-14 text-white">{blur?.[0]}</p>
          </div>

          <div className="options-row mb-2 flex items-center justify-center gap-4">
            <div className="basis-48 text-white">Shape</div>
            <Slider
              className="flex-auto"
              max={1.2}
              min={0}
              step={0.01}
              value={shape}
              onValueChange={onShapeChange}
            />
            <p className="basis-14 text-white">{shape?.[0]}</p>
          </div>

          <div className="options-row mb-2 flex items-center justify-center gap-4">
            <div className="basis-48 text-white">Background</div>
            <Slider
              className="flex-auto"
              max={1}
              min={0}
              step={0.1}
              value={background}
              onValueChange={onBackgroundChange}
            />
            <p className="basis-14 text-white">{background?.[0]}</p>
          </div>
        </div>
      </div>

      <div className="info-title-options absolute bottom-24 left-2/4 w-40 rounded-sm bg-white/[.06] p-2">
        <div className="play-pause">
          <div
            className="play btn flex items-center bg-transparent"
            onClick={() => {
              ambientLightBg.loop = !ambientLightBg.loop;
            }}
          >
            <div className="title text-white">Play/Pause</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
