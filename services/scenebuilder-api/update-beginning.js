import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "ext-beginnings",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'beginningId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      beginningId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET hook = :hook, backstory = :backstory, incitingIncident = :incitingIncident, triggerEvent = :triggerEvent, debate = :debate, decision = :decision, threshold = :threshold, attachment = :attachment",
    ExpressionAttributeValues: {
        ":hook": data.hook || null,
        ":backstory": data.backstory || null,
        ":incitingIncident": data.incitingIncident || null,
        ":triggerEvent": data.triggerEvent || null,
        ":debate": data.debate || null,
        ":decision": data.decision || null,
        ":threshold": data.threshold || null,
        ":attachment": data.attachment || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}