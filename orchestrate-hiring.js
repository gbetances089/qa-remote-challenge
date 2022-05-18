const { ZBClient } = require('zeebe-node')

void (async () => {
  const zbc = new ZBClient({
    camundaCloud: {
      clusterId: 'clusterId-clusterId-clusterId', // look up the cluster id in the connection information of the client credentials in Console app
      clientId: 'clientId-client-Id-clientId', // copy the client id from the client credential file
      clientSecret: 'secret-secret-secret', // copy the client secret from the client credential file
  }
	})

  zbc.createWorker({
    taskType: 'hiring',
    taskHandler: (job, _, worker) => {
      const { candidate_name } = job.variables
      worker.log(`Received a new application from: ${candidate_name}`)
      job.complete()
    }
  })
 
})()