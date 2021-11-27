import React from "react"
import { Table } from "react-bootstrap"

const LogTable = ({ activityLog }) => {
  const generateRow = (idx, { id, desc, positive }) => (
    <tr className={positive ? "bg-success" : "bg-warning"}>
      <td>{idx + 1}</td>
      <td>{id}</td>
      <td>{desc}</td>
    </tr>
  )

  const generateRows = () => {
    const rows = []

    activityLog.forEach((obj, idx) => {
      rows.push(generateRow(idx, obj))
    })

    return rows
  }

  return (
    <>
      <h2>Activity log</h2>
      <Table hover>
        <thead className={"bg-primary"}>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>{generateRows()}</tbody>
      </Table>
    </>
  )
}

export default LogTable
