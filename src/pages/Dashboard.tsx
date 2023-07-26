import { useState } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { formsCollection } from "../config/controller";
import "../styles/Edit.css";
import {    useColorModeValue,
  Box, Button, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Stack, Textarea, useToast } from "@chakra-ui/react";
import React from "react";

const Dashboard = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [currentField, setCurrentField] = useState<Field>({ title: '', type: 'text' });
  const toast = useToast()


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentField({ ...currentField, title: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentField({ ...currentField, type: e.target.value as FieldType });
  };

  const handleAddField = () => {
    // Only add the field if it has a title
    if (currentField.title.trim() !== '') {
      setFields([...fields, currentField]);
      setCurrentField({ title: '', type: 'text' });
    }
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = {
        title,
        description,
        timestamp: serverTimestamp(),
        questions: fields.map(field => ({
          title: field.title,
          type: field.type
        }))
      };

      await addDoc(formsCollection, formData);

      setTitle("");
      setDescription("");
      setFields([]);

      console.log("Form data submitted successfully!");
      toast({
        title: "Form created.",
        description: "Your form has been created successfully!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error creating form data:", error);
      toast({
        title: "Error creating form.",
        description: "There was an error creating the form. Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  type FieldType = 'text' | 'number' | 'radio';

  interface Field {
    title: string;
    type: FieldType;
  }

  return (
    <div>
      <Box  h={'full'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
        >
      <form className="generator" onSubmit={handleSubmit}>
        <div>
          <h1 style={{ fontWeight: "600" }}>Form Builder</h1>
          <label htmlFor="title" className="form-label">Title:</label>
          <Input className="form-control"
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              return setTitle(e.target.value);
            }} borderRadius="10px"
            required />
        </div>
        <div>
          <label htmlFor="description" className="form-label">Description:</label>
          <Textarea className="form-control"
            id="description"
            borderRadius="10px"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required />
        </div>

        <div style={{ margin: "5px 0px 50px " }}>
          <div>
            <label>Question: </label>
            <Input type="text" value={currentField.title} onChange={handleTitleChange} className="form-control" borderRadius="10px"/>
          </div>
          <div style={{ margin: "0px 0px 5px 0px" }}>
            <label>Answer Type: </label>
            <Select placeholder='Select option' value={currentField.type} onChange={handleTypeChange} borderRadius="10px" icon={<img src="../images/sort.png" />}>
              <option value='text'>Text</option>
              <option value='number'>Score</option>
              <option value='radio'>Yes/No</option>
            </Select>
          </div>

          <Button onClick={handleAddField} colorScheme="teal" style={{ margin: "15px" }}>Add Field</Button>

          <form>
            <h2 style={{ fontWeight: "700" }}>Form Preview</h2>
            {fields.map((field, index) => (
              <div key={index}>
                <label>{field.title}: </label>
                {field.type === 'text' && <Textarea placeholder='Write your answer' />}
                {field.type === 'number' && <NumberInput min={0} max={10}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>}
                {field.type === 'radio' && <RadioGroup>
                  <Stack spacing={5} direction='row'>
                    <Radio value='Yes'>Yes</Radio>
                    <Radio value='No'>No</Radio>
                  </Stack>
                </RadioGroup>}
              </div>
            ))}
          </form>
        </div>
        <Button colorScheme="teal" type="submit" style={{ margin: "5px 0px 25px " }}>Submit</Button>   
           </form></Box>
    </div>
  );
}

export default Dashboard;


