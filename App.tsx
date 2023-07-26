import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Eval from './pages/Eval';
import Edit from './pages/Edit';
import FormDetails from './pages/FormDetails';
import Authentication from './modules/authentification';
import Layout from './Layout/Layout';
import ProtectedRoute from './modules/PrivateRoute';
import CollabHome from './pages/Homecollab';
import FormDetailscollab from './pages/FormDetailscollab';
import Notif from './pages/Notif';
import CollabRoute from './modules/CollabRoute';
import Layoutcollab from './Layout/Layoutcollab';
import React from 'react';


function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/" element={<Authentication />} />


      <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/Eval" element={<Eval />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/forms/:id" element={<FormDetails />} />
          </Route>
        </Route>



      <Route element={<CollabRoute />}>
        <Route element={<Layoutcollab />}>
          <Route path="/Homecollab" element={<CollabHome />} />
          <Route path="/Notif" element={<Notif />} />
          <Route path="/formscollab/:id" element={<FormDetailscollab />} />
        </Route>
      </Route>

      
       

      </Routes>
    </BrowserRouter>
  );
}

export default App;
