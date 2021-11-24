import { Container, Button, Modal, Tabs, Tab } from "react-bootstrap"

const activities = {
  pos: [
    "exercising",
    "socialising",
    "reading a book",
    "cooking",
    "eating a meal",
    "project work",
    "going for a walk"
  ],
  neg: [
    "browsing social media",
    "watching a random youtube video",
    "playing a game",
    "watching tv",
    "listening to music",
    "binging on the news",
    "binge eating",
    "substance abuse"
  ]
}

const TrackerModal = ({ show, setModalShow }) => {
  const generateButton = (idx, desc, pos) => (
    <Button
      key={idx}
      variant={pos ? "success" : "warning"}
      size="lg"
      className={"my-3"}
      onClick={() => setModalShow(false)}>
      {desc}
    </Button>
  )

  const generatePosButtons = () => {
    const positive = true
    const posArr = activities.pos
    return posArr.map((i, idx) => generateButton(idx, i, positive))
  }
  const generateNegButtons = () => {
    const positive = false
    const negArr = activities.neg
    return negArr.map((i, idx) => generateButton(idx, i, positive))
  }

  return (
    <Modal
      show={show}
      onHide={() => setModalShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title">
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
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
              {generateNegButtons()}
            </Container>
          </Tab>
          <Tab eventKey="positives" title="positives">
            <Container
              className={
                "d-flex flex-column justify-content-center align-items-center"
              }>
              {generatePosButtons()}
            </Container>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  )
}

export default TrackerModal
