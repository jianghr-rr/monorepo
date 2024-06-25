/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Transition } from '~/components/transition';
import { useInterval } from '~/hooks';

const disciplines = [
  '螺旋阶梯(螺旋階段 / Rasen Kaidan)',
  '独角仙(カブトムシ/Kabutomushi)',
  '废墟街道(廃墟の街 / Haikyo no Machi)',
  '无花果塔(無花果の塔 / Ichijiku no Tō)',
  '独角仙(カブトムシ/ Kabutomushi)',
  '德蕾莎之道(テレサの道 / Teresa no Michi)',
  '独角仙(カブトムシ /Kabutomushi)',
  '特异点(特異点 / Tokuiten)',
  '乔托(ジョット / Giotto)',
  '天使(天使 / Tenshi)',
  '绣球花(紫陽花 / Ajisai)',
  '独角仙(カブトムシ / Kabutomushi) ',
  '特异点(特異点 / Tokuiten )',
  '秘密皇帝(秘密の皇帝 / Himitsu no Kōtei)',
  '话已至此...',
  'Made In Heaven! (Meido In Hebun)',
];
const HomePage = () => {
  const { theme } = useTheme();
  // const [displayedText, setDisplayedText] = useState('');
  const [disciplineIndex, setDisciplineIndex] = useState(0);

  const currentDiscipline = disciplines.find(
    (item, index) => index === disciplineIndex
  );

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    4000,
    theme
  );

  return (
    <div className="flex size-full items-center justify-center">
      <div className="page-row align-center mx-40 shrink-0 grow text-5xl">
        {disciplines.map((item) => (
          <Transition
            unmount
            in={item === currentDiscipline}
            timeout={{ enter: 3000, exit: 2000 }}
            key={item}
          >
            {({ status, nodeRef }: { status: string; nodeRef: any }) => (
              <span
                aria-hidden
                ref={nodeRef}
                className="page-word"
                data-plus={true}
                data-status={status}
              >
                {item}
              </span>
            )}
          </Transition>
        ))}
      </div>
    </div>
  );
};
export default HomePage;
