// import { strings } from "../Localization";

const staticValues = {
  //  SunrayLogoImage: require('../hh/logo.png'),
  extraScrollHeight: 100,
  enableOnAndroid: true,
  bounces: false,
  transitionConfig: 0,
  // network: "mainnet",
  network: "testnet",
  isProduction: 0,
  deviceToken: "Simulator",
  deviceTypeiOS: 0,
  deviceTypeAndroid: 1,
  btcTransactionFee: 0.00012,
  btcSantoshiMultiplier: 100000000,
  fiatRoundOff: 2,
  //appname: strings.thread.title,
  // secret: 'KeyperTag',
  secret: "43bc^i9r$2b$6a%z#@jr73$fd*8923b4", // Should be of 32 characters
  iv: "$%Dfgd%^^&*DFQE^EFR#R&*GADFR#@#R*(GR@^",
  gKey: "~eq8network@3$!@#$@",
  encryptionKeyword: "eq8network",
  connect: "connect",
  alphabetRegex: /^[a-zA-Z]*$/,
  numericRegex: /^\d*$/,
  spaceRegex: /^\S*$/,
  alphabetSpaceRegex: /^[a-zA-Z ]*$/,
  emailRegex:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  gasBuffer: 50000,
  other: "Other,Please specify",
  single: "single",
  text: "text",
  multiple: "multiple",
  infuraIPFSProjectID: "22GTL2haD1H7GuqNrG6mIpc9aze",
  infuraIPFSSecret: "540fe896bfd2f47c0225811b868dbb4b",
  appKillAlert:
    "Your transaction is in progress. Please do not press the back button or close the app.",
  completeKYC:
    "Please complete your profile details prior to proceeding with your EQ8 Identity verification (KYC)",
  // smartContractError: "OOPS!! Something went wrong. Please try again.\nIf the problem persists, please restart the app",
  smartContractError:
    "OOPS! There seems to be an issue with the blockchain node. Please try again after sometime.",
  getRandomString() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  },
};
export default staticValues;
