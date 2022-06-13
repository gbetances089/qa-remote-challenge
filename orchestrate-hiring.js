const { ZBClient } = require("zeebe-node");

void (async () => {
  const zbc = new ZBClient({
    camundaCloud: {
      clusterId: "71bc9c9f-eeb5-4df6-bbc6-429caba895ce",
      clientId: "3l~QZXvY-6N~~oFSDhMO8-duMVXPnFIx",
      clientSecret:
        "0EiBydZhAdVm-nD8vOwO.ODTzpuYhxEMapT5mXmCMT95WWZ0iQP37dS-x3oN~a-T",
    },
  });

  zbc.createWorker({
    taskType: "hiring",
    taskHandler: (job, _, worker) => {
      const { candidate_name } = job.variables;
      worker.log(`Received a new application from: ${candidate_name}`);
      job.complete();
    },
  });
})();
