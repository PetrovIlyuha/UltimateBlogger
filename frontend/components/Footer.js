import Link from "next/link";
import { APP_NAME } from "../config";
import { Container, Row, Col } from "reactstrap";

export const Footer = () => {
  return (
    <Container
      style={{
        position: "sticky",
        marginBottom: "-50px",
        backgroundColor: "red"
      }}
    >
      <Row>
        <Col>
          {APP_NAME} &copy; {new Date().getFullYear()}
        </Col>
      </Row>
    </Container>
  );
};
