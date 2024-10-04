import { Avatar, Box, Button, Container, FormLabel, Stack, StackDivider, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { Form } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import CompanionForm from "../Components/Companion/CompanionForm";
import { useQuery } from "@tanstack/react-query";
import { getCompanions } from "../QueryHelpers/companionQuery";
const CompanionPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data } = useQuery({ queryKey: ['companions'], queryFn: getCompanions })

  console.log('etnered')
  return (
    <>
      <Button margin='auto' onClick={onOpen}>Add Companion</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Companion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CompanionForm modalContexts={{onClose}} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Stack
        divider={<StackDivider/>}
        width='50%'
        margin='auto'
      >
        {data?.companions.map(companion=>{
          return(
            <Box
              direction='row'
              gap='10px'
              display={'flex'}
              alignItems={'center'}
            >
              <Avatar></Avatar>
              <Box>{companion?.name}</Box>
            </Box>
        )
        })}
      </Stack>
    </>

  );
};

export default CompanionPage;
