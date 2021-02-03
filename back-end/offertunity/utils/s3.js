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
    region: AWS_config_region,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: AWS_IDENTITYPOOLID
    })
})

const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: bucket }
});

const upload = multer({
    limits: { fileSize: 100 * 1024 * 1024 }, // 파일 용량 제한
    storage: multerS3({
        s3: s3,
        bucket: bucket, // 버킷 이름
        acl: "public-read", // 클라이언트에서 자유롭게 가용하기 위함
        key: (req, file, cb) => {
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
                let extension = path.extname(file.originalname)
                cb(null, 'profileimage/' + Date.now().toString() + extension)
            } else if (file.mimetype === 'application/pdf' || file.mimetype === "application/vnd.ms-powerpoint" || file.mimetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
                let extension = path.extname(file.originalname)
                cb(null, 'companyDoc/' + Date.now().toString() + extension)
            } else if (file.mimetype === 'application/msword' || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document " || file.mimetype === "application/vnd.hancom.hwp") {
                let extension = path.extname(file.originalname)
                cb(null, 'companyDoc/' + Date.now().toString() + extension)
            } else {
                console.log(file.mimetype)
                cb({ error: 'Mime type not supported' })
            }
        }
    })
});

module.exports = upload