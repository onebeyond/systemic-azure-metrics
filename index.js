const appInsights = require('applicationinsights');

module.exports = () => {

  // samplingPercentage, disableAppInsights, etc
  const setupConfig = (client) => (property, value) => {
    client.config.property = value;
  };

  const setupTag = (client) => (property, value) => {
    client.context.tags[property] = value;
  };

  const start = async ({ config }) => {
    const {
      key,
      internalLogging = true,
      insightsConfig = {},
      context: {
        tags = {},
      },
      autoCollect: {
        requests = true,
        performance = true,
        exceptions = true,
        dependencies = true,
        console = true
      },
    } = config;
    if (!key) throw new Error('No insights key has been provided!');
    appInsights
      .setup(key)
      .setInternalLogging(internalLogging)
      .setAutoCollectRequests(requests)
      .setAutoCollectPerformance(performance)
      .setAutoCollectExceptions(exceptions)
      .setAutoCollectDependencies(dependencies)
      .setAutoCollectConsole(console, console)
      .start();

    const { defaultClient } = appInsights;

    const configureClient = setupConfig(defaultClient);
    Object.keys(insightsConfig).forEach((key) => configureClient(key, insightsConfig[key]));

    const configureTag = setupTag(defaultClient);
    Object.keys(tags).forEach((key) => configureTag(key, tags[key]));

    return defaultClient;
  };

  return { start };
};