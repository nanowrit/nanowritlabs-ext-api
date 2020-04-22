import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "ext-modernStories",
    // 'KeyConditionExpression' defines the condition for the query
    // - 'authorId = :authorId': only return items with matching 'authorId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':authorId': defines 'authorId' to be the author id
    //   of the authenticated user
    KeyConditionExpression: "authorId = :authorId",
    ExpressionAttributeValues: {
      ":authorId": event.pathParameters.authorId
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}