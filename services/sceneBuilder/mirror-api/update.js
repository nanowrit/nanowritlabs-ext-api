import * as dynamoDbLib from "../../../libs/dynamodb-lib";
import { success, failure } from "../../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "ext-mirrors",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'mirrorId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      mirrorId: event.pathParameters.id,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET goal = :goal, conflictField = :conflictField, disaster = :disaster, mirrorMoment = :mirrorMoment, oneMoreTime = :oneMoreTime, actionField = :actionField, attachment = :attachment",
    ExpressionAttributeValues: {
      ":goal": data.goal || null,
      ":conflictField": data.conflictField || null,
      ":disaster": data.disaster || null,
      ":mirrorMoment": data.mirrorMoment || null,
      ":oneMoreTime": data.oneMoreTime || null,
      ":actionField": data.actionField || null,
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