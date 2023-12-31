import AWS from 'aws-sdk';

const ToS3Bucket = async () => {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) {
        throw 'AWS access key ID or secret access key is undefined.'
    }

    AWS.config.update({
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
        region: process.env.AWS_REGION,
    });

    const S3 = new AWS.S3({});
    return S3;
}

export { ToS3Bucket };