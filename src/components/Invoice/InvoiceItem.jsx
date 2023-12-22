import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
import EditableInputField from "../EditableInputField";
import { useProductListData } from "../../redux/hooks";
import productCategories from "../../utils/categories.json";
import currencyConverter from "../../utils/currencyConverter";

const InvoiceItem = (props) => {
  const { onItemizedItemEdit, currency, onRowDel, items, onRowAdd } = props;
  const itemTable = items.map((item,id) => (
    <ItemRow
      key={String(item.id)+String(id)}
      item={item}
      onDelEvent={onRowDel}
      onItemizedItemEdit={onItemizedItemEdit}
      currency={currency}
      openProductEdit={props.openProductForm}
    />
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price/Rate</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = (props) => {
  const { productList } = useProductListData();
  const onDelEvent = () => {
    props.onDelEvent(props.item);
  };
  const [price, setPrice] = useState();
  const [selectedItemId, setSelectedItemId] = useState(props.item.itemId);
  const { getOneProduct } = useProductListData();
  const product = props.item?.itemId ? getOneProduct(props.item.itemId) : null;

  useEffect(() => {
    setPrice(
      currencyConverter(product?.price, product?.currency, props?.currency),
    );
  }, [props.item.itemId, product, props.currency]);
  return (
    <tr>
      <td style={{ width: "100%" }}>
        <EditableInputField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "select",
            name: "itemId",
            placeholder: "Select an Item",
            value: props.item.itemId,
            id: props.item.itemId,
          }}
          options={[
            { value: "", label: "Select an Item" }, // Default empty option
            ...productList.map((product,id) => ({
              value: product.id,
              label: product.name,
              key:String(id)+String(product.id)
            })),
          ]}
        />
        <EditableInputField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "text",
            name: "itemDescription",
            placeholder: "Item description",
            value: props.item.itemDescription,
            id: props.item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableInputField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "number",
            name: "itemQuantity",
            min: 1,
            step: "1",
            value: props.item.itemQuantity,
            id: props.item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableInputField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            leading: props.currency,
            type: "number",
            name: "itemPrice",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: price,
            id: props.item.itemId,
          }}
          readOnly
        />
        <EditableInputField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "text",
            name: "itemUnit",
            min: 1,
            step: "1",
            value: "/" + (productCategories[props.item.itemCategory] || "unit"),
            id: props.item.itemId,
          }}
          readOnly={true}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiSolidPencil
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-black mt-1 btn btn-outline"
          onClick={() => props.openProductEdit(props.item.itemId, true)}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDelEvent}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
