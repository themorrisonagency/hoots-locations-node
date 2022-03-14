import React from "react"
import {
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'



function ConfirmationModal(title, message, isOpen, onClose, onOpen) {
    // const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>

      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {message}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
    )
}

export default ConfirmationModal