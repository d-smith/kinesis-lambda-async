const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

const doIt = async (event, content, callback) => {
    
    let records = event["Records"];
    console.log(`doIt invoked with ${records.length}`);

    records.forEach((r) => {
        console.log(`process record ${JSON.stringify(r)}`);
        let payloadData = JSON.stringify({
            calldata: Buffer.from(r.kinesis.data, 'base64').toString()
        });

        let params = {
            FunctionName: process.env.DOWNSTREAM_FN_NAME,
            InvocationType: 'Event',
            Payload: payloadData
        };
    
        lambda.invoke(params, (err,data) => {
            if(err) console.log(err, err.stack);
            else console.log(data);
        });
        

    });      
    callback(null, 'ok');
};

const doRecord = (event, content, callback) => {
    console.log(`do records called with ${JSON.stringify(event)}`);
    let payload = event['calldata'];
    console.log(`payload is ${payload}`);
    callback(null, 'yep');
}

module.exports = {
    doIt,
    doRecord
};