import { Container, Nav, Navbar } from "react-bootstrap"

const NavigationBar = () => (
  <Navbar bg="primary" variant="dark" className={"mb-4"}>
    <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
)

export default NavigationBar
