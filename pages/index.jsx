import { useState, useEffect, useRef } from "react"
import Head from "next/head"
import { Container, Button } from "react-bootstrap"
import useToggle from "../hooks/useToggle"
import Layout from "../components/Layout"
import TrackerModal from "../components/tracker/Modal"
import LogTable from "../components/tracker/LogTable"
import ProgressBar from "../components/tracker/ProgressBar"
import mockAPI from "../api/index"
import logger from "../helpers/logger"

const index = () => {
  const [seconds, setSeconds] = useState(0)
  const [progressBarValue, setProgressBarValue] = useState(0)
  const [isTimerActive, setIsTimerActive] = useToggle(false)
  const [showModal, setShowModal] = useToggle(false)
  const [activities, setActivities] = useState(null)
  const [activityLog, setActivityLog] = useState([])
  const secondsInTenMins = useRef(2)
  const promptTime = useRef(null)
  const audibleBell = useRef(null)
  const isBrowser = useRef(typeof window !== "undefined")

  const calcProgressBarValue = () =>
    Math.ceil((seconds / secondsInTenMins.current) * 100)

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive)
    setSeconds(0)
  }

  const activityBtnHandler = (activityId) => {
    setShowModal(false)
    toggleTimer()
    setActivityLog((prevActivityLog) => [
      ...prevActivityLog,
      {
        ...activities[activityId],
        promptTime: promptTime.current,
        reportTime: new Date()
      }
    ])
  }

  useEffect(() => {
    logger(`isBrowser:  ${isBrowser.current}`)
    setActivities(mockAPI)
  }, [])

  useEffect(() => {
    // https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
    let interval = null

    if (isTimerActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
        setProgressBarValue(calcProgressBarValue())

        if (seconds >= secondsInTenMins.current) {
          audibleBell.current.play()
          toggleTimer()
          setShowModal(true)
          promptTime.current = new Date()
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerActive, seconds])

  useEffect(() => {
    logger("activityLog (mem):-")
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

  const pageTitle = "10 Minute time-tracker"
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
            <ProgressBar percentage={progressBarValue} />
          </Container>

          <Button
            className="invisible"
            variant="primary"
            onClick={() => setShowModal(true)}>
            Open user prompt modal
          </Button>
          <LogTable activityLog={activityLog} />
        </Container>
      </Layout>

      <audio ref={audibleBell} preload="auto">
        <source src="ring.ogg" type="audio/ogg" />
      </audio>
    </>
  )
}

export default index
