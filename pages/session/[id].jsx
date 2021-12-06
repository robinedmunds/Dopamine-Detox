import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { Container } from "react-bootstrap"
import { useLocalStorage } from "react-use"
import Layout from "../../components/Layout"
import LogTable from "../../components/tracker/LogTable"
import logger from "../../helpers/logger"

const SessionPage = () => {
  const [sessionsStore, setSessionsStore, removeSessionsStore] =
    useLocalStorage("sessionsStore", [])
  const router = useRouter()
  const { id } = router.query
  const [session, setSession] = useState(null)

  useEffect(() => setSession(sessionsStore[id]))

  const pageTitle = "Session detail"
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Layout>
        <Container className={"mb-5"}>
          <h1 className={"mb-3"}>{pageTitle}</h1>
          {session && <LogTable activityLog={session.activities} />}
        </Container>
      </Layout>
    </>
  )
}

export default SessionPage
