import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "ext-authors",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'authorId': key from the author table; path paramter
    // - 'storyId': path parameter
    Key: {
      authorId: event.pathParameters.authorId
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET category = :category, firstName = :firstName, middleName = :middleName, lastName = :lastName, born = :born, died = :died",
    ExpressionAttributeValues: {
        ":category": data.category || null,
        ":firstName": data.firstName || null,
        ":middleName": data.middleName || null,
        ":lastName": data.lastName || null,
        ":born": data.born || null,
        ":died": data.died || null,
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