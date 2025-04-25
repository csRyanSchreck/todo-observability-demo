const { NodeSDK } = require("@opentelemetry/sdk-node");
const { resourceFromAttributes } = require("@opentelemetry/resources");
const { ATTR_SERVICE_NAME } = require("@opentelemetry/semantic-conventions");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-grpc");
const { PeriodicExportingMetricReader, ConsoleMetricExporter } = require("@opentelemetry/sdk-metrics");

const sdk = new NodeSDK({
  resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: "todo-service" }),
  traceExporter: new OTLPTraceExporter({ url: "http://localhost:4317" }),
  metricReader: new PeriodicExportingMetricReader({ exporter: new ConsoleMetricExporter() }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();