import { useState, useEffect, useRef, useReducer } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { Container, Button } from "react-bootstrap"
import { useLocalStorage, useBeforeUnload } from "react-use"
import Layout from "../components/Layout"
import TrackerModal from "../components/tracker/Modal"
import LogTable from "../components/tracker/LogTable"
import ProgressBar from "../components/tracker/ProgressBar"
import { activitiesTable } from "../api/mockAPI"
import { activitiesTableReducer } from "../reducers/reducers"
import logger from "../helpers/logger"

const ACTIONS = {
  START_CLICKED: "START_CLICKED",
  INCREMENT_SECONDS: "INCREMENT_SECONDS",
  PROMPT_USER: "PROMPT_USER",
  ACTIVITY_CLICKED: "ACTIVITY_CLICKED",
  STOP_CLICKED: "STOP_CLICKED"
}

const TrackerPage = ({ activityList }) => {
  const router = useRouter()
  const [activities, setActivities] = useState(activityList)
  const [sessionsStore, setSessionsStore, removeSessionsStore] =
    useLocalStorage("sessionsStore", [])
  const [progressBarValue, setProgressBarValue] = useState(0)
  const promptTime = useRef(null)
  const audibleBell = useRef(null)

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.START_CLICKED:
        return {
          ...state,
          trackerState: ACTIONS.START_CLICKED,
          dirty: true,
          active: true,
          startTime: new Date()
        }
      case ACTIONS.INCREMENT_SECONDS:
        return { ...state, seconds: state.seconds + 1 }
      case ACTIONS.PROMPT_USER:
        return {
          ...state,
          trackerState: ACTIONS.PROMPT_USER,
          active: false,
          showModal: true,
          seconds: 0
        }
      case ACTIONS.ACTIVITY_CLICKED:
        return {
          ...state,
          trackerState: ACTIONS.ACTIVITY_CLICKED,
          active: true,
          showModal: false,
          activityLog: [...state.activityLog, action.payload]
        }
      case ACTIONS.STOP_CLICKED:
        return {
          ...state,
          trackerState: ACTIONS.STOP_CLICKED,
          dirty: false,
          active: false,
          stopTime: new Date()
        }
      default:
        return state
    }
  }
  const [tracker, dispatch] = useReducer(reducer, {
    trackerState: null,
    intervalDuration: 3,
    active: false,
    intervalEvent: null,
    startTime: null,
    stopTime: null,
    seconds: 0,
    showModal: false,
    activityLog: [],
    dirty: false
  })

  // FIXME: worked for full DOM unload but not react nav
  useBeforeUnload(tracker.dirty, "The current session will be lost...")

  const calcProgressBarValue = () =>
    Math.ceil((tracker.seconds / tracker.intervalDuration) * 100)

  const startStopBtnHandler = (startClicked) => {
    if (startClicked) dispatch({ type: ACTIONS.START_CLICKED })
    if (!startClicked) dispatch({ type: ACTIONS.STOP_CLICKED })
  }

  const activityBtnHandler = (activityId) => {
    dispatch({
      type: ACTIONS.ACTIVITY_CLICKED,
      payload: {
        ...activities[activityId],
        promptTime: promptTime.current,
        reportTime: new Date()
      }
    })
  }

  const tick = () => {
    dispatch({ type: ACTIONS.INCREMENT_SECONDS })
    setProgressBarValue(calcProgressBarValue())
    if (tracker.seconds >= tracker.intervalDuration) {
      audibleBell.current.play()
      dispatch({ type: ACTIONS.PROMPT_USER })
      promptTime.current = new Date()
    }
  }

  useEffect(() => {}, [tracker])

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

  useEffect(() => {
    const addSessionToLocalStorage = () => {
      if (tracker.trackerState === ACTIONS.STOP_CLICKED) {
        if (tracker.activityLog.length < 1) return
        setSessionsStore([
          ...sessionsStore,
          {
            sessionStartTime: tracker.startTime,
            sessionStopTime: tracker.stopTime,
            activities: tracker.activityLog
          }
        ])
        router.push("/sessions")
      }
    }
    addSessionToLocalStorage()
  }, [tracker.active])

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

          <LogTable activityLog={tracker.activityLog} />
        </Container>
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
