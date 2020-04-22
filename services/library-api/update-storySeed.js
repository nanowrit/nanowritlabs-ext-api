import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "ext-storySeeds",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'authorId': key from the author table; path paramter
    // - 'storyId': path parameter
    Key: {
      storySeedId: event.pathParameters.storySeedId
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET authorId = :authorId, firstAppearedIn = :firstAppearedIn, firstAppearedDate = :firstAppearedDate, title = :title, content = :content",
    ExpressionAttributeValues: {
        ":authorId": data.authorId || null,
        ":firstAppearedIn": data.firstAppearedIn || null,
        ":firstAppearedDate": data.firstAppearedDate || null,
        ":title": data.title || null,
        ":content": data.content || null,
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