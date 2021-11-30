import logger from "../helpers/logger"

const generateObj = () => {
  const pos = [
    "exercising",
    "socialising",
    "reading a book",
    "cooking",
    "eating a meal",
    "project work",
    "going for a walk"
  ]
  const neg = [
    "browsing social media",
    "watching a random youtube video",
    "playing a game",
    "watching tv",
    "listening to music",
    "binging on the news",
    "binge eating",
    "substance abuse"
  ]

  const positives = Object.fromEntries(
    pos.map((desc, idx) => [idx, { id: idx, desc, positive: true }])
  )
  const negatives = Object.fromEntries(
    neg.map((desc, idx) => [
      idx + 100,
      { id: idx + 100, desc, positive: false }
    ])
  )

  const activities = {
    ...positives,
    ...negatives
  }

  logger("mockAPI")
  logger(activities)
  return activities
}

export default generateObj()
