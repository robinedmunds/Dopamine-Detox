import { Container, Button, Modal, Tabs, Tab } from "react-bootstrap"

const TrackerModal = ({ show, activityBtnHandler, activities }) => {
  const generateBtn = (id, desc, isPositive) => (
    <Button
      key={id}
      variant={isPositive ? "success" : "warning"}
      size="lg"
      className={"my-3"}
      onClick={() => activityBtnHandler(id)}>
      {desc}
    </Button>
  )

  const generateBtns = (isPositive) => {
    const arr = []
    const act = isPositive
      ? activities.activities.positives
      : activities.activities.negatives

    for (const [key, value] of Object.entries(act)) {
      arr.push(generateBtn(key, value, isPositive))
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
              {generateBtns(false)}
            </Container>
          </Tab>
          <Tab eventKey="positives" title="positives">
            <Container
              className={
                "d-flex flex-column justify-content-center align-items-center"
              }>
              {generateBtns(true)}
            </Container>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  )
}

export default TrackerModal
