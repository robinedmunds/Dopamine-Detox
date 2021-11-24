import Head from "next/head"
import {
  Container,
  Button,
  Modal,
  ProgressBar,
  Tabs,
  Tab
} from "react-bootstrap"
import Layout from "../components/Layout"

const index = () => {
  const pageTitle = "10 Minute time-tracker"
  const spacing = "mb-5"
  const positives = [
    "exercising",
    "socialising",
    "reading a book",
    "cooking",
    "eating a meal",
    "project work",
    "going for a walk"
  ]
  const negatives = [
    "browsing social media",
    "watching a random youtube video",
    "playing a game",
    "watching tv",
    "listening to music",
    "binging on the news",
    "binge eating",
    "substance abuse"
  ]

  const generateNegativeButtons = negatives.map((i) => (
    <Button key={i} variant="warning" size="lg" className={"my-3"}>
      {i}
    </Button>
  ))

  const generatePositiveButtons = positives.map((i) => (
    <Button key={i} variant="success" size="lg" className={"my-3"}>
      {i}
    </Button>
  ))

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Layout>
        <Container className={spacing}>
          <h1 className={"mb-3"}>{pageTitle}</h1>

          <Container className={"d-flex justify-content-around"}>
            <Button variant="success" size="lg" className={"my-5"}>
              Start time tracker
            </Button>
            <Button variant="danger" size="lg" className={"my-5"}>
              Stop time tracker
            </Button>
          </Container>

          <Container className={spacing}>
            <ProgressBar animated now={45} />
          </Container>

          <Container>
            <Modal.Dialog className={"mw-100"}>
              <Modal.Header closeButton>
                <Modal.Title>
                  What have you been doing for the past 10 minutes?
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Tabs
                  defaultActiveKey="negatives"
                  id="uncontrolled-tab-example"
                  className="mb-3">
                  <Tab eventKey="negatives" title="negatives">
                    <Container
                      className={
                        "d-flex flex-column justify-content-center align-items-center"
                      }>
                      {generateNegativeButtons}
                    </Container>
                  </Tab>
                  <Tab eventKey="positives" title="positives">
                    <Container
                      className={
                        "d-flex flex-column justify-content-center align-items-center"
                      }>
                      {generatePositiveButtons}
                    </Container>
                  </Tab>
                </Tabs>
              </Modal.Body>
            </Modal.Dialog>
          </Container>
        </Container>
      </Layout>
    </>
  )
}

export default index
