import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";


export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "ext-authors",
    // category refers to modern, classic, or storySeed
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      id: uuid.v4(),
      category: data.category,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      born: data.born,
      died: data.died,
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