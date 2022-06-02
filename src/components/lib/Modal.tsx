import React from "react";
import ReactModal from "react-modal";
import { CloseButton } from "./Buttons";
import { Stack } from "./Layout";

/**
 *  By using this component you have to call `ReactModal.setAppElement` on your app element on your self
 * @param props
 * @returns JSX.Element
 */
export function Modal({
  modalTitle,
  isOpen,
  onClose,
  modalFooter,
  contentLabel,
  overlayClassName = "",
  className = "",
  children,
}: ModalProps): JSX.Element {
  return (
    <ReactModal
      className={`text-sm md:text-base mx-1 md:m-auto bg-white h-max py-4 px-5 rounded-md shadow-2xl overflow-auto ${className}`}
      overlayClassName={`fixed inset-0 flex items-center justify-center ${overlayClassName}`}
      contentLabel={contentLabel}
      isOpen={isOpen}
      onRequestClose={onClose}
      role={"dialog"}
      aria={{
        modal: "true",
      }}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <Stack className="justify-between items-center pb-3">
        <h3 className="text-xl font-semibold text-indigo">{modalTitle}</h3>
        <CloseButton onClick={onClose} />
      </Stack>
      <div>{children}</div>
      {modalFooter && modalFooter}
    </ReactModal>
  );
}

interface ModalProps
  extends Omit<Omit<ReactModal.Props, "isOpen">, "onRequestClose"> {
  modalTitle: string;
  isOpen: boolean;
  onClose: () => void;
  modalFooter?: JSX.Element;
  contentLabel: string;
}

export default function useModal(appRoot: string) {
  ReactModal.setAppElement(appRoot);

  return Modal;
}

export type ModalComponent = (props: ModalProps) => JSX.Element;
