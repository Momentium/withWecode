const DEFAULT_QUERY_OPTION = {
<<<<<<< HEAD
=======
<<<<<<< HEAD
    deleted_at: null,
    // status: 'PUBLISHED',
  }
  
  const getQueryOption = (key, value) => {
    const mapper = {
      user_id: { [key]: Number(value) },
      comments: { [key]: { some: { body: { contains: value } } } },
=======
>>>>>>> feature/projectCRUD
    is_saved: true,
}
  
const getQueryOption = (key, value) => {
    const mapper = {
        user_id: { [key]: Number(value) },
        comments: { [key]: { some: { body: { contains: value } } } },
<<<<<<< HEAD
=======
>>>>>>> back-end
>>>>>>> feature/projectCRUD
    }
  
    const matched = mapper[key]
    if (matched) return matched
  
    return { [key]: { contains: value } }
<<<<<<< HEAD
=======
<<<<<<< HEAD
  }
  
  const entriesAndMap = (fields, cb) => Object.entries(fields).map(cb)
  
  const makeQueryOption = (fields) => {
=======
>>>>>>> feature/projectCRUD
}
  
const entriesAndMap = (fields, cb) => Object.entries(fields).map(cb)
  
const makeQueryOption = (fields) => {
<<<<<<< HEAD
=======
>>>>>>> back-end
>>>>>>> feature/projectCRUD
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
<<<<<<< HEAD
  }
  
  module.exports = makeQueryOption
=======
}
  
module.exports = makeQueryOption
>>>>>>> back-end
>>>>>>> feature/projectCRUD
