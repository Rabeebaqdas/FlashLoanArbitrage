// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { json } = require("hardhat/internal/core/params/argumentTypes");

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

//Main Router Address
// let router_Address = '0x10ED43C718714eb63d5aA57B78B54704E256024E'

//Testnet Router Address
let poolAddressProvider = "0xC911B590248d127aD18546B186cC6B324e99F02c"
let DaiAddress = "0xba8dced3512925e52fe67b1b5329187589072a55"
let USDCAddress = "0x65afadd39029741b3b8f0756952c74678c9cec93"
async function main() {
 // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  const [deployer,per1,per2] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());


  // const FlashLoan = await ethers.getContractFactory("FlashLoan");
  // const flashLoan = await FlashLoan.deploy(poolAddressProvider);
  // await flashLoan.deployed();
  // console.log("Flash Loan Contract Address : ", flashLoan.address);

  
  const DEX = await ethers.getContractFactory("Dex");
  const dex = await DEX.deploy(DaiAddress, USDCAddress);
  await dex.deployed();
  console.log("DEX Contract Address : ", dex.address);

    
  const FlashLoanArbitrage = await ethers.getContractFactory("FlashLoanArbitrage");
  const arbitrage = await FlashLoanArbitrage.deploy(poolAddressProvider, DaiAddress, USDCAddress, dex.address);
  await arbitrage.deployed();
  console.log("FlashLoanArbitrage Contract Address : ", arbitrage.address);


}




main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  
  
  // npx hardhat run scripts/maindeploy.js --network goerli


//Flash Loan Contract Address :  0xbF83619D9451c9C483D1bf86CFE0fF8886F50379
// DEX Contract Address :  0x9F8Adfe1dD48F69e47fF42d1EDD16A96DCDC057d
//FlashLoanArbitrage Contract Address :  0x867Ac656025440b905d9a198ec334D3003A4AEc4