import React, { ReactNode } from 'react';
import {
  Box,
  chakra,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

interface SocialButtonProps {
  children: ReactNode;
  label: string;
  href: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer: React.FC = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      w="100%"
      
marginEnd={0}
    >
      <Box mx="auto" maxW="7xl" py={4}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>Copyright © 2023 | Proxym Group</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Linkedin'} href={'https://www.linkedin.com/company/proxym'}>
              <FaLinkedin />
            </SocialButton>
            <SocialButton label={'Facebook'} href={'https://www.facebook.com/proxym.digital.services.provider'}>
              <FaFacebook />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'https://www.instagram.com/life.proxym/'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Flex>
      </Box>
    </Box>

  );
};

export default Footer;
