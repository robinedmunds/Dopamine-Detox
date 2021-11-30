import { useState } from "react"
import Head from "next/head"
import {
  Container,
  Button,
  Modal,
  ProgressBar,
  Tabs,
  Tab,
  Table,
  Spinner
} from "react-bootstrap"
import Layout from "../components/Layout"

const Scratch = () => {
  const [show, setShow] = useState(false)

  const spacing = "mb-5"
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  return (
    <>
      <Head>
        <title>Scratch page</title>
      </Head>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Excepteur sint occaecat cupidatat non proident
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{lorem}</p>
          <p>{lorem}</p>
          <p>{lorem}</p>
        </Modal.Body>
      </Modal>{" "}
      <Layout>
        <Container className={spacing}>
          <h1 className={"mb-3"}>Scratch page</h1>
          <p>{lorem}</p>
          <p>{lorem}</p>
        </Container>
        <Container className={spacing}>
          <Button variant="primary">Primary</Button>{" "}
          <Button variant="secondary">Secondary</Button>{" "}
          <Button variant="success">Success</Button>{" "}
          <Button variant="warning">Warning</Button>{" "}
          <Button variant="danger">Danger</Button>{" "}
          <Button variant="info">Info</Button>{" "}
          <Button variant="light">Light</Button>{" "}
          <Button variant="dark">Dark</Button>{" "}
          <Button variant="link">Link</Button>
          <br />
          <Button variant="outline-primary">Primary</Button>{" "}
          <Button variant="outline-secondary">Secondary</Button>{" "}
          <Button variant="outline-success">Success</Button>{" "}
          <Button variant="outline-warning">Warning</Button>{" "}
          <Button variant="outline-danger">Danger</Button>{" "}
          <Button variant="outline-info">Info</Button>{" "}
          <Button variant="outline-light">Light</Button>{" "}
          <Button variant="outline-dark">Dark</Button>
          <br />
          <Button variant="primary" size="lg">
            Large button
          </Button>
          <br />
          <Container>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                Block level button Block level button
              </Button>
              <Button variant="secondary" size="lg">
                Block level button
              </Button>
            </div>
          </Container>
        </Container>
        <Container>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Container>
        <Container className={spacing}>
          <ProgressBar animated now={45} />
        </Container>
        <Container className={spacing}>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3">
            <Tab eventKey="home" title="Home">
              {lorem}
            </Tab>
            <Tab eventKey="profile" title="Profile">
              {lorem}
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
              {lorem}
            </Tab>
          </Tabs>
        </Container>
        <Button variant="primary" onClick={() => setShow(true)}>
          Custom Width Modal
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>{" "}
        <>
          <Spinner animation="border" variant="primary" />
          <Spinner animation="border" variant="secondary" />
          <Spinner animation="border" variant="success" />
          <Spinner animation="border" variant="danger" />
          <Spinner animation="border" variant="warning" />
          <Spinner animation="border" variant="info" />
          <Spinner animation="border" variant="light" />
          <Spinner animation="border" variant="dark" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
        </>
      </Layout>
    </>
  )
}

export default Scratch
