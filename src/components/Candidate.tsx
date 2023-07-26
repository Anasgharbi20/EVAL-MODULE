import {
    Heading,
    Box,
    Center,
    Text,
    Stack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
import React, { useEffect, useState } from "react";
import { onSnapshot, query } from "firebase/firestore";
import {  formsCollection } from "../config/controller";
import { Link } from "react-router-dom";



const Candidate: React.FC = () => {
    const [formData, setFormData] = useState<any[]>([]);

  
    useEffect(() => {
      getAllForms();
  
      async function getAllForms() {
        await onSnapshot(query(formsCollection), (snapshot) => {
          const data: any[] = [];
          snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          setFormData(data);
        });
      }
    }, []);
    return (
        <>
        {formData.map((data) => (
      <Center py={6}>
        <Box
          maxW={'300px'}
          maxH={'m'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
          style={{margin: "0px 0px 0px 25px"}}
          >
          <Link to={`/forms/${data.id}`}>
          <Heading fontSize={'2xl'}>
          {data.title}          </Heading>
          </Link>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
          {data.description}
       
       </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            Please take a moment to complete the form.
            Your input is vital in helping us improve our processes and enhance your experience at work.
            Thank you!            
          </Text>
  
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          </Stack>
  
          <Stack mt={8} direction={'row'} spacing={4} style={{margin: "10px 0px 0px 25px"}}> 

          <Link to={`/forms/${data.id}`}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              _focus={{
                bg: 'gray.200',                
              }}
              rightIcon={<img src="../images/Outline.png"/>}
              >
              Fill
            </Button></Link>

            <Link to={`/edit/${data.id}`}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              _focus={{
                bg: 'gray.200',
              }}
              rightIcon={<img src="../images/edit alt 9.png"/>}>
              Edit
            </Button></Link>
          </Stack>
        </Box>
      </Center>
        
        ))}
        </>
      );
    };
     export default Candidate;