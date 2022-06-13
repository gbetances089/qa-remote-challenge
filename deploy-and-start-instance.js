const prompt = require("prompt-sync")({ sigint: true });
const urlUserData = "https://random-data-api.com/api/users/random_user";
const { ZBClient } = require("zeebe-node");
let counter = 0;

// function that returns a parsed json with fake user data
async function generateUserData() {
  const axios = require("axios");
  try {
    return await axios.get(urlUserData).then((response) => response.data);
  } catch (error) {
    console.log(error);
    throw {};
  }
}

function createInstance() {
  void (async () => {
    const zbc = new ZBClient({
      camundaCloud: {
        clusterId: "71bc9c9f-eeb5-4df6-bbc6-429caba895ce",
        clientId: "3l~QZXvY-6N~~oFSDhMO8-duMVXPnFIx",
        clientSecret:
          "0EiBydZhAdVm-nD8vOwO.ODTzpuYhxEMapT5mXmCMT95WWZ0iQP37dS-x3oN~a-T",
      },
    });

    // deploy the process
    const processes = ["./resources/hiring-process.bpmn"];
    const deploymentresult = await zbc.deployProcess(processes);

    console.log(deploymentresult);

    // start an instance of the process
    const userData = await generateUserData();
    const result = await zbc.createProcessInstance("hiring-process", {
      candidate_name: userData.first_name,
      candidate_last_name: userData.last_name,
      candidate_age: Math.floor(Math.random() * 65),
      candidate_email: userData.email,
      candidate_gender: userData.gender,
      candidate_phone_number: userData.phone_number,
      candidate_social_insurance_number: Number(
        userData.social_insurance_number
      ),
      candidate_date_of_birth: userData.date_of_birth,
      candidate_employment_key_skill: userData.employment.key_skill,
    });
    console.log(result);
  })();
}

const num = prompt("Enter the number of instances desired: ");
inputNumber = Number(num);
while (counter < inputNumber) {
  createInstance();
  counter += 1;
}
