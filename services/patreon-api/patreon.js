import AWS from '../../libs/aws-sdk';

const patreon = require("patreon");
const patreonAPI = patreon.patreon;
const patreonOAuth = patreon.oauth;
import { success, failure } from "../../libs/response-lib";
import config from "../../config";

const ssm = new AWS.SSM();
const patreonSecretKeyPromise = ssm.getParameter({
    Name: "/patreonSecretKey/live",
    WithDecryption: true
}).promise();

const patreonClientIdPromise = ssm.getParameter({
    Name: "/patreonClientId/live",
    WithDecryption: true
}).promise();

export async function main(event, context) {
    console.log(event);

    const CLIENT_ID = await patreonClientIdPromise;
    const CLIENT_SECRET = await patreonSecretKeyPromise;
    const patreonOAuthClient = patreonOAuth(CLIENT_ID.Parameter.Value, CLIENT_SECRET.Parameter.Value);
    const redirectURL = 'http://localhost:3000/patreon-connect';

    var oauthGrantCode = event.queryStringParameters.code;

    var res = {
        "headers": {
            "Content-Type": "application/json"
        }
    };

          // Invoke the patreon API as shown in the sample code
    async function getPatreonToken() {
        let patreonToken = {};
        let response = {};

        function goGetItPatreon(response) {
            console.log("Initiating function to go get patreon token...");
            console.log("oauthGrantCode: ", oauthGrantCode);
            console.log("CLIENT_ID: ", CLIENT_ID.Parameter.Value);
            console.log("CLIENT_SECRET: ", CLIENT_SECRET.Parameter.Value);
            patreonOAuthClient
            .getTokens(oauthGrantCode, redirectURL)
            .then(tokensResponse => {
                const patreonAPIClient = patreonAPI(tokensResponse.access_token);
                // console.log(patreonOAuthClient('/current_user'));
                return patreonAPIClient('/current_user');
            })
            .then(({ store }) => {
                // store is a [JsonApiDataStore](https://github.com/beauby/jsonapi-datastore)
                // You can also ask for result.rawJson if you'd like to work with unparsed data
                response.end(store.findAll('user').map(user => user.serialize()));
            })
            .catch(err => {
                console.error('error!', err);
                response.end(err);
            });
        }

        patreonToken = goGetItPatreon();
        return patreonToken;
    }

    try {
        const result = await getPatreonToken();
        if (result) {
            return success(result);
        } else {
            return failure({ status: false, error: "Patreon Token not returned" });
        }
    } catch (e) {
        return failure({ status: false, error: "error body: ", e });
    }
};