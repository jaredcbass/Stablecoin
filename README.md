# Stablecoin

```shell
npm install
npx hardhat compile
```

In a new terminal window
```shell
npx hardhat node
```

In the original terminal window
```shell
npx hardhat run scripts/deploy.ts --network localhost
```

You will see contracts deployed on the local test network in the other terminal window

Create .env files in project root and defender direcotry with api key from Defender
```shell
API_KEY=<api key>
API_SECRET=<api secret>
```

If you changed the contract, replace the value of ABI in defender/autotasks/mint/index.js with the value of abi in artifacts/contracts/Stablecoin.sol/Stablecoin.json

Deploy Defender Serverless resources to create a relay and autotask
```shell
cd defender
serverless deploy
cd ..
```

Add funds to your relayer using a goerli faucet

Add relayer key and secret from defender into .env of project root
```shell
RELAYER_KEY=<relayer key>
RELAYER_SECRET=<relayer secret>
```

Deploy contract to goerli through defender relay just created 
```shell
npx hardhat run scripts/deploy.goerli.ts
```
This may take a while.  

Replace the value of ADDRESS in defender/autotasks/mint/index.js with the deployed contract address from defender and etherscan.

Optionally you can add the contract to Defender Admin through the web ui or as a resource in defender/serverless.yml 
Optionally you can update default values for address and amount of the mint autotask in defender/autotasks/mint/index.js so that you can test with a manual run

Update Defender resources with serverless
```shell
cd defender
serverless deploy
cd ..
```

Use the defender webui to start a manual run of the auto task or POST a json object with the parameters for operatorMint to the webhook url for the task.