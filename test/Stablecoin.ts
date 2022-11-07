import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ZERO_ADDRESS, singletons } from "@openzeppelin/test-helpers";

describe("Stablecoin", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployStablecoin() {
    const [deployer] = await ethers.getSigners();
    const reg = await singletons.ERC1820Registry(deployer.address);
    const Stablecoin = await ethers.getContractFactory("Stablecoin");
    const stablecoin = await Stablecoin.connect(deployer).deploy({gasPrice:1000000000000000}).then(c => c.deployed());

    return { deployer, stablecoin };
  }

  describe("Deployment", function () {
    it("Should deploy", async function(){
      await loadFixture(deployStablecoin);
    });
    // it("Should set the right admin", async function () {
    //   const { stablecoin, deployer } = await loadFixture(deployStablecoin);
    //   expect(stablecoin);
    // });    
    // it("Should set the right admin", async function () {
    //   const { stablecoin, deployer } = await loadFixture(deployStablecoin);
    //   const adminRole = await stablecoin.DEFAULT_ADMIN_ROLE()
    //   expect(await stablecoin.getRoleAdmin(adminRole)).to.equal(deployer.address);
    // });
    // it("Should have right inital total supply", async function () {
    //   const { stablecoin, deployer } = await loadFixture(deployStablecoin);
    //   expect(await stablecoin.connect(deployer).totalSupply()).to.equal(0);
    // });
    // it("Should have right symbol", async function () {
    //   const { stablecoin, deployer } = await loadFixture(deployStablecoin);
    //   expect(await stablecoin.connect(deployer).symbol()).to.equal("BUS");
    // }); 
  });
});
