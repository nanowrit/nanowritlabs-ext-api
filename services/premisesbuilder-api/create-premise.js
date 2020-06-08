import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";


export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "ext-premises",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      id: uuid.v4(),
      protagonist: data.protagonist,
      situation: data.situation,
      objective: data.objective,
      opponent: data.opponent,
      disaster: data.disaster,
      theme: data.theme,
      dramaticStatement: data.dramaticStatement,
      dramaticQuestion: data.dramaticQuestion,
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