import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react';

const SpinnerDisplay = () => {
  return (
    <>
      <Flex w="100%" h="200px"/>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </>
  )
}

export default SpinnerDisplay
