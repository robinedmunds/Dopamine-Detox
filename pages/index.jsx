import { useState } from "react"
import Head from "next/head"
import { Container, Button, ProgressBar } from "react-bootstrap"
import Layout from "../components/Layout"
import TrackerModal from "../components/tracker/Modal"

const index = () => {
  const [showModal, setModalShow] = useState(false)
  const [progressValue, setProgress] = useState(85)

  const pageTitle = "10 Minute time-tracker"
  const spacing = "mb-5"

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <TrackerModal show={showModal} setModalShow={setModalShow} />

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
            <ProgressBar animated now={progressValue} />
          </Container>

          <Button variant="primary" onClick={() => setModalShow(true)}>
            Open user prompt modal
          </Button>
        </Container>
      </Layout>
    </>
  )
}

export default index
