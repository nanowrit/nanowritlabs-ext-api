import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
    const params = {
      TableName: "ext-premises",
      // 'Key' defines the partition key and sort key of the item to be retrieved
      // - 'authorId': path parameter
      // - 'storyId': path parameter
      Key: {
        userId: event.requestContext.identity.cognitoIdentityId,
        id: event.pathParameters.id,
      }
    };

    try {
      const result = await dynamoDbLib.call("get", params);
      if (result.Item) {
        // Return the retrieved item
        return success(result.Item);
      } else {
        return failure({ status: false, error: "Item not found." });
      }
    } catch (e) {
      return failure({ status: false });
    }
  }