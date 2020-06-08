const stage = process.env.stage;
const resourcesStage = process.env.resourcesStage;

const stageConfigs = {
  dev: {
    stripeKeyName: "/stripeSecretKey/test",
    patreonKeyName: "/patreonSecretKey/live",
    patreonClientIdName: "/patreonClientId/live"
  },
  prod: {
    stripeKeyName: "/stripeSecretKey/live",
    patreonKeyName: "/patreonSecretKey/live",
    patreonClientIdName: "/patreonClientId/live"
  }
};

const config = stageConfigs[stage] || stageConfigs.dev;

export default {
  stage,
  resourcesStage,
  ...config
};