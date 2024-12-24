import { Button } from "@/components/common";
import { TAttraction } from "@/types/attraction";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

interface ConfirmDeleteModalProps {
  attraction: TAttraction | undefined;
  onConfirm: (id: number) => void;
  onClose: () => void;
}

export const ConfirmDeleteModal: React.FunctionComponent<
  ConfirmDeleteModalProps
> = ({ attraction, onConfirm, onClose }) => (
  <Modal isOpen={!!attraction} backdrop="opaque" hideCloseButton>
    <ModalContent>
      <ModalHeader>
        <p>
          Are you sure you want to delete
          <span className="text-primary">{` ${attraction?.name}`}</span>?
        </p>
      </ModalHeader>

      <ModalBody>
        <p>
          Please note that this action cannot be undone. Once you delete this
          attraction, it will be permanently removed from the system.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button
          onPress={() => onConfirm(attraction?.id || -1)}
          color="danger"
          className="bg-carmine-red"
        >
          Confirm
        </Button>
        <Button variant="bordered" onPress={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
