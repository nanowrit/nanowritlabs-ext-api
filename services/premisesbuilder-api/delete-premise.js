import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
    const params = {
      TableName: "ext-premises",
      // 'Key' defines the partition key and sort key of the item to be removed
      // - 'userId': Identity Pool identity id of the authenticated user
      // - 'beginningId': path parameter
      Key: {
        userId: event.requestContext.identity.cognitoIdentityId,
        id: event.pathParameters.id
      }
    };

    try {
      await dynamoDbLib.call("delete", params);
      return success({ status: true });
    } catch (e) {
      return failure({ status: false });
    }
  }