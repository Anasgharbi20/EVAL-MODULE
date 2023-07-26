import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../config/firebase";
import { getDocs, doc } from 'firebase/firestore';
import { collection, query, where } from 'firebase/firestore';
import { usersCollection } from "../config/controller";

const ProtectedRoute: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean | undefined>(undefined);
  const [userRole, setUserRole] = useState<string | undefined>(undefined);

  useEffect(() => {
   
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setAuthenticated(true);
        try {
          const q = query(usersCollection, where('email', '==', user.email));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            const role = userData.role;
            setUserRole(role);
          } else {
           
            console.log('User does not exist in the "users" collection.');
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      } else {
        setAuthenticated(false);
      }
    });

   
    return () => unsubscribe();
  }, []);

  if (authenticated === undefined || userRole === undefined) {
   
    return null;
  }

  if (authenticated && userRole === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default ProtectedRoute;
