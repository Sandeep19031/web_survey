import React, { Component } from "react";
import constants from "./constant";
import constant from "./constant";

import ImageAssets from "../common/ImagesAssets";
// import { ethers } from "ethers";
import ApiStore from "../Stores/ApiStore";
// import ApiBase from "../../Stores/ApiBase";
// const { HDNode, providers, utils, Wallet } = ethers;
// import { Wallet as WalletUtils } from "./common/utils";
// import {
//   Recents as RecentsActions,
//   Transactions as TransactionActions,
// } from "./common/actions";

import Moment from "moment";
// const Web3 = require('web3');

import Web3 from "web3";
// const IPFS = require("ipfs-mini");
import { Biconomy } from "@biconomy/mexa";

// var CryptoJS = require("crypto-js");
import abiContract from "../Abi/BrainchainABI.json";
import pollABIContract from "../Abi/PollABI.json";
import userABIContract from "../Abi/UserABI.json";
import surveyABIContract from "../Abi/SurveyABI.json";
import quesABIContract from "../Abi/QuestionABI.json";
import nttAbiContract from "../Abi/NTTAbi.json";
import publicIP from "react-native-public-ip";

import { toBuffer } from "ethereumjs-util";
import EQ8ABi from "../Abi/EQ8ABI.json";
// import RNFS from "react-native-fs";

const RNFS = {};
let abi = require("ethereumjs-abi"); //dependencies

export default class Singleton {
  btcAddressGlobal = "";
  static myInstance = null;
  userNameForLocalisation = "";
  amountForLocalisation = "";
  addressForLocalisation = "";
  language = "";
  user_id = "";
  pin = "";
  countryCode = "";
  phoneNumber = "";
  otp = "";
  displayName = "";
  firstName = "";
  lastName = "";
  email = "";
  countryName = "";
  country_code_id = "";
  access_token =
    "JWT eyJhbGciOiJIUzI1NiJ9.MTQ.HGFG7pwhEFRprU3cCVhNZgjiuJ_AcFFYUrvdU0EPrxM";
  fiatSelected = "";
  fiatSelectedSymbol = "";
  gasPriceForTxn = 10000000000;
  gaslimitForTxn = 22000;
  showNavigationWhiteView = true;
  defaultEthAddress = "";
  defaultBtcAddress = "";
  isLogin = 0;
  fiatValues = {};
  socket = undefined;
  isSettingNFCPassword = false;
  canGoBack = false;

  web3 = new Web3(
    constants.network == "testnet"
      ? "https://ropsten.infura.io/v3/23082847678745519661409529cdb41a"
      : "https://mainnet.infura.io/v3/23082847678745519661409529cdb41a"
  );
  web3Eq8 = new Web3(
    constants.network == "testnet"
      ? "https://nd-232-440-635.p2pify.com/8acc69d74277bba61a8ac12f2011a7f1"
      : "https://nd-875-041-813.p2pify.com/96364b98061b2474c31c1a1a51cde952"
  );

  priceList = [];
  biconomy = undefined;
  web3Biconomy = undefined;
  contractAddress = undefined;
  nttContractAddress = undefined;
  eq8ContractAddress = undefined;
  contract = undefined;
  userContract = undefined;
  userContractAddress = undefined;
  pollContract = undefined;
  pollContractAddress = undefined;
  surveyContract = undefined;
  surveyContractAddres = undefined;
  quesContract = undefined;
  quesContractAddress = undefined;
  inviteCode = "";
  refererCode = "";
  referrerAddress = "0xAbFe96009c70C1fb1c28b1C2539cD230d83eE887";
  chainId = undefined;

