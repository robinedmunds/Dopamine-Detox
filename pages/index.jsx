import { useState, useEffect } from "react"
import Head from "next/head"
import { Container, Button, ProgressBar } from "react-bootstrap"
import Layout from "../components/Layout"
import TrackerModal from "../components/tracker/Modal"

const index = () => {
  // TODO: user clicks START; timer count to 10 mins; when timer is up, show modal
  const [seconds, setSeconds] = useState(0)
  const [isTimerActive, setisTimerActive] = useState(false)
  const [showModal, setModalShow] = useState(false)

  const secondsInTenMins = 3 - 1

  const toggleTimer = () => {
    setisTimerActive(!isTimerActive)
  }

  const resetTimer = () => {
    setSeconds(0)
    setisTimerActive(false)
  }

  const buttonHandler = () => {
    setModalShow(false)
    resetTimer()
    toggleTimer()
    // TODO: store result
  }

  useEffect(() => {
    // https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
    let interval = null

    if (isTimerActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
        if (seconds >= secondsInTenMins) {
          toggleTimer()
          setModalShow(true)
        }
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

      <TrackerModal show={showModal} buttonHandler={buttonHandler} />

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
