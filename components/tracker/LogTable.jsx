import React from "react"
import { Table } from "react-bootstrap"

const LogTable = () => {
  const generateRow = () => (
    <tr>
      <td>1</td>
      <td>Otto</td>
    </tr>
  )

  return (
    <>
      <h2>Activity log</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>{generateRow()}</tbody>
      </Table>
    </>
  )
}

export default LogTable
