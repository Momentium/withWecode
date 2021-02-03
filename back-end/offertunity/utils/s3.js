const AWS = require('aws-sdk');
const path = require("path")

var multer = require("multer");
var multerS3 = require("multer-s3");

const dotenv = require('dotenv') 
dotenv.config()

const { AWS_config_region, AWS_IDENTITYPOOLID } = process.env

const bucket = 'offertunity'

multer({
  limits: { fieldSize: 25 * 1024 * 1024 }
})


AWS.config.update({
  region : AWS_config_region,
  credentials : new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWS_IDENTITYPOOLID
})
})

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: {Bucket: bucket}
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket, // 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
    acl: "public-read", // 클라이언트에서 자유롭게 가용하기 위함
    key: (req, file, cb) => {
      let extension = path.extname(file.originalname)
      cb(null, 'profileimage/'+Date.now().toString()+extension);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 용량 제한
});

module.exports = upload