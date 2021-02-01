const DEFAULT_QUERY_OPTION = {
<<<<<<< HEAD
    deleted_at: null,
    // status: 'PUBLISHED',
  }
  
  const getQueryOption = (key, value) => {
    const mapper = {
      user_id: { [key]: Number(value) },
      comments: { [key]: { some: { body: { contains: value } } } },
=======
    is_saved: true,
}
  
const getQueryOption = (key, value) => {
    const mapper = {
        user_id: { [key]: Number(value) },
        comments: { [key]: { some: { body: { contains: value } } } },
>>>>>>> back-end
    }
  
    const matched = mapper[key]
    if (matched) return matched
  
    return { [key]: { contains: value } }
<<<<<<< HEAD
  }
  
  const entriesAndMap = (fields, cb) => Object.entries(fields).map(cb)
  
  const makeQueryOption = (fields) => {
=======
}
  
const entriesAndMap = (fields, cb) => Object.entries(fields).map(cb)
  
const makeQueryOption = (fields) => {
>>>>>>> back-end
    if (!fields) return DEFAULT_QUERY_OPTION
  
    const defaultQueryOptions = entriesAndMap(DEFAULT_QUERY_OPTION, ([key, value]) => ({
      [key]: value,
    }))
    const queryOptins = entriesAndMap(fields, ([key, value]) => getQueryOption(key, value))
    const where = { AND: [...defaultQueryOptions, ...queryOptins] }
    return where
<<<<<<< HEAD
  }
  
  module.exports = makeQueryOption
=======
}
  
module.exports = makeQueryOption
>>>>>>> back-end
