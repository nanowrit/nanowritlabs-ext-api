import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
    const params = {
      TableName: "ext-classicStories",
      // 'Key' defines the partition key and sort key of the item to be removed
      // - 'authorId': path parameter
      // - 'storyId': path parameter
      Key: {
        authorId: event.pathParameters.authorId,
        storyId: event.pathParameters.storyId,
      }
    };

    try {
      await dynamoDbLib.call("delete", params);
      return success({ status: true });
    } catch (e) {
      return failure({ status: false });
    }
  }