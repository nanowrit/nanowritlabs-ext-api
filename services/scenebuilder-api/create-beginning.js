import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "ext-beginnings",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      beginningId: uuid.v1(),
      hook: data.hook,
      backstory: data.backstory,
      incitingIncident: data.incitingIncident,
      triggerEvent: data.triggerEvent,
      debate: data.debate,
      decision: data.decision,
      threshold: data.threshold,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}