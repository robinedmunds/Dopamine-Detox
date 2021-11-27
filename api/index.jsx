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

  return {
    activities: {
      positives: Object.fromEntries(pos.map((desc, idx) => [idx, desc])),
      negatives: Object.fromEntries(neg.map((desc, idx) => [idx + 50, desc]))
    }
  }
}

export default generateObj()

// console.log(generateObj())
