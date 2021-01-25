import React, { useEffect, useRef, useState } from "react";
import Flicking from "@egjs/react-flicking";
import styled from "styled-components";

const CompanyImgSlider = ({ images }: any) => {
  const [visibleBtns, setVisibleBtns] = useState(true);
  const flicking = React.useRef() as React.MutableRefObject<any>;
  const imagesLength = images.length;

  useEffect(() => {
    imagesLength <= 3 && setVisibleBtns(false);
  }, []);

  const moveToLeft = () => {
    flicking.current.prev();
  };

  const moveToRight = () => {
    flicking.current.next();
  };

  const flickingContainer = {
    width: "100%",
    height: "14rem",
  };

  return (
    <>
      {visibleBtns && (
        <ControlBtns>
          <LeftBtn onClick={moveToLeft} />
          <RightBtn onClick={moveToRight} />
        </ControlBtns>
      )}
      <SliderBox>
        <Flicking
          className="flicking flicking1"
          gap={24}
          lastIndex={4}
          bound={true}
          style={flickingContainer}
          ref={flicking}
        >
          {images.map((item: string, idx: number) => {
            return (
              <SliderImgWrapper key={idx}>
                <img alt="image" src={item} />
              </SliderImgWrapper>
            );
          })}
        </Flicking>
      </SliderBox>
    </>
  );
};

export default CompanyImgSlider;

const SliderBox = styled.div`
  width: 100%;
`;

const SliderImgWrapper = styled.div`
  width: 21rem;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

const ControlBtns = styled.div`
  width: 100%;
  height: 1.875rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0.875rem;
`;

const LeftBtn = styled.button`
  width: 0.438rem;
  height: 0.813rem;
  margin-right: 2.5rem;
  background-image: url("/images/startupDetail/leftarrow.png");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const RightBtn = styled.button`
  width: 0.438rem;
  height: 0.813rem;
  background-image: url("/images/startupDetail/rightarrow.png");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;
