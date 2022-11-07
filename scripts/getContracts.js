const { AdminClient } = require('defender-admin-client');

async function run() {
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env;
  const client = new AdminClient({ apiKey, apiSecret });
  const contracts = await client.listContracts();
  const address = contracts.find(c=>c.network==="goerli" && c.name === "Stablecoin").address;
  console.log(address);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});