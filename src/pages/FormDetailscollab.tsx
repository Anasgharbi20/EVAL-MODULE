import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { firestore, formsCollection } from "../config/controller";
import { getAuth } from "firebase/auth";
import "../styles/Edit.css";
import { Textarea, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, RadioGroup, Stack, Radio, Button, useToast, Spinner } from "@chakra-ui/react";

interface FormDetailsProps {}

const FormDetailscollab: React.FC<FormDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<any>(null);
  const [formResponses, setFormResponses] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const auth = getAuth();
  const toast = useToast();

  useEffect(() => {
    getFormData();
    getUserEmail();

    async function getFormData() {
      const docRef = doc(formsCollection, id);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setFormData({ id: docSnapshot.id, ...docSnapshot.data() });
      } else {
        console.log("Form not found!");
      }
    }

    checkSubmissionStatus();

    async function checkSubmissionStatus() {
      const user = auth.currentUser;
      if (!user) {
        console.log("User not authenticated!");
        return;
      }

      try {
        const querySnapshot = await getDocs(
          query(collection(firestore, "results"), where("userId", "==", user.uid), where("formId", "==", id))
        );

        if (querySnapshot.docs.length > 0) {
          setHasSubmitted(true);
        }
      } catch (error) {
        console.error("Error checking form submission:", error);
      }
    }

    async function getUserEmail() {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email);
      }
    }
  }, [id, auth]);

  const handleResponseChange = (questionTitle: string, value: any) => {
    setFormResponses((prevResponses: any) => ({
      ...prevResponses,
      [questionTitle]: value,
    }));
  };

  const handleSubmit = async () => {
    if (hasSubmitted) {
      console.log("You have already submitted this form.");
      return;
    }

    if (!userEmail) {
      console.log("User email not available.");
      return;
    }

    try {
      const responsesWithTitles = formData.questions.reduce((acc: any, question: any) => {
        const response = formResponses[question.title];
        return { ...acc, [question.title]: response };
      }, {});

      const resultData = {
        userId: auth.currentUser?.uid || "",
        userEmail: userEmail,
        formId: id,
        responses: responsesWithTitles,
      };

      await addDoc(collection(firestore, "results"), resultData);
      console.log("Result added successfully!");
      toast({
        title: "Form submitted.",
        description: "Your form has been submitted successfully!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      setHasSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!formData) {
    return <div style={{ margin: "200px" }}><Spinner /></div>;
  }

  return (
    <div style={{ margin: "50px" }} className="generator">
      {hasSubmitted ? (
        <p>You have already submitted this form.</p>
      ) : (
        <>
          <h1>{formData.title}</h1>
          <p>{formData.description}</p>

          {formData.questions.map((question: any) => (
            <div key={question.title}>
              <label>{question.title}: </label>
              {question.type === "text" && (
                <Textarea
                  placeholder="Write your answer"
                  onChange={(e) => handleResponseChange(question.title, e.target.value)}
                />
              )}
              {question.type === "number" && (
                <NumberInput min={0} max={10} onChange={(value) => handleResponseChange(question.title, value)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
              {question.type === "radio" && (
                <RadioGroup onChange={(value) => handleResponseChange(question.title, value)}>
                  <Stack spacing={5} direction="row">
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Stack>
                </RadioGroup>
              )}
            </div>
          ))}
          <Button onClick={handleSubmit}>Submit</Button>
        </>
      )}
    </div>
  );
};

export default FormDetailscollab;