  static getInstance() {
    if (Singleton.myInstance == null) {
      Singleton.myInstance = new Singleton();
      Moment.locale("en");
      //this.myInstance.socket = SocketIOClient(ApiBase.SOCKET_CONNECTION_URL);
      this.myInstance.biconomy = new Biconomy(
        new Web3.providers.HttpProvider(
          constants.network == "testnet"
            ? "https://nd-232-440-635.p2pify.com/8acc69d74277bba61a8ac12f2011a7f1"
            : "https://nd-875-041-813.p2pify.com/96364b98061b2474c31c1a1a51cde952"
        ),
        {
          apiKey:
            constant.network == "testnet"
              ? "1P92nKBA6.871777f5-91fa-4722-9549-5a8bd342fd82"
              : "4gdLn8oCa.7b7c5f40-9b10-400d-8bc9-e6213a75ffc3",
          debug: true,
        }
      );
      this.myInstance.biconomy
        .onEvent(this.myInstance.biconomy.READY, () => {
          console.log("Biconomy Ready");
          this.myInstance.contractAddress =
            constant.network == "testnet"
              ? "0x6537d27fFdAD95301255F681e5b80f220F2A06df"
              : "0x8A01e0e9caE839BbBa97B6Fb81B9F7EfbeC0c547";
          this.myInstance.nttContractAddress =
            constant.network == "testnet"
              ? "0x0c1ae26702fD46867D71a06746b41Be51671aACc"
              : "0x6BDE9275F478cCB7A2b9F699622F27bd4aB202f5";
          this.myInstance.eq8ContractAddress =
            constant.network == "testnet"
              ? "0xFC2cB2e8ec8cA2848651ef927542075C734187ef"
              : "";

          this.myInstance.userContractAddress =
            constant.network == "testnet"
              ? "0x3D0aAF0F0Ad029E2ec63373067c9f5C3dDB87fE3"
              : "0x3D0aAF0F0Ad029E2ec63373067c9f5C3dDB87fE3";
          this.myInstance.pollContractAddress =
            constant.network == "testnet"
              ? "0x256C7b29ffeA465B3a815b614BA213BC93b892a2"
              : "0x256C7b29ffeA465B3a815b614BA213BC93b892a2";
          this.myInstance.quesContractAddress =
            constant.network == "testnet"
              ? "0x119778f388C39cFB3409db1e588Da845De9C6325"
              : "0x119778f388C39cFB3409db1e588Da845De9C6325";
          this.myInstance.surveyContractAddres =
            constant.network == "testnet"
              ? "0xc0132e5bF67C91882658f6B31F61F6D2102af9b4"
              : "0xc0132e5bF67C91882658f6B31F61F6D2102af9b4";
          this.myInstance.chainId = constant.network == "testnet" ? 80001 : 137;
          this.myInstance.web3Biconomy = new Web3(this.myInstance.biconomy);
          this.myInstance.contract =
            new this.myInstance.web3Biconomy.eth.Contract(
              abiContract,
              this.myInstance.contractAddress
            );
          this.myInstance.userContract =
            new this.myInstance.web3Biconomy.eth.Contract(
              userABIContract,
              this.myInstance.userContractAddress
            );
          this.myInstance.pollContract =
            new this.myInstance.web3Biconomy.eth.Contract(
              pollABIContract,
              this.myInstance.pollContractAddress
            );
          this.myInstance.surveyContract =
            new this.myInstance.web3Biconomy.eth.Contract(
              surveyABIContract,
              this.myInstance.surveyContractAddres
            );
          this.myInstance.quesContract =
            new this.myInstance.web3Biconomy.eth.Contract(
              quesABIContract,
              this.myInstance.quesContractAddress
            );
        })
        .onEvent(this.myInstance.biconomy.ERROR, (error, message) => {
          // Handle error while initializing mexa
          console.log("Biconomy Error", message);
        });
    }
    return this.myInstance;
  }

