import React, { ReactNode, useRef } from "react";
import { useTransition, animated as a } from "react-spring";
import {
  BackgroundWash,
  ModalContainer,
  ModalHeaderContainer,
  ModalHeaderText,
  ModalCloseButton,
  ModalHeaderTitleContainer,
  IconWrapper
} from "./style";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { ReactComponent as Close } from "../../static/svg/x.svg";
import { ReactComponent as ShoppingBag } from "../../static/svg/shopping-bag.svg";

interface ModalProps {
  title: string;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
}

const Modal = ({ title, isOpen, setOpen, children }: ModalProps) => {
  const node = useRef() as React.MutableRefObject<HTMLInputElement>;

  useOnClickOutside(node, () => {
    setOpen(false);
  });

  return (
    <ModalWrapper isOpen={isOpen}>
      <BackgroundWash>
        <ModalContainer ref={node}>
          <ModalHeader title={title} setClosed={setOpen}>
            <ShoppingBag />
          </ModalHeader>
          {children}
        </ModalContainer>
      </BackgroundWash>
    </ModalWrapper>
  );
};

export default Modal;

interface ModalWrapperProps {
  children?: ReactNode;
  isOpen: boolean;
}

const ModalWrapper = ({ children, isOpen }: ModalWrapperProps) => {
  const transition = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <div>
      {transition.map(
        ({ item, key, props }) =>
          item && <a.div style={props}>{children}</a.div>
      )}
    </div>
  );
};

interface ModalHeaderProps {
  title: string;
  setClosed: any;
  children: ReactNode;
}

const ModalHeader = ({ title, setClosed, children }: ModalHeaderProps) => {
  return (
    <ModalHeaderContainer>
      <ModalHeaderTitleContainer>
        <IconWrapper>{children}</IconWrapper>
        <ModalHeaderText>{title}</ModalHeaderText>
      </ModalHeaderTitleContainer>
      <ModalCloseButton onClick={() => setClosed(false)}>
        <Close />
      </ModalCloseButton>
    </ModalHeaderContainer>
  );
};
