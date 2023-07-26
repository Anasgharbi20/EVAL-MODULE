import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { Container, Stack, Heading, FormControl, FormLabel, Input, HStack, Checkbox, Button, Divider, Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';
import Footer from '../components/Footer';
import '../styles/auth.css';
import React from 'react';
import { getDocs, doc } from 'firebase/firestore';
import { collection, query, where } from 'firebase/firestore';
import { usersCollection } from "../config/controller";

const Authentication = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        const q = query(usersCollection, where('email', '==', user.email));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          const role = userData.role;

          if (role === 'admin') {
            navigate('/Home');
          } else if (role === 'collab') {
            navigate('/HomeCollab');
          } else {
            console.log('Unknown role:', role);
          }
        } else {
          console.log('User does not exist in the "users" collection.');
        }
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };
    return(
        <>
<Box
        bg={useColorModeValue('blue.600', 'gray.50')}
        px={4}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={9999}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'center'}>
          <HStack spacing={8} alignItems={'center'}>
            <Link to="/">
            <Box >
            <Image src='../images/logo.png' alt='Dan Abramov' />
            </Box></Link>

            </HStack>
          </Flex>
      </Box>

      <Flex alignItems={'center'} justifyContent={'center'}>

<Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} style={{margin: "55px"}} className='auth'>
    <Stack spacing="8">
      <Stack spacing="6">
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={{ base: 'xs', md: 'lg' }}>Log in to your Account</Heading>
        </Stack>
      </Stack>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        bg={{ base: 'transparent', sm: 'bg.surface' }}
        boxShadow={{ base: 'none', sm: 'md' }}
        borderRadius={{ base: 'none', sm: 'xl' }}
      >
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)} />
            </FormControl>
            <Input id="password"name="password"type="password"required placeholder="Password"onChange={(e)=>setPassword(e.target.value)} />
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Remember me</Checkbox>
          </HStack>
          <Stack spacing="6">
            <Button onClick={onLogin}>Sign in</Button>
            <HStack>
              <Divider />
              <Divider />
            </HStack>
          </Stack>
        </Stack>
        </Box>
    </Stack>
  </Container>
  </Flex>

  <Footer />
        </>
    )
}
 
export default Authentication;
