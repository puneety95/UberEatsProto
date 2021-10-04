const aws =require('aws-sdk');
const crypto = require('crypto');
const util=require('util');
// const region='us-west-1';
// const bucketName='uber-eats-proto-pun';
// const accessKeyID='AKIA2VAZJPGRWDHTAM43';
// const secretAccessKey='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';

const region='us-west-1';
const bucketName='uber-eats-proto-pun';
const accessKeyID='AKIARQLG2SLL2CQ74EAU';
const secretAccessKey='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';
const randomBytes=util.promisify(crypto.randomBytes)
const s3 = new aws.S3({
region,
accessKeyID,
secretAccessKey,
signatureVersion:'v4'
}
)

 async function generateUploadURL() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
  
    const params = ({
      Bucket: bucketName,
      Key: imageName,
      Expires: 60
    })
    
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
  }

module.exports=generateUploadURL;