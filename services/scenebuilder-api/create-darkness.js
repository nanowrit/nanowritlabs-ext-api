import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
      TableName: "ext-darknesss",
      Item: {
        userId: event.requestContext.identity.cognitoIdentityId,
        darknessId: uuid.v1(),
        goal: data.goal,
        conflictField: data.conflictField,
        ultimateDisaster: data.ultimateDisaster,
        darkestMoment: data.darkestMoment,
        oneChance: data.oneChance,
        doAndDie: data.doAndDie,
        attachment: data.attachment,
        createdAt: Date.now()
      }
    };

    try {
      await dynamoDbLib.call("put", params);
      return success(params.Item);
    } catch (e) {
      return failure({ status: false });
    }
  }