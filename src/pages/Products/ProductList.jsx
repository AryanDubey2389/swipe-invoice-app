import React, { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { useProductListData } from "../../redux/hooks";
import ProductForm from "../../components/Product/ProductForm";
import HomeWrapper from "../CompWrapper";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/productsSlice";
import { updateInvoicesOnProductDelete } from "../../redux/invoicesSlice";
const ProductList = () => {
  const dispatch = useDispatch();
  const { productList } = useProductListData();
  console.log('productList -  ', productList)
  const isListEmpty = productList.length === 0;
  const [productForm, setProductForm] = useState({
    open: false,
    edit: false,
    id: "",
  });

  const handleOpenProductForm = (edit, id) => {
    setProductForm({ open: true, edit: edit, id: id });
  };

  const handleDeleteProduct = (id, price) => {
    // Dispatch the deleteProduct action
    dispatch(updateInvoicesOnProductDelete({productId: id, priceDiff: price}));
    dispatch(deleteProduct(id));
  };

  const closeProductForm = () => {
    setProductForm({ open: false, edit: false, id: "" });
  };

  return (
    <HomeWrapper>
      <ProductForm
        showModal={productForm.open}
        closeModal={closeProductForm}
        edit={productForm.edit}
        id={productForm.id}
      />
      <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
        {isListEmpty ? (
          <div className="d-flex flex-column align-items-center">
            <h3 className="fw-bold pb-2 pb-md-4">No products present</h3>
            <Button
              variant="primary mb-2 mb-md-4"
              onClick={() => handleOpenProductForm(false, "")}
            >
              Create Product
            </Button>
          </div>
        ) : (
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <h3 className="fw-bold pb-2 pb-md-4">Product List</h3>
              <Button
                variant="primary mb-2 mb-md-4"
                onClick={() => handleOpenProductForm(false, "")}
              >
                Create Product
              </Button>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th>Product Id.</th>
                  <th>Product Name</th>
                  <th>Price Per Unit</th>
                  <th>Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    openProductForm={handleOpenProductForm}
                    deleteProduct={handleDeleteProduct}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>
    </HomeWrapper>
  );
};

const ProductRow = ({ product, openProductForm, deleteProduct }) => {
  return (
    <tr>
      <td className="fw-normal">{product.id}</td>
      <td className="fw-normal">{product.name}</td>
      <td className="fw-normal">
        {product.currency}
        {product.price}
      </td>
      <td className="fw-normal">{product.category}</td>
      <td style={{ width: "5%" }}>
        <Button
          variant="outline-primary"
          onClick={() => openProductForm(true, product.id)}
        >
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiSolidPencil />
          </div>
        </Button>
      </td>
      <td style={{ width: "5%" }}>
        <Button
          variant="outline-danger"
          onClick={() => deleteProduct(product.id, product.price)}
        >
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiTrash />
          </div>
        </Button>
      </td>
    </tr>
  );
};

export default ProductList;
