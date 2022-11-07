import { DefenderRelayProvider, DefenderRelaySigner } from "defender-relay-client/lib/ethers";
import { ethers } from "hardhat";

async function main() { 
  await import("dotenv/config");
  const credentials = {apiKey: process.env.RELAYER_KEY, apiSecret: process.env.RELAYER_SECRET};
  const provider = new DefenderRelayProvider(credentials);
  const relaySigner = new DefenderRelaySigner(credentials, provider);//, { speed: 'fast' });
  const Stablecoin = await ethers.getContractFactory("Stablecoin");
  const stablecoin = await Stablecoin.connect(relaySigner).deploy().then(c => c.deployed());
  console.log(`Stablecoin deployed to ${stablecoin.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
