import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { addProduct, updateProduct } from "../../redux/productsSlice";
import { updateInvoicesByProduct } from "../../redux/invoicesSlice";
import productCategories from "../../utils/categories.json";
import { useProductListData } from "../../redux/hooks";
import currencies from "../../utils/currencies.json";
import currencyConverter from "../../utils/currencyConverter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function getNextProductId(existingIds) {
  const maxId = Math.max(...existingIds, 0);
  return maxId + 1;
}
const notify = (msg) => toast.success(`${msg}`, { position: toast.POSITION.TOP_CENTER });;

const ProductForm = (props) => {
  const dispatch = useDispatch();
  const { productList } = useProductListData();
  const isEdit = props.edit;
  const { getOneProduct } = useProductListData();
  const [validationErrors, setValidationErrors] = useState({});

  const existingIds = productList.map((product) => product.id);
  const [formData, setFormData] = useState(
    isEdit
      ? getOneProduct(props.id)
      : {
          id: getNextProductId(existingIds),
          name: "",
          price: "0.00",
          category: "",
          currency: "$",
        },
  );

  useEffect(() => {
    if (isEdit && props.id) {
      setFormData(getOneProduct(props.id));
    } else {
      setFormData({
        id: getNextProductId(existingIds),
        name: "",
        price: "",
        category: "",
        currency: "$",
      });
    }
  }, [props, props.id]);

  const onCurrencyChange = (selectedOption) => {
    setFormData({ ...formData, currency: selectedOption.currency });
  };

  const validateFormData = () => {
    const validationErrors = {};
    if (!formData.name || !formData.name.length) {
      validationErrors["name"] = "Name is required";
    }
    if (!formData.category || !formData.category.length) {
      validationErrors["category"] = "Please select a category";
    }
    if (!formData.price || formData.price <= 0) {
      validationErrors["price"] = "Price should be greater than 0";
    }
    setValidationErrors(validationErrors);
    return validationErrors;
  };

  const editField = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: null });
  };

  const handleAddProduct = () => {
    const validationErrors = validateFormData();
    if (Object.keys(validationErrors).length) {
      return;
    }

    if (isEdit) {
      const initialProd = getOneProduct(props.id);
      const priceDiff =
        currencyConverter(
          parseFloat(formData.price),
          formData.currency,
          formData.currency
        ) -
        currencyConverter(
          parseFloat(initialProd.price),
          initialProd.currency,
          formData.currency
        );
      dispatch(updateProduct({ id: props.id, updatedProduct: formData }));
      dispatch(
        updateInvoicesByProduct({
          productId: props.id,
          diff: priceDiff,
          prodCurr:formData.currency,
        })
      );
      notify("Product updated successfully 🥳");
    } else {
      dispatch(addProduct(formData));
      notify("Product added successfully 🥳");
    }

    props.closeModal();
  };
  return(
    <>
    <ToastContainer />
    <Modal 
      show={props.showModal} 
      onHide={props.closeModal}>
      <Form 
        onSubmit={props.closeModal}>
        <Row>
          <Col md={12} lg={12}>
            <Card className="p-4">
              <div className="d-flex flex-row align-items-start justify-content-between mb-4">
                <div className="d-flex flex-column">
                  <div className="align-items-center">
                    <span className="fw-bold d-block me-2">{isEdit ? "Updated" : "Product"} Name: </span>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Name of Product"
                      value={formData.name}
                      style={{maxWidth : '560px'}}
                      className={`${validationErrors.name ? "mt-2 is-invalid" : "mt-2"}`}
                      onChange={(e) => editField(e.target.name, e.target.value)}
                      required
                    />
                  </div>
                  <div className={`text-danger ${validationErrors.name ? "visible" : "invisible"}`}>
                    {validationErrors.name || ""}
                  </div>
                </div>
                <div className="align-items-center">
                  <span className="fw-bold me-2">Product ID: </span>
                  <Form.Control
                    type="number"
                    name="id"
                    value={formData.id}
                    className="mt-2"
                    style={{ maxWidth: "760px" }}
                    min="1"
                    onChange={(e) => editField(e.target.name, e.target.value)}
                    readOnly
                    required
                  />
                </div>
              </div>
              <hr className="my-3 mx-1" />
              <Row className="mb-1">
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">{isEdit ? "Updated " : ""}Currency:</Form.Label>
                    <Form.Select
                      className="btn btn-light my-1"
                      aria-label="Change Currency"
                      onChange={(event) =>onCurrencyChange({ currency: event.target.value })}
                      value={formData.currency}
                    >
                      {Object.keys(currencies).map((currency, i) => (
                        <option 
                          key={i} 
                          value={currency}>
                          {currencies[currency]}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Label className="fw-bold">{isEdit ? "Updated " : ""}Category:</Form.Label>
                  <Form.Select
                    className={"my-2 " + (validationErrors.category ? "is-invalid" : "")}
                    value={formData.category}
                    placeholder="Select Category"
                    name="category"
                    onChange={(e) => editField(e.target.name, e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a Category
                    </option>
                    {Object.keys(productCategories).map((category, index) => (
                      <option 
                        key={index} 
                        value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="text-danger">
                    {validationErrors.category || ""}
                  </div>
                </Col>
                <Col>
                <Form.Label className="fw-bold">{isEdit ? "Updated " : ""}
                    Price Per {productCategories[formData.category] || "unit"}:
                  </Form.Label>
                  <Form.Control
                    placeholder="Price"
                    rows={3}
                    value={formData.price}
                    type="text"
                    name="price"
                    autoComplete="name"
                    onChange={(e) => editField(e.target.name, e.target.value)}
                    className={"my-2 " + (validationErrors.price ? "is-invalid" : "")}
                    required
                  />
                  <div className="text-danger">
                    {validationErrors.price || ""}
                  </div>

      
                </Col>
                <Button
                  variant="primary"
                  onClick={handleAddProduct}
                  className="d-block w-100 mt-5"
                >
                  {isEdit ? "Update Product" : "Add Product"}
                </Button>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </Modal>
    </>
  );
};

export default ProductForm;