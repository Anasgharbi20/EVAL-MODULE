import ReactDOM from 'react-dom/client'
import App from './App.js'
import './styles/index.css'
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./config/chakra.config.js";
import React from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme}>
  <App />
</ChakraProvider>,
)
