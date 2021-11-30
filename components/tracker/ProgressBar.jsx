import { ProgressBar } from "react-bootstrap"

const TrackerProgressBar = ({ percentage }) => {
  return <ProgressBar animated now={percentage} />
}

export default TrackerProgressBar
