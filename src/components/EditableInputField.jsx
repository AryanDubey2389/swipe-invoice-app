import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const EditableInputField = (props) => {
  return (
    <InputGroup className="my-1 flex-nowrap">
      {props.cellData.leading != null && (
        <InputGroup.Text className="bg-light fw-bold border-0 text-secondary px-2">
          <span className="w-20 h-20 border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small">
            {props.cellData.leading}
          </span>
        </InputGroup.Text>
      )}
      {props.cellData.type === "select" ? (
        <Form.Select
          name={props.cellData.name}
          id={props.cellData.id}
          className={props.cellData.textAlign}
          aria-label={props.cellData.name}
          value={props.cellData.value || ""}
          onChange={props.onItemizedItemEdit}
          required
        >
          {props.options?.map((option, i) => (
            <option key={String(option.value) + i} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control
          className={props.cellData.textAlign}
          type={props.cellData.type}
          id={props.cellData.id}
          name={props.cellData.name}
          min={props.cellData.min}
          value={props.cellData.value || ""}
          placeholder={props.cellData.placeholder}
          precision={props.cellData.precision}
          step={props.cellData.step}
          aria-label={props.cellData.name}
          onChange={props.onItemizedItemEdit}
          required
          readOnly={props.readOnly || false}
        />

      )}
    </InputGroup>
  );
};

export default EditableInputField;
