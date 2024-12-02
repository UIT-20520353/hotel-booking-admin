import { Modal } from "antd";
import { useCallback } from "react";

const useModal = () => {
  const showErrorModal = useCallback(() => {
    Modal.error({
      title: "Error",
      content: "An error occurred while processing your request.",
      centered: true,
    });
  }, []);

  return {
    showErrorModal,
  };
};

export default useModal;
