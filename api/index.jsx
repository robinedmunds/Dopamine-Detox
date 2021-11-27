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

  let activities = {}
  const positives = Object.fromEntries(
    pos.map((desc, idx) => [idx, { desc, positive: true }])
  )
  const negatives = Object.fromEntries(
    neg.map((desc, idx) => [idx + 100, { desc, positive: false }])
  )

  activities = {
    ...activities,
    ...positives,
    ...negatives
  }

  console.log(activities)
  return activities
}

export default generateObj()
