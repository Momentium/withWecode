import React, {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  MutableRefObject,
} from "react";
import styled from "styled-components";
import Flicking from "@egjs/react-flicking";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: "500px",
      height: "500px",

      "& img": {
        width: "100%",
        height: "100%",
      },
    },
  })
);

const CompanyImgSlider = ({ images }: any) => {
  const [open, setOpen] = React.useState(false);
  const [currImg, setCurrImg] = React.useState<string>();
  const flicking = React.useRef() as React.MutableRefObject<any>;

  const moveToLeft = () => {
    flicking.current.prev();
  };

  const moveToRight = () => {
    flicking.current.next();
  };

  const handleOpen = (event: MouseEvent) => {
    const src = (event.target as HTMLSourceElement).src;
    setCurrImg(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const flickingContainer = {
    width: "100%",
    height: "14rem",
  };

  const classes = useStyles();

  return (
    <>
      <ControlBtns>
        <LeftBtn onClick={moveToLeft} />
        <RightBtn onClick={moveToRight} />
      </ControlBtns>

      <SliderBox>
        <Flicking
          className="flicking flicking1"
          gap={24}
          lastIndex={4}
          bound={true}
          style={flickingContainer}
          ref={flicking}
          zIndex={0}
        >
          {images.map((item: string, idx: number) => {
            return (
              <SliderImgWrapper key={idx}>
                <img alt="image" src={item} onClick={handleOpen} />
              </SliderImgWrapper>
            );
          })}
        </Flicking>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <img src={currImg} />
            </div>
          </Fade>
        </Modal>
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
