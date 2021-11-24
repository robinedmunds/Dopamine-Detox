import Link from "next/link"
import { Container, Nav, Navbar } from "react-bootstrap"

const pages = [
  { title: "Home", link: "/" },
  { title: "Scratch", link: "scratch" }
]

const NavItems = pages.map((o) => (
  <Link href={o.link} passHref>
    <Nav.Link href={o.link}>{o.title}</Nav.Link>
  </Link>
))

const NavigationBar = () => (
  <Navbar bg="primary" variant="dark" className={"mb-4"}>
    <Container>
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
      <Nav className="me-auto">{NavItems}</Nav>
    </Container>
  </Navbar>
)

export default NavigationBar
