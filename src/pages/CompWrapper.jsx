import { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const CompWrapper = (props) => {
  const location = useLocation();
  const isProduct = location.pathname.includes("/products")
  const [key,setKey]=useState(isProduct?"/products":"/")
  const navigate = useNavigate()
  useEffect(()=>{
    navigate(key)
  },[key])
  return (
    <Row>
      <Col className="mx-auto" xs={12} md={8} lg={9}>
        <h3 className="fw-bold pb-2 pb-md-4 text-center">Envoice App</h3>
        <div className="d-flex justify-content-center">
          <Tabs
      activeKey={key}
            onSelect={(k)=>setKey(k)}
      id="uncontrolled-tab-example"
      className="mb-3"
    >
            <Tab eventKey="/" title="Invoice"/>
            <Tab eventKey="/products" title="Product"/>
    </Tabs>
        </div>
        {props.children}
      </Col>
    </Row>
  );
};
export default CompWrapper;
