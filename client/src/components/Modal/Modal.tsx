import React, { ReactChild } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import styled from "styled-components";

type ModalPropsType = {
  visible: boolean;
  onClose: () => void;
  children: ReactChild;
  topRightPosition?: boolean;
  withoutBackground?: boolean;
  boxShadow?: boolean;
  noClose?: boolean;
};

export const Modal = (props: ModalPropsType) => {
  return (
    <ModalWrapper
      topRightPosition={props.topRightPosition || false}
      visible={props.visible}
    >
      <DarkBackground
        withoutBackground={props.withoutBackground || false}
        onClick={props.onClose}
      ></DarkBackground>
      <ModalContent boxShadow={!!props.boxShadow}>
        {!props.noClose && <CloseIconStyled onClick={props.onClose} />}
        {props.children}
      </ModalContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div<{
  visible: boolean;
  topRightPosition: boolean;
}>`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: ${(props) => (props.visible ? "flex" : "none")};
  justify-content: ${(props) =>
    props.topRightPosition ? "flex-end" : "center"};
  align-items: ${(props) => (props.topRightPosition ? "flex-start" : "center")};
`;

const DarkBackground = styled.div<{ withoutBackground: boolean }>`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${(props) =>
    props.withoutBackground ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.6)"};

  :hover {
    cursor: pointer;
  }
`;

const ModalContent = styled.div<{ boxShadow: boolean }>`
  background: #fff;
  position: relative;
  border-radius: 6px;

  ${(props) =>
    props.boxShadow &&
    `box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 32px rgba(4, 11, 35, 0.08);`}
`;

const CloseIconStyled = styled(CloseIcon)`
  position: absolute;
  right: 24px;
  top: 24px;
  z-index: 1;

  :hover {
    cursor: pointer;
  }
`;
