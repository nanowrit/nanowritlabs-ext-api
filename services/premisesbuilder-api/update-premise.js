import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "ext-premises",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'beginningId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      id: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET protagonist = :protagonist, situation = :situation, objective = :objective, opponent = :opponent, disaster = :disaster, theme = :theme, dramaticStatement = :dramaticStatement, dramaticQuestion = :dramaticQuestion, attachment = :attachment",
    ExpressionAttributeValues: {
        ":protagonist": data.protagonist || null,
        ":situation": data.situation || null,
        ":objective": data.objective || null,
        ":opponent": data.opponent || null,
        ":disaster": data.disaster || null,
        ":theme": data.theme || null,
        ":dramaticStatement": data.dramaticStatement || null,
        ":dramaticQuestion": data.dramaticQuestion || null,
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
    console.log(e);
    return failure({ status: false });
  }
}