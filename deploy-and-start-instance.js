const { ZBClient } = require('zeebe-node')

void (async () => {
  const zbc = new ZBClient({
    camundaCloud: {
        clusterId: 'clusterId-clusterId-clusterId', // look up the cluster id in the connection information of the client credentials in Console app
        clientId: 'clientId-client-Id-clientId', // copy the client id from the client credential file
        clientSecret: 'secret-secret-secret', // copy the client secret from the client credential file
    }
	})

  // deploy the process
  const processes = ['./resources/hiring-process.bpmn'];
  const deploymentresult = await zbc.deployProcess(processes)

  console.log(deploymentresult)

  // start an instance of the process
  const result = await zbc.createProcessInstance('hiring-process', {
    candidate_name: 'John Doe',
  })
  console.log(result)

})()