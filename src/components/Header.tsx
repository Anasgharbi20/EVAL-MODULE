import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { auth } from '../config/firebase';
import React from 'react';


const Links = ['Home', 'Dashboard','Eval'];
const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    fontWeight={'500'}
    color={'white'}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    as={RouterLink}
    to={`/${children === 'Home' ? 'Home' : children}`}
  >
    {children}
  </Link>
);
const handleLogout =() => {
  auth.signOut();
  }
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
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
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box as={RouterLink} to="/Home">
            <Image src='../images/logo.png' alt='Dan Abramov' />
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'gray'}
              size={'sm'}
              mr={4}
              as={RouterLink}  // Use RouterLink from react-router-dom
              to="/Dashboard"  // Set the correct path
            >
              + Add Form
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'}src={'https://images.default' }/>
              </MenuButton>
              <MenuList>
            <Button rightIcon={<img src="../images/sign-out-alt.png" />} onClick={handleLogout} colorScheme='red' variant='outline' size='sm'>Logout</Button>

              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
