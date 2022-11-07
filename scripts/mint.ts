import { ethers } from "hardhat";
import {abi} from "../artifacts/contracts/Stablecoin.sol/Stablecoin.json";
const ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"

async function run() {
  const [signer] = await ethers.getSigners();
  const contract = new ethers.Contract(ADDRESS, abi, signer);
  const tx = await contract.operatorMint(signer, 1, [], []);
  console.log( JSON.stringify({ tx },null,4));
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});