  saveData(key, value) {
    console.log("save data key ########");
    console.log(key);
    console.log("save data value ########");
    console.log(value);
    console.log("save data");
    return new Promise((resolve, reject) => {
      localStorage.setItem(key, value);

      resolve("succ");
    });
  }
  getData(key) {
    console.log("get key ########");
    console.log(key);
    console.log("get key ########");
    return new Promise((resolve, reject) => {
      const response = localStorage.getItem(key);

      resolve(response);
    });
  }
  downloadIPFSFile(url, path) {
    return new Promise((resolve, reject) => {
      const filepath = `${RNFS.DocumentDirectoryPath}/${path}`;
      RNFS.exists(filepath).then((exists) => {
        if (exists) {
          console.log("-----------LocalPath-------------");
          setTimeout(() => {
            resolve(filepath);
          }, 100);
        } else {
          RNFS.downloadFile({
            fromUrl: url,
            toFile: filepath,
          })
            .promise.then((r) => {
              console.log("-----------LocalPath-------------", r);
              resolve(filepath);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  }
  deleteLocalFile(url, path) {
    return new Promise((resolve, reject) => {
      const filepath = `${RNFS.DocumentDirectoryPath}/${path}`;
      RNFS.exists(filepath).then((exists) => {
        if (exists) {
          RNFS.unlink(filepath)
            .then((unlinked) => {
              RNFS.downloadFile({
                fromUrl: url,
                toFile: filepath,
              })
                .promise.then((r) => {
                  console.log("-----------LocalPath-------------", r);
                  resolve(filepath);
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          RNFS.downloadFile({
            fromUrl: url,
            toFile: filepath,
          })
            .promise.then((r) => {
              console.log("-----------LocalPath-------------", r);
              resolve(filepath);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  }
  submitAnswer(answerURI, questionIds, surveyId, answerObjArray) {
    return new Promise((resolve, reject) => {
      const userAddress = this.defaultEthAddress;
      if (userAddress) {
        console.log(
          "--------params------3962",
          surveyId,
          questionIds,
          answerURI
        );
        let functionSignature = this.surveyContract.methods
          .responseInBatch(surveyId, questionIds, answerURI, "success")
          .encodeABI();
        console.log("functionSignature 3966", functionSignature);
        this.pushBiconomySurvayTxn(functionSignature, userAddress, "0x0")
          .then((res) => {
            console.log("Trans Pushed now update database");
            publicIP()
              .then((ip) => {
                let params = {
                  answersArray: JSON.stringify(answerObjArray),
                  ipAddress: ip,
                  // mainAnswerHash : answerURI
                };
                console.log(
                  "-----------params answer submission-------",
                  answerObjArray
                );
                ApiStore.getInstance()
                  .updateAnswers(params)
                  .then((res) => {
                    resolve(res);
                    console.log("Transaction hash is ", "txHash"); //edited
                  })
                  .catch((err) => {
                    reject(err);
                  });
              })
              .catch((err) => console.log("Error in IP ", err));
          })
          .catch((err) => {
            console.log("Contract Error 1363", err);
            let ob = {
              screen: "SingletonClass",
              function: "pushBiconomySurvayTxn",
              line_no: "3714",
              error: err,
            };
            let params = {
              message: `${JSON.stringify(ob)}`,
            };
            this.reportContractError(params);
            reject({ message: constants.smartContractError });
            // reject({ message: err })
          });
      }
    });
  }
  pushBiconomySurvayTxn = (functionSignature, userAddress, value) => {
    return new Promise((resolve, reject) => {
      console.log("----------value----------", value);
      this.surveyContract.methods
        .getNonce(userAddress)
        .call()
        .then((nonce) => {
          let messageToSign = this.constructMetaTransactionMessage(
            nonce,
            this.chainId,
            functionSignature,
            this.surveyContractAddres
          );
          this.getData(`${userAddress}_pk`).then((pvtKey) => {
            const { signature } = this.web3Biconomy.eth.accounts.sign(
              "0x" + messageToSign.toString("hex"),
              pvtKey
            );
            let { r, s, v } = this.getSignatureParameters(signature);
            let executeMetaTransactionData = this.surveyContract.methods
              .executeMetaTransaction(userAddress, functionSignature, r, s, v)
              .encodeABI();
            this.web3Biconomy.eth.getGasPrice().then((gasPrice) => {
              this.surveyContract.methods
                .executeMetaTransaction(userAddress, functionSignature, r, s, v)
                .estimateGas({ from: userAddress })
                .then((gasEstimate) => {
                  console.log(
                    "--------------gasEstimate----------",
                    gasEstimate
                  );
                  let txParams = {
                    from: userAddress,
                    to: this.surveyContractAddres,
                    value: "0x0",
                    gasLimit: gasEstimate + constants.gasBuffer,
                    gasPrice: gasPrice,
                    data: executeMetaTransactionData,
                  };
                  this.web3Biconomy.eth.accounts
                    .signTransaction(txParams, pvtKey)
                    .then((signedTxn) => {
                      console.log(
                        "------------register signedTxn----------",
                        signedTxn
                      );
                      this.web3Biconomy.eth.sendSignedTransaction(
                        signedTxn.rawTransaction,
                        (error, txHash) => {
                          if (error) {
                            reject(error);
                            return console.error(error);
                          }
                          resolve(txHash);
                          console.log("Transaction hash is ", txHash);
                        }
                      );
                    });
                })
                .catch((err) => {
                  reject(err);
                });
            });
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  constructMetaTransactionMessage(
    nonce,
    chainId,
    functionSignature,
    contractAddress
  ) {
    return abi.soliditySHA3(
      ["uint256", "address", "uint256", "bytes"],
      [nonce, contractAddress, chainId, toBuffer(functionSignature)]
    );
  }
  getSignatureParameters(signature) {
    if (!this.web3Biconomy.utils.isHexStrict(signature)) {
      throw new Error(
        'Given value "'.concat(signature, '" is not a valid hex string.')
      );
    }
    var r = signature.slice(0, 66);
    var s = "0x".concat(signature.slice(66, 130));
    var v = "0x".concat(signature.slice(130, 132));
    v = this.web3Biconomy.utils.hexToNumber(v);
    if (![27, 28].includes(v)) v += 27;
    return {
      r: r,
      s: s,
      v: v,
    };
  }
}
