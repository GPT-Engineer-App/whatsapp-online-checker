import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, useToast } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOnline, setIsOnline] = useState(null);
  const toast = useToast();

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const checkOnlineStatus = () => {
    if (phoneNumber.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a phone number.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    const newWindow = window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      const isOnline = newWindow.document.querySelector(".online") !== null;
      setIsOnline(isOnline);
      newWindow.close();
    }, 3000);
  };

  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          WhatsApp Online Status Checker
        </Heading>
        <Input placeholder="Enter WhatsApp number" value={phoneNumber} onChange={handleInputChange} />
        <Button colorScheme="whatsapp" leftIcon={<FaWhatsapp />} onClick={checkOnlineStatus}>
          Check Online Status
        </Button>
        {isOnline !== null && (
          <Text fontSize="xl" textAlign="center">
            {isOnline ? "The person is currently online." : "The person is currently offline."}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
