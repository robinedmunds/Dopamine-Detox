import { Container, Button, Modal, Tabs, Tab } from "react-bootstrap"

const TrackerModal = ({ show, buttonHandler, mockAPI }) => {
  const generateButton = (idx, desc, pos) => (
    <Button
      key={idx}
      variant={pos ? "success" : "warning"}
      size="lg"
      className={"my-3"}
      onClick={() => buttonHandler()}>
      {desc}
    </Button>
  )

  const generatePosButtons = () => {
    const arr = []
    for (const [key, value] of Object.entries(mockAPI.activities.positives)) {
      arr.push(generateButton(key, value, true))
    }
    return arr
  }
  const generateNegButtons = () => {
    const arr = []
    for (const [key, value] of Object.entries(mockAPI.activities.negatives)) {
      arr.push(generateButton(key, value, false))
    }
    return arr
  }

  return (
    <Modal
      show={show}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title">
      <Modal.Header>
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
