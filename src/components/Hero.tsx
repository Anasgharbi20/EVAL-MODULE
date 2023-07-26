import { Container, Stack, Heading, Button, Box } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import { Link } from "react-router-dom";


function Hero() {
  
    return (
      <>

<Container maxW={'3xl'} >
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
            >
<Text
  bgGradient='linear(to-l, #020024,#090979 ,#00d4ff )'
  bgClip='text'
  fontSize='6xl'
  fontWeight='bold'
>
Customized Evaluation <br />For Growth and Success          
</Text>               
          </Heading>
          <Text color={'gray.500'} m={'-5'}>
          Proxym-IT Eval Module is an innovative platform that streamlines performance
          evaluations for interns and employees within companies.the module empowers organizations to create custom evaluation forms
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
                     <Link to={`/Dashboard`}>
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}>
              Get Started
            </Button></Link>
            <Link to={`/Eval`}>
            <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button></Link>
          </Stack>
        </Stack>
      </Container>
       </>
       )
     }
     
     export default Hero;