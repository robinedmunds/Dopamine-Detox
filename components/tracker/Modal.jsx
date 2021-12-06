import { Container, Button, Modal, Tabs, Tab, Spinner } from "react-bootstrap"

const TrackerModal = ({ show, activityBtnHandler, activities }) => {
  const generateBtn = (id, desc, isPositive) => (
    <Button
      key={id}
      data-activity-id={id}
      variant={isPositive ? "success" : "warning"}
      size="lg"
      className={"my-3"}
      onClick={() => activityBtnHandler(id)}>
      {desc}
    </Button>
  )

  const generateBtns = (isPositive) => {
    const arr = []
    for (const [key, obj] of Object.entries(activities)) {
      if (isPositive === obj.positive)
        arr.push(generateBtn(key, obj.desc, obj.positive))
    }
    return arr
  }

  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title">
      <Modal.Header>
        <Modal.Title id="example-custom-modal-styling-title">
          What have you been doing for the past 10 minutes?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {activities ? (
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
        ) : (
          <Container
            className={
              "d-flex flex-column justify-content-center align-items-center"
            }>
            <Spinner animation="border" variant="primary" />
          </Container>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default TrackerModal
