const appInsights = require('applicationinsights');

module.exports = () => {

  const setupSampling = (client) => (value) => {
    client.config.samplingPercentage = value;
  };

  const setupTag = (client) => ({ id, value }) => {
    client.context.tags[id] = value;
  };

  const start = async ({ config }) => {
    const { key, internalLogging, samplingPercentage, autoCollect: { requests, performance, exceptions, dependencies, console }, context: { tags } } = config;
    if (!key) throw new Error('No insights key has been provided!');
    const { defaultClient } = appInsights
      .setup(key)
      .setInternalLogging(!!internalLogging)
      .setAutoCollectRequests(!!requests)
      .setAutoCollectPerformance(!!performance)
      .setAutoCollectExceptions(!!exceptions)
      .setAutoCollectDependencies(!!dependencies)
      .setAutoCollectConsole(!!console, !!console)
      .start();

    if (samplingPercentage) setupSampling(defaultClient)(samplingPercentage);
    tags.forEach(setupTag(defaultClient));
    return defaultClient;
};

	return { start };
};