import { ethers } from "hardhat";
import { ZERO_ADDRESS, singletons } from "@openzeppelin/test-helpers";

async function main() {
  const [deployer] = await ethers.getSigners();
  const reg = await singletons.ERC1820Registry(deployer.address);
  console.log("Deploying contracts with the account:", deployer.address);
  const Stablecoin = await ethers.getContractFactory("Stablecoin");
  const stablecoin = await Stablecoin.deploy();
  await stablecoin.deployed();
  console.log(`Stablecoin deployed to ${stablecoin.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
