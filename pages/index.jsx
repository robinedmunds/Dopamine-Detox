import { useState, useEffect } from "react"
import Head from "next/head"
import { Container, Button, ProgressBar } from "react-bootstrap"
import Layout from "../components/Layout"
import TrackerModal from "../components/tracker/Modal"
import LogTable from "../components/tracker/LogTable"
import mockAPI from "../api/index"
import logger from "../helpers/logger"

const index = () => {
  const [seconds, setSeconds] = useState(0)
  const [progressBarValue, setProgressBarValue] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [showModal, setModalShow] = useState(false)
  const [activities, setActivities] = useState(null)
  const [activityLog, setActivityLog] = useState([])
  const [secondsInTenMins, setSecondsInTenMins] = useState(2)

  const pageTitle = "10 Minute time-tracker"

  const calcProgressBarValue = () =>
    Math.ceil((seconds / secondsInTenMins) * 100)

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive)
    setSeconds(0)
  }

  const activityBtnHandler = (activityId) => {
    setModalShow(false)
    toggleTimer()
    setActivityLog((activityLog) => [...activityLog, activities[activityId]])
  }

  // componentDidMount
  useEffect(() => setActivities(mockAPI), [])

  // timer logic
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

  // activityLog output to UI
  useEffect(() => {
    logger(activityLog)
  }, [activityLog])

  const renderStartStopBtn = () =>
    isTimerActive ? (
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
    ) : (
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
        <Container className={"mb-5"}>
          <h1 className={"mb-3"}>{pageTitle}</h1>
          {renderStartStopBtn()}
          <Container className={"mb-5"}>
            <ProgressBar now={progressBarValue} />
            {/* <ProgressBar animated now={seconds} /> */}
          </Container>

          <Button
            className="invisible"
            variant="primary"
            onClick={() => setModalShow(true)}>
            Open user prompt modal
          </Button>
          <LogTable activityLog={activityLog} />
        </Container>
      </Layout>
    </>
  )
}

export default index
