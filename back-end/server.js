const https = require('https')
const express = require('express')
let { posts } = require('./db') // 서버를 킬 때마다 일시적으로 생성되는 데이터 입니다. 
const app = express()

app.use(express.json())

app.get('/posts', (req, res) => {
  res.json({ posts }) // 모든 post 의 정보를 json 에 담아서 보내는 API
})

app.post('/posts', (req, res) => {
 // request 의 body 로 들어오는 post 의 데이터를 posts 배열에 추가 하는 함수
})

app.get('', (req, res) => {
 // post id 로 조회하는 함수
})

app.put('', (req, res) => {
 // post id 로 posts 배열중 하나의 post를 업데이트 하는 함수
})

app.delete('/posts/:id', (req, res) => {
 // post id 로 posts 배열중 하나의 post를 삭제하는 함수
})

const server = https.createServer(app)

server.listen(process.env.PORT, () => {
  console.log(`server is listening on PORT ${process.env.PORT}`)
})