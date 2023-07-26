import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { formsCollection } from "../config/controller";
import {
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Stack,
  Radio,
  Button,
  Spinner,
  useToast
} from "@chakra-ui/react";

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    getFormData();

    async function getFormData() {
      const docRef = doc(formsCollection, id);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setFormData({ id: docSnapshot.id, ...docSnapshot.data() });
      } else {
        console.log("Form not found!");
      }
    }
  }, [id]);

  const toast = useToast();

  const handleRemove = async () => {
    try {
      await deleteDoc(doc(formsCollection, id));
      toast({
        title: 'Form deleted.',
        description: 'The form has been successfully deleted.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };
  if (!formData) {
    return <div style={{ margin: "200px" }}><Spinner /></div>;
  }

  return (
    <div style={{ margin: "50px" }} className="generator">
      <h1>{formData.title}</h1>
      <p>{formData.description}</p>
      {/* Display questions and answering fields */}
      {formData.questions.map((question: any, index: number) => (
        <div key={index}>
          <label>{question.title}: </label>
          {question.type === "text" && <Textarea placeholder="Write your answer" />}
          {question.type === "number" && (
            <NumberInput defaultValue={5} min={0} max={10}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
          {question.type === "radio" && (
            <RadioGroup defaultValue="1">
              <Stack spacing={5} direction="row">
                <Radio value="1">Yes</Radio>
                <Radio value="2">No</Radio>
              </Stack>
            </RadioGroup>
          )}
        </div>
      ))}
    
              <Button colorScheme="red" onClick={handleRemove} ml={3} >
                Delete
              </Button>
    </div>
  );
};

export default Edit;

