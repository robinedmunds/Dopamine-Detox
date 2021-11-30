const enabled = true

const logger = (msg) => {
  if (!enabled) return
  console.log(msg)
}

export default logger
