import AWS from '../../libs/aws-sdk';
import { patreon as _patreon, oauth } from "patreon";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  console.log(event);



  try {
    // await dynamoDbLib.call("put", params);
    return success(event.pathParameters.code);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
