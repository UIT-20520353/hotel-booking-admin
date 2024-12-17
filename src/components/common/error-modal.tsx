import { TError } from "@/types/modal";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { Button } from "./button";

type ErrorModalProps = {
  onClose: () => void;
  error: TError | undefined;
};

const ErrorModal: React.FunctionComponent<ErrorModalProps> = ({
  onClose,
  error,
}) => {
  return (
    <Modal
      classNames={{ header: "pb-0", footer: "pt-2" }}
      hideCloseButton
      isOpen={!!error}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center justify-center">
            <span className="text-2xl">{error?.title || "Error"}</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="text-base text-center">{error?.message || ""}</p>
        </ModalBody>
        <ModalFooter>
          <div className="flex items-center justify-center w-full gap-3">
            <Button
              className="w-1/2 text-base font-medium text-white bg-carmine-red"
              onPress={onClose}
            >
              OK
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { ErrorModal };
