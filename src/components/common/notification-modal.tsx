import {
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { Button } from "./button";

export type TModalData = {
  title?: string;
  onClose: () => void;
  message: string;
  type: "success" | "error";
};

interface NotificationModalProps {
  data?: TModalData | undefined;
}

export const NotificationModal: React.FunctionComponent<
  NotificationModalProps
> = ({ data }) => (
  <Modal isOpen={!!data} backdrop="opaque" hideCloseButton>
    <ModalContent>
      <ModalHeader>
        <div className="flex items-center justify-center w-full">
          {data?.title || "Notification"}
        </div>
      </ModalHeader>

      <ModalBody>
        <p className="w-full text-center">{data?.message}</p>
      </ModalBody>
      <ModalFooter>
        <div className="flex items-center justify-center w-full">
          <Button
            color={data?.type === "success" ? "success" : "danger"}
            className={cn(
              "text-white",
              data?.type === "error" ? "bg-carmine-red" : ""
            )}
            onPress={data?.onClose}
          >
            OK
          </Button>
        </div>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
