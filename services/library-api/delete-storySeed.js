import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
    const params = {
      TableName: "ext-storySeeds",
      // 'Key' defines the partition key and sort key of the item to be removed
      // - 'authorId': path parameter
      // - 'storyId': path parameter
      Key: {
        storySeedId: event.pathParameters.storySeedId,
      }
    };

    try {
      await dynamoDbLib.call("delete", params);
      return success({ status: true });
    } catch (e) {
      console.log(e);
      return failure({ status: false });
    }
  }