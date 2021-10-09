const aws =require('aws-sdk');
const crypto = require('crypto');
const util=require('util');
// const region='us-west-1';
// const bucketName='uber-eats-proto-pun';
// const accessKeyID='AKIA2VAZJPGRWDHTAM43';
// const secretAccessKey='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';
// const secretAccessKey='ss8Vxv8k7I6/VCsH3D/oRf3EYZ1OE3P5teKWGuA1';
//AKIA2VAZJPGRWDHTAM43
//AKIARQLG2SLL2CQ74EAU

// const region='us-west-1';
// const bucketName='uber-eats-proto-pun';
// const accessKeyID='AKIA2VAZJPGRYSJFAYNE';
// const secretAccessKey='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';
// const randomBytes=util.promisify(crypto.randomBytes)


// const s3 = new aws.S3({
// region,
// accessKeyID,
// secretAccessKey,
// signatureVersion:'v4'
// }
// );

const region = "us-west-1";
const bucketName = "uber-eats-proto-pun";
const accessKeyId = "AKIA2VAZJPGRYSJFAYNE";
const secretAccessKey = "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";
const randomBytes=util.promisify(crypto.randomBytes);

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

 async function generateUploadURL() {
  console.log("-------------------");
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