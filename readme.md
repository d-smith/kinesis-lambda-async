# kinesis-lambda-async

Simple kinesis serverless example, with a lambda reading records from the stream
and asynchronously calling another lambda function to do the processing.

You can play around with:

* The size of the batch you write to the stream (arg to makeBatch in send-batch.js)
* The concurrency limit on the async lambda (reservedConcurrency in serverless.yml)
* Batch size processed by lambda (batchSize in serverless.yml)

## Set up

Deploy the lambda and resources

```console
sls deploy --aws-profile <profile>
```

Write a record batch to the stream

```console
node send-batch.js
```

Note that to run the node send-batch you need to set your AWS_PROFILE and AWS_REGION environment variables.

View the function log to verify the processing of the record

```console
sls logs --function hello --aws-profile <profile>
```

