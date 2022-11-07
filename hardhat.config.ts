import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "tsconfig-paths/register";
import "dotenv/config";
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "${env:ETHERSCAN_KEY}"
  }
};

export default config;
