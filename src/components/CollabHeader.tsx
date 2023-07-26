import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { auth } from '../config/firebase';



const handleLogout =() => {
  auth.signOut();
  }
const CollabHeader = () => {
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
            <Box as={RouterLink} to="/Homecollab">
            <Image src='../images/logo.png' alt='Dan Abramov' />
            </Box>
          </HStack>
          <Flex alignItems={'center'}>
          <Button
              variant={'solid'}
              colorScheme={'gray'}
              size={'sm'}
              mr={4}
              as={RouterLink}  // Use RouterLink from react-router-dom
              to="/Notif"  // Set the correct path
            >
              Notifications
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
      </Box>
    </>
  );
};

export default CollabHeader;
