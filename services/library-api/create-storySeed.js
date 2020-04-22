import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";


export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "ext-storySeeds",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      storySeedId: uuid.v4(),
      authorId: data.authorId,
      firstAppearedIn: data.firstAppearedIn,
      firstAppearedDate: data.firstAppearedDate,
      title: data.title,
      content: data.content,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}