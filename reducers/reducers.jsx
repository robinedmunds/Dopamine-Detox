const activitiesTableReducer = (table) =>
  table.reduce(
    (prev, current) => ({
      ...prev,
      [current.id]: current
    }),
    {}
  )

export { activitiesTableReducer }
