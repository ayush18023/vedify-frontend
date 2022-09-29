import { Box, Flex, Heading, Image, Text , Center} from '@chakra-ui/react'
import React from 'react'

const StatisticsHome = () => {
  return (
    <>
        <div className='pl-36 text-5xl text-green-800 bg-[#f7f2ee] pb-16'>We Ensure:</div>
        <Box
        //  border="2px solid red"
        height="18rem"
        paddingX="6rem"
        color="#1d693a"
        textAlign="left"
        bg="#f7f2ee"
        >
            <Flex height="18rem" >
                <Box w="33%" >
                    <Center>
                        <Image src="https://assets.pharmeasy.in/web-assets/dist/4d2f7c48.svg"/>
                    </Center>
                    <Center>
                        <Heading letterSpacing=".8px" py={"25px"} fontSize="25px" fontWeight="700">Customer Satisfaction</Heading>
                    </Center>
                </Box>
                <Box w="33%">
                    <Center >
                    <Image src="https://assets.pharmeasy.in/web-assets/dist/92c372bb.svg"/>
                    </Center>
                    <Center>
                        <Heading letterSpacing=".8px" py={"25px"} fontSize="25px" fontWeight="700">Quick Dilevery</Heading>
                    </Center>
                </Box>
                <Box w="33%">
                    <Center >
                        <Image src="https://assets.pharmeasy.in/web-assets/dist/773ae9c5.svg"/>
                    </Center>
                    <Center>
                        <Heading letterSpacing=".8px" py={"25px"} fontSize="25px" fontWeight="700">Certified Medicines</Heading>
                    </Center>
                </Box>
            </Flex>
        </Box>
    </>
  )
}

export default StatisticsHome