import { useState, useEffect, useRef, useReducer } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { Container, Button } from "react-bootstrap"
import { useToggle, useLocalStorage, useBeforeUnload } from "react-use"
import Layout from "../components/Layout"
import TrackerModal from "../components/tracker/Modal"
import LogTable from "../components/tracker/LogTable"
import ProgressBar from "../components/tracker/ProgressBar"
import { activitiesTable } from "../api/mockAPI"
import { activitiesTableReducer } from "../reducers/reducers"
import logger from "../helpers/logger"

const ACTIONS = {
  SET_START_TIME: "SET_START_TIME",
  SET_STOP_TIME: "SET_STOP_TIME",
  SET_TIMER_ACTIVE: "SET_TIMER_ACTIVE",
  SET_TIMER_INACTIVE: "SET_TIMER_INACTIVE",
  INCREMENT_SECONDS: "INCREMENT_SECONDS",
  RESET_SECONDS: "RESET_SECONDS",
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL",
  ADD_ACTIVITY: "ADD_ACTIVITY",
  START_CLICKED: "START_CLICKED",
  STOP_CLICKED: "STOP_CLICKED",
  ACTIVITY_CLICKED: "ACTIVITY_CLICKED",
  PROMPT_USER: "PROMPT_USER"
}

const TrackerPage = ({ activityList }) => {
  const router = useRouter()
  const [activities, setActivities] = useState(activityList)
  const [activityLog, setActivityLog, removeActivityLog] = useLocalStorage(
    "activityLog",
    []
  )
  const [sessionsStore, setSessionsStore, removeSessionsStore] =
    useLocalStorage("sessionsStore", [])
  const [progressBarValue, setProgressBarValue] = useState(0)
  const promptTime = useRef(null)
  const audibleBell = useRef(null)
  const [dirty, toggleDirty] = useToggle(false)
  useBeforeUnload(dirty, "The current session will be lost...")

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.SET_TIMER_ACTIVE:
        return { ...state, active: true }
      case ACTIONS.SET_TIMER_INACTIVE:
        return { ...state, active: false }
      case ACTIONS.INCREMENT_SECONDS:
        return { ...state, seconds: state.seconds + 1 }
      case ACTIONS.RESET_SECONDS:
        return { ...state, seconds: 0 }
      case ACTIONS.SHOW_MODAL:
        return { ...state, showModal: true }
      case ACTIONS.HIDE_MODAL:
        return { ...state, showModal: false }
      case ACTIONS.ADD_ACTIVITY:
        return { ...state, log: [...state.log, action.payload] }
      case ACTIONS.SET_START_TIME:
        return { ...state, startTime: new Date() }
      case ACTIONS.SET_STOP_TIME:
        return { ...state, stopTime: new Date() }
      case ACTIONS.START_CLICKED:
        return { ...state, active: true, startTime: new Date() }
      case ACTIONS.STOP_CLICKED:
        return { ...state, active: false, stopTime: new Date() }
      case ACTIONS.ACTIVITY_CLICKED:
        return { ...state, active: true, showModal: false }
      case ACTIONS.PROMPT_USER:
        return { ...state, active: false, showModal: true, seconds: 0 }
      default:
        return state
    }
  }
  const [tracker, dispatch] = useReducer(reducer, {
    intervalDuration: 3,
    active: false,
    intervalEvent: null,
    startTime: null,
    stopTime: null,
    seconds: 0,
    showModal: false,
    log: [],
    dirty: false
  })

  const calcProgressBarValue = () =>
    Math.ceil((tracker.seconds / tracker.intervalDuration) * 100)

  const saveLogToSessions = () => {
    setSessionsStore([
      ...sessionsStore,
      {
        sessionStartTime: tracker.startTime,
        sessionStopTime: tracker.stopTime,
        activities: activityLog
      }
    ])
    setActivityLog([])
    // router.push("/sessions")
  }

  const startStopBtnHandler = async (startClicked) => {
    if (startClicked) {
      dispatch({ type: ACTIONS.START_CLICKED })
    } else {
      dispatch({ type: ACTIONS.STOP_CLICKED })
      // FIXME: execution order problem, tracker.stopTime is null after assignment
      // saveLogToSessions func executes before new Data instantiation
      saveLogToSessions()
    }
  }

  const activityBtnHandler = (activityId) => {
    dispatch({ type: ACTIONS.ACTIVITY_CLICKED })
    setActivityLog([
      ...activityLog,
      {
        ...activities[activityId],
        promptTime: promptTime.current,
        reportTime: new Date()
      }
    ])
  }

  const checkSaveState = () => {
    if (tracker.active || tracker.showModal) {
      toggleDirty(true)
    } else {
      toggleDirty(false)
    }
  }

  useEffect(() => {
    checkSaveState()
  }, [tracker.active, tracker.showModal])

  useEffect(() => {}, [activityLog])

  const tick = () => {
    dispatch({ type: ACTIONS.INCREMENT_SECONDS })
    setProgressBarValue(calcProgressBarValue())
    if (tracker.seconds >= tracker.intervalDuration) {
      audibleBell.current.play()
      dispatch({ type: ACTIONS.PROMPT_USER })
      promptTime.current = new Date()
    }
  }

  useEffect(() => {
    // https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
    let interval = null
    if (tracker.active) {
      interval = setInterval(() => {
        tick()
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [tracker.active, tracker.seconds])

  const renderStartStopBtn = () =>
    tracker.active ? (
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
        show={tracker.showModal}
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
            onClick={() => toggleShowModal(true)}>
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
