import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
    const params = {
      TableName: "ext-authors",
      // 'Key' defines the partition key and sort key of the item to be removed
      // - 'authorId': path parameter
      // - 'lastName': path parameter
      Key: {
        authorId: event.pathParameters.authorId,
        lastName: event.pathParameters.lastName,
      }
    };

    try {
      await dynamoDbLib.call("delete", params);
      return success({ status: true });
    } catch (e) {
      return failure({ status: false });
    }
  }