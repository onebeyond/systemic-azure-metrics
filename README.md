A [systemic](https://github.com/guidesmiths/systemic) component to use the azure metrics SDK.


Forked package of guidesmiths' [systemic-azure-metrics](https://github.com/guidesmiths/systemic-azure-metrics).

Added config flags:

- liveMetrics (`boolean`, default `false`): enable/disable the live metrics stream for insights: https://docs.microsoft.com/en-us/azure/azure-monitor/app/live-stream
- ignoreURI (`string[]`, default `['/__/manifest]'`) is an array of URIs to be ignored: telemetry won't be sent for that specific requesta
- traceW3C (`boolean`, default `false`): enable/disable correlation via W3C: https://docs.microsoft.com/en-us/azure/azure-monitor/app/correlation && https://w3c.github.io/trace-context/


**WARNING:**

Do not forget to disable appInsights in test mode as it can lead to wrong behaviours/broken tests

eg:

```
  metrics: {
    key: 'fakeTestKey',
    insightsConfig: {
      disableAppInsights: true
    }
  }
```