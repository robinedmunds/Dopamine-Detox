import Head from "next/head"
import { Container, Button } from "react-bootstrap"
import { useLocalStorage } from "react-use"
import Layout from "../components/Layout"
import SessionsTable from "../components/sessions/SessionsTable"
import logger from "../helpers/logger"

const SessionsPage = () => {
  const [sessionsStore, setSessionsStore, removeSessionsStore] =
    useLocalStorage("sessionsStore", [])

  const pageTitle = "Sessions page"
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Layout>
        <Container className={"mb-5"}>
          <h1 className={"mb-3"}>{pageTitle}</h1>
          <SessionsTable sessions={sessionsStore} />
        </Container>
      </Layout>
    </>
  )
}

export default SessionsPage
