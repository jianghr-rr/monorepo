'use client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SideBar } from '~/components/sidebar';

export default function PatternsPageSideBar({
  direction,
}: {
  direction: string;
}) {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
      {
        href: '/graphics',
        label: t('graphics.title'),
        children: [
          {
            href: '/graphics/canvas',
            label: t('graphics.canvas.title'),
          },
          {
            href: '/graphics/svg',
            label: t('graphics.svg.title'),
          },
          {
            href: '/graphics/webgl',
            label: t('graphics.WebGL.title'),
            children: [
              {
                href: '/graphics/webgl/demo',
                label: t('graphics.WebGL.demo'),
              },
              {
                href: '/graphics/webgl/cube',
                label: t('graphics.WebGL.cube'),
              },
            ],
          },
          {
            href: '/graphics/coordinate',
            label: t('graphics.coordinate.title'),
          },
          {
            href: '/graphics/fabric',
            label: t('graphics.fabric.title'),
            children: [
              {
                href: '/graphics/fabric/initial',
                label: t('graphics.fabric.initial'),
              },
              {
                href: '/graphics/fabric/add-line',
                label: t('graphics.fabric.addLine'),
              },
              {
                href: '/graphics/fabric/select-line',
                label: t('graphics.fabric.selectLine'),
              },
              {
                href: '/graphics/fabric/redraw-line',
                label: t('graphics.fabric.redrawLine'),
              },
              {
                href: '/graphics/fabric/fabric-demo',
                label: t('graphics.fabric.fabricDemo.title'),
                children: [
                  {
                    href: '/graphics/fabric/fabric-demo/e-w-e-b',
                    label: t(
                      'graphics.fabric.fabricDemo.ErasingWithEraserBrush'
                    ),
                  },
                ],
              },
            ],
          },
          {
            href: '/graphics/three',
            label: t('graphics.three.title'),
            children: [
              {
                href: '/graphics/three/thebasics',
                label: t('graphics.three.theBasics'),
              },
              {
                href: '/graphics/three/thebasics/scene',
                label: t('graphics.three.tb.scene'),
              },
              {
                href: '/graphics/three/thebasics/camera',
                label: t('graphics.three.tb.camera'),
              },
              {
                href: '/graphics/three/thebasics/webglrender',
                label: t('graphics.three.tb.webglrender'),
              },
              {
                href: '/graphics/three/game',
                label: t('graphics.three.game.title'),
                children: [
                  {
                    href: '/graphics/three/game/mvc',
                    label: t('graphics.three.game.mvc'),
                  },
                  {
                    href: '/graphics/three/game/step1',
                    label: t('graphics.three.game.step1'),
                  },
                  {
                    href: '/graphics/three/game/step2',
                    label: t('graphics.three.game.step2'),
                  },
                ],
              },
            ],
          },
          {
            href: '/graphics/three/r3f',
            label: t('graphics.three.r3f.title'),
            children: [
              {
                href: '/graphics/three/r3f/thebasics',
                label: t('graphics.three.r3f.theBasics'),
              },
              {
                href: '/graphics/three/r3f/editable-cube',
                label: t('graphics.three.r3f.editableCube'),
              },
            ],
          },
        ],
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
