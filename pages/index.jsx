import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { Container, Button } from "react-bootstrap"
import { useToggle, useLocalStorage, useEffectOnce } from "react-use"
import Layout from "../components/Layout"
import TrackerModal from "../components/tracker/Modal"
import LogTable from "../components/tracker/LogTable"
import ProgressBar from "../components/tracker/ProgressBar"
import { activitiesTable } from "../api/mockAPI"
import { activitiesTableReducer } from "../reducers/reducers"
import logger from "../helpers/logger"

const TrackerPage = ({ activityList }) => {
  const [seconds, setSeconds] = useState(0)
  const [progressBarValue, setProgressBarValue] = useState(0)
  const [isTimerActive, setIsTimerActive] = useToggle(false)
  const [showModal, setShowModal] = useToggle(false)
  const [activities, setActivities] = useState(activityList)
  const [activityLog, setActivityLog, removeActivityLog] = useLocalStorage(
    "activityLog",
    []
  )
  const [sessionsStore, setSessionsStore, removeSessionsStore] =
    useLocalStorage("sessionsStore", [])
  const secondsInTenMins = useRef(2)
  const promptTime = useRef(null)
  const audibleBell = useRef(null)
  const sessionStartTime = useRef(null)
  const sessionStopTime = useRef(null)
  const router = useRouter()

  const calcProgressBarValue = () =>
    Math.ceil((seconds / secondsInTenMins.current) * 100)

  const saveLogToSessions = () => {
    setSessionsStore([
      ...sessionsStore,
      {
        sessionStartTime: sessionStartTime.current,
        sessionStopTime: sessionStopTime.current,
        activities: activityLog
      }
    ])
    setActivityLog([])
    router.push("/sessions")
  }

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive)
    setSeconds(0)
  }

  const startStopBtnHandler = (startClicked) => {
    if (startClicked) {
      sessionStartTime.current = new Date()
    } else {
      sessionStopTime.current = new Date()
      saveLogToSessions()
    }
    toggleTimer()
  }

  const activityBtnHandler = (activityId) => {
    setShowModal(false)
    toggleTimer()
    setActivityLog([
      ...activityLog,
      {
        ...activities[activityId],
        promptTime: promptTime.current,
        reportTime: new Date()
      }
    ])
  }

  useEffect(() => {}, [activityLog])

  const tick = () => {
    setSeconds((seconds) => seconds + 1)
    setProgressBarValue(calcProgressBarValue())
    if (seconds >= secondsInTenMins.current) {
      audibleBell.current.play()
      toggleTimer()
      setShowModal(true)
      promptTime.current = new Date()
    }
  }

  useEffect(() => {
    // https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
    let interval = null
    if (isTimerActive) {
      interval = setInterval(() => {
        tick()
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerActive, seconds])

  const renderStartStopBtn = () =>
    isTimerActive ? (
      <Container className={"d-flex justify-content-around"}>
        <Button
          id="start-stop-button"
          variant="danger"
          size="lg"
          className={"my-5"}
          onClick={() => startStopBtnHandler(false)}>
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
          onClick={() => startStopBtnHandler(true)}>
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

        <Button
          className=""
          variant="danger"
          onClick={() => setActivityLog([])}>
          resetActivityLog
        </Button>
      </Layout>

      <audio ref={audibleBell} preload="auto">
        <source src="ring.ogg" type="audio/ogg" />
      </audio>
    </>
  )
}

const getServerSideProps = async () => {
  // pull data from 'API'. passes props to page
  return {
    props: { activityList: activitiesTableReducer(activitiesTable) }
  }
}

export { getServerSideProps }
export default TrackerPage
