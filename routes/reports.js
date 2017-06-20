var express = require('express');
var router = express.Router();
var multer = require('multer');
var multerS3 = require('multer-s3')
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var s3 = new AWS.S3();

var upload = multer({

    storage: multerS3({
        s3: s3,
        bucket: 'apiway-report',
        metadata: function (req, file, cb) {
            console.log('metadata : ' + file.originalname);
            cb(null, {fieldName: file.originalname});
        },
        key: function (req, file, cb) {
            console.log('key : ' + file.fieldname);
            cb(null, file.originalname);
        }
    })
});

router.post('/', upload.array('mochaFiles', 2), function(req, res){

    res.send('uploaded: '+ JSON.stringify(req.files));
});

module.exports = router;