import Link from "next/link"
import { useRouter } from "next/router"
import { Container, Nav, Navbar } from "react-bootstrap"

const pages = [
  { title: "Time tracker", link: "/" },
  { title: "Sessions", link: "/sessions" },
  { title: "Scratch", link: "/scratch" },
  {
    title: "Dev thread",
    link: "https://forum.level1techs.com/t/devember-2021-dopamine-detox-app/178926"
  },
  { title: "GitHub", link: "https://github.com/robinedmunds/Dopamine-Detox" }
]

const NavigationBar = () => {
  const router = useRouter()
  const currentPath = router.pathname

  const NavItems = pages.map((page) => {
    const pathActive = currentPath === page.link

    return (
      <Link key={page.title} href={page.link} passHref>
        {pathActive ? (
          <Nav.Link href={page.link} active>
            {page.title}
          </Nav.Link>
        ) : (
          <Nav.Link href={page.link}>{page.title}</Nav.Link>
        )}
      </Link>
    )
  })

  return (
    <Navbar bg="primary" variant="dark" className={"mb-4"}>
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Dopamine detox app prototype</Navbar.Brand>
        </Link>
        <Nav className="justify-content-end">{NavItems}</Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
