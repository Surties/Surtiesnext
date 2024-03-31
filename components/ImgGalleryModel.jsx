"use client";
import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

import ImgGallery from "./ImgGallery";

function ImgGalleryModel({ data, finalRef, isOpen, onOpen, onClose }) {
  return (
    <Center>
      <Modal
        size={"4xl"}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay backgroundColor={"RGBA(0, 0, 0, 0.9)"} />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ImgGallery imgs={data} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
}

export default ImgGalleryModel;
