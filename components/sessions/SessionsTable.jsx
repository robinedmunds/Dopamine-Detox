import { Table } from "react-bootstrap"

const SessionsTable = ({ sessions }) => {
  const generateRow = (
    idx,
    { sessionStartTime, sessionStopTime, activities }
  ) => {
    const start = new Date(sessionStartTime)
    const stop = new Date(sessionStopTime)
    const durationMs = stop.getMilliseconds() - start.getMilliseconds()
    const durationMins = durationMs / 1000 / 60
    let positiveCount = 0
    let negativeCount = 0

    activities.forEach((activity) => {
      if (activity.positive) {
        positiveCount++
      } else {
        negativeCount++
      }
    })

    return (
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>{start.toLocaleString("en-GB")}</td>
        <td>{stop.toLocaleString("en-GB")}</td>
        <td>{durationMins}</td>
        <td>{positiveCount}</td>
        <td>{negativeCount}</td>
        <td>{activities.length}</td>
      </tr>
    )
  }

  const generateRows = () => {
    const rows = []
    sessions.forEach((obj, idx) => {
      rows.push(generateRow(idx, obj))
    })
    return rows
  }

  const sessionsExist = sessions.length > 0

  return (
    <>
      <Table hover>
        <thead className={"bg-primary"}>
          <tr>
            <th>#</th>
            <th>Start</th>
            <th>End</th>
            <th>Length (mins)</th>
            <th>Positive</th>
            <th>Negative</th>
            <th>Total</th>
          </tr>
        </thead>
        {sessionsExist && <tbody>{generateRows()}</tbody>}
      </Table>
    </>
  )
}

export default SessionsTable
