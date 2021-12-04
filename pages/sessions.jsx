import Head from "next/head"
import { Container, Button } from "react-bootstrap"
import Layout from "../components/Layout"
import logger from "../helpers/logger"

const SessionsPage = () => {
  const pageTitle = "Sessions page"
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Layout>
        <Container className={"mb-5"}>
          <h1 className={"mb-3"}>{pageTitle}</h1>
        </Container>
      </Layout>
    </>
  )
}

export default SessionsPage
