import Link from "next/link"
import { Container, Nav, Navbar } from "react-bootstrap"

const pages = [
  { title: "Home", link: "/" },
  { title: "Scratch", link: "/scratch" },
  {
    title: "Dev thread",
    link: "https://forum.level1techs.com/t/devember-2021-dopamine-detox-app/178926"
  },
  { title: "GitHub", link: "https://github.com/robinedmunds/Dopamine-Detox" }
]

const NavigationBar = () => {
  const NavItems = pages.map((o) => (
    <Link key={o.title} href={o.link} passHref>
      <Nav.Link href={o.link}>{o.title}</Nav.Link>
    </Link>
  ))

  return (
    <Navbar bg="primary" variant="dark" className={"mb-4"}>
      <Container>
        <Navbar.Brand href="/">Dopamine detox app prototype</Navbar.Brand>
        <Nav className="me-auto">{NavItems}</Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
