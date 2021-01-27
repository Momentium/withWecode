import axios from 'axios';

export const getProjectData = (url, hook) => {
  return axios.get(url)
  .then((res) => {
    return res.data.map((el, idx) => {
      return 
    })
  })
  .then((res) => {hook(res)})
}