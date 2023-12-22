import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import InvoiceList from "./pages/Invoice/InvoiceList";
import ProductList from "./pages/Products/ProductList";
import InvoiceForm from "./components/Invoice/InvoiceForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <ToastContainer/>
      <Container>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/create" element={<InvoiceForm />} />
          <Route path="/create/:id" element={<InvoiceForm />} />
          <Route path="/edit/:id" element={<InvoiceForm />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
