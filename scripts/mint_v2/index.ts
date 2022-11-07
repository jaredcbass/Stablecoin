// Import dependencies available in the autotask environment
import { RelayerParams } from 'defender-relay-client/lib/relayer';
import { DefenderRelaySigner, DefenderRelayProvider } from 'defender-relay-client/lib/ethers';
import { ethers } from 'ethers';
import { AutotaskEvent } from 'defender-autotask-utils';
import {abi} from "../artifacts/contracts/Stablecoin.sol/Stablecoin.json";

export async function handler(event: AutotaskEvent) {
  const relayerParams = event as RelayerParams;
  const provider = new DefenderRelayProvider(relayerParams);
  const signer = new DefenderRelaySigner(relayerParams, provider, { speed: 'fast' });
  const ADDRESS = event.secrets?.StablecoinContractAddress || '0x2B1f7727Ad73184C0e9750EF7c03ed0A1282bE36';
  const contract = new ethers.Contract(ADDRESS, abi, signer);
  const {account = ADDRESS, amount = 0, userData = [], operatorData = []} = {...event.request?.body};
  const tx = await contract.operatorMint(account, amount, userData, operatorData);
  return {tx};
}