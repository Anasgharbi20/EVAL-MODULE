import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { usersCollection } from "../config/controller";
import { getDocs } from 'firebase/firestore';


const Members: React.FC = () => {
  const [options, setOptions] = useState<any[]>([]); // Use "any[]" or define an interface for your options array type

  useEffect(() => {
    // Function to fetch data from Firebase and format it as options for the Select component
    const fetchUsersData = async () => {
      try {
        const querySnapshot = await getDocs(usersCollection);
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        const formattedOptions = usersData.map((user) => ({
          value: user.email, // Assuming email is the attribute in your "users" collection
          label: user.name, // Assuming name is the attribute in your "users" collection
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersData();
  }, []);

  return (
    <div>
      <Select options={options}></Select>
    </div>
  );
};

export default Members;
