import { useState, useEffect } from "react"
import Head from "next/head"
import { Container, Button, ProgressBar } from "react-bootstrap"
import Layout from "../components/Layout"
import TrackerModal from "../components/tracker/Modal"

const index = () => {
  const [seconds, setSeconds] = useState(1)
  const [isTimerActive, setisTimerActive] = useState(false)
  const [showModal, setModalShow] = useState(false)

  const toggleTimer = () => {
    setisTimerActive(!isTimerActive)
  }

  const resetTimer = () => {
    setSeconds(0)
    setisTimerActive(false)
  }

  useEffect(() => {
    // https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
    let interval = null

    if (isTimerActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)
    } else if (!isTimerActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isTimerActive, seconds])

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
            <Button
              variant="success"
              size="lg"
              className={"my-5"}
              onClick={() => setisTimerActive(true)}>
              Start time tracker
            </Button>
            <Button
              variant="danger"
              size="lg"
              className={"my-5"}
              onClick={() => setisTimerActive(false)}>
              Stop time tracker
            </Button>
          </Container>

          <Container className={spacing}>
            <ProgressBar now={seconds} />
            {/* <ProgressBar animated now={seconds} /> */}
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
