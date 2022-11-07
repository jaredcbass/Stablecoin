const { RelayClient } = require('defender-relay-client');

async function run() {
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env;
  const relayClient = new RelayClient({ apiKey, apiSecret });
  console.log(await relayClient.list());
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});