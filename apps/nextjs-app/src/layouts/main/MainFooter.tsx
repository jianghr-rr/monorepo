import styled from '@emotion/styled';
import type { FC } from 'react';

const BgWaved = styled.div`
  //background-size: cover;
  object-fit: cover;
  position: absolute;
  width: 100%;
  object-position: center;
  display: block;
`;

const FooterCtn = styled.footer`
  display: grid;
  .content,
  .bgImage {
    grid-area: 1 / 1;
  }
  .bgImage {
    z-index: -1;
  }
`;

export const MainFooter: FC = () => {
  return (
    <FooterCtn>
      <div className={'bgImage'}>
        <BgWaved />
      </div>
    </FooterCtn>
  );
};
