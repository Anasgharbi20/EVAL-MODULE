import React, { useEffect, useState } from 'react';
import { resultsCollection } from "../config/controller";
import { getDocs } from 'firebase/firestore';
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';

interface Result {
  formId: string;
  userId: string;
  userEmail: string;
  responses: { [key: string]: any }; // Replace 'any' with the actual type of your responses
}

const Eval: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedResponses, setSelectedResponses] = useState<{ [key: string]: string } | null>(null); // Replace 'any' with the actual type of your responses
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchResultsData = async () => {
      try {
        const querySnapshot = await getDocs(resultsCollection);
        const resultsData: Result[] = querySnapshot.docs.map((doc) => doc.data() as Result);
        setResults(resultsData);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResultsData();
  }, []);

  const handleButtonClick = (responses: { [key: string]: string }) => {
    setSelectedResponses(responses);
    onOpen();
  };

  return (
    <TableContainer m={215}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Form ID</Th>
            <Th>User ID</Th>
            <Th>User Email</Th>
            <Th>Direct</Th>
          </Tr>
        </Thead>
        <Tbody>
          {results.map((result) => (
            <Tr key={result.formId}>
              <Td>{result.formId}</Td>
              <Td>{result.userId}</Td>
              <Td>{result.userEmail}</Td>

              <Td>
                <Button
                  size={'xs'}
                  onClick={() => handleButtonClick(result.responses)}
                >
                  <img src="../images/link-alt.png" alt="Link" />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Responses</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Render the responses data here */}
            {selectedResponses && (
              <ul>
                {Object.keys(selectedResponses).map((key) => (
                  <li key={key}>
                    <strong>{key}:</strong> {selectedResponses[key]}
                  </li>
                ))}
              </ul>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </TableContainer>
  );
};

export default Eval;
