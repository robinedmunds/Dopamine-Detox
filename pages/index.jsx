import { useState, useEffect } from "react"
import Head from "next/head"
import { Container, Button, ProgressBar } from "react-bootstrap"
import Layout from "../components/Layout"
import TrackerModal from "../components/tracker/Modal"
import mockAPI from "../api/index"
import LogTable from "../components/tracker/LogTable"

const index = () => {
  const [seconds, setSeconds] = useState(0)
  const [progressBarValue, setProgressBarValue] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [showModal, setModalShow] = useState(false)
  const [activities, setActivities] = useState(mockAPI)
  const [activityLog, logActivity] = useState([])

  const secondsInTenMins = 2

  const calcProgressBarValue = () =>
    Math.ceil((seconds / secondsInTenMins) * 100)

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive)
    setSeconds(0)
  }

  const activityBtnHandler = (activityId) => {
    setModalShow(false)
    toggleTimer()
    logActivity([...activityLog, activityId])

    const example = {
      id: 0,
      desc: "Read book",
      positive: false
    }
  }

  useEffect(() => {
    // https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
    let interval = null

    if (isTimerActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
        setProgressBarValue(calcProgressBarValue())
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

  useEffect(() => {
    console.log(`activityLog:  ${activityLog}`)
  }, [activityLog])

  const pageTitle = "10 Minute time-tracker"
  const spacing = "mb-5"

  const renderStartStopBtn = () => {
    if (!isTimerActive) {
      return (
        <Container className={"d-flex justify-content-around"}>
          <Button
            id="start-stop-button"
            variant="success"
            size="lg"
            className={"my-5"}
            onClick={() => toggleTimer()}>
            Start time tracker
          </Button>
        </Container>
      )
    }
    return (
      <Container className={"d-flex justify-content-around"}>
        <Button
          id="start-stop-button"
          variant="danger"
          size="lg"
          className={"my-5"}
          onClick={() => toggleTimer()}>
          Stop time tracker
        </Button>
      </Container>
    )
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <TrackerModal
        show={showModal}
        activityBtnHandler={activityBtnHandler}
        activities={activities}
      />

      <Layout>
        <Container className={spacing}>
          <h1 className={"mb-3"}>{pageTitle}</h1>
          {renderStartStopBtn()}
          <Container className={spacing}>
            <ProgressBar now={progressBarValue} />
            {/* <ProgressBar animated now={seconds} /> */}
          </Container>

          <Button
            className="invisible"
            variant="primary"
            onClick={() => setModalShow(true)}>
            Open user prompt modal
          </Button>
          <LogTable />
        </Container>
      </Layout>
    </>
  )
}

export default index
