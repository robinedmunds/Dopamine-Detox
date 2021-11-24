import { Container, Nav, Navbar } from "react-bootstrap"
import NavigationBar from "./NavigationBar"

const Layout = ({ children }) => (
  <>
    <NavigationBar />
    <Container fluid="md">{children}</Container>
  </>
)

export default Layout
