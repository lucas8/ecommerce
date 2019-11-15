import React, { ReactNode, useRef, Fragment, FunctionComponent } from "react";
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

interface ModalProps {
  title: string;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
  icon: FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const Modal = ({
  title,
  isOpen,
  setOpen,
  children,
  icon: Icon
}: ModalProps) => {
  const node = useRef() as React.MutableRefObject<HTMLInputElement>;

  useOnClickOutside(node, () => {
    setOpen(false);
  });

  return (
    <ModalWrapper isOpen={isOpen}>
      <BackgroundWash>
        <ModalContainer ref={node}>
          <ModalHeader title={title} setClosed={setOpen}>
            <Icon />
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
    <Fragment>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <a.div key={key} style={props}>
              {children}
            </a.div>
          )
      )}
    </Fragment>
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
