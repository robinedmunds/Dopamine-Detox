import Head from "next/head"
import { Container, Button, Modal, ProgressBar } from "react-bootstrap"
import Layout from "../components/Layout"

const index = () => {
  const spacing = "mb-5"
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  return (
    <>
      <Head>
        <title>index page</title>
      </Head>

      <Layout>
        <Container className={spacing}>
          <h1 className={"mb-3"}>index page</h1>
          <p>{lorem}</p>
        </Container>
      </Layout>
    </>
  )
}

export default index
