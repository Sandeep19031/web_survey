import { View, Text, Alert, Platform } from "react-native";
import ApiBase from "./ApiBase";

import React, { Component } from "react";
import constants from "../common/constant";
import Singleton from "../common/Singleton";

// import RNFetchBlob from "rn-fetch-blob";
var CryptoJS = require("crypto-js");

export default class ApiStore {
  static myInstance = null;

  static getInstance() {
    if (ApiStore.myInstance == null) {
      ApiStore.myInstance = new ApiStore();
    }
    return this.myInstance;
  }

  addStartTime(badge_id) {
    return new Promise((resolve, reject) => {
      this.callPostApi(ApiBase.ADD_START_TIME, {
        badge_id: badge_id,
      })
        .then((responseData) => {
          if (responseData.status == true) {
            return resolve(responseData.data);
          } else {
            var resErr = responseData.error;
            console.log("err" + resErr);
            // alert(resErr)
            return reject(responseData.message);
          }
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
  getQuestions(badge_id) {
    console.log("url", ApiBase.GET_BADGE_QUESTIONS + "?badge_id=" + badge_id);
    console.log("user token", Singleton.getInstance().access_token);
    return new Promise((resolve, reject) => {
      fetch(ApiBase.GET_BADGE_QUESTIONS + "?badge_id=" + badge_id, {
        method: "GET",
        headers: {
          authorization: Singleton.getInstance().access_token,
          "x-api-key": "g80gookcos4owoco00kgcksgw4cgsos8s448gksg",
          "content-type": "application/x-www-form-urlencoded",
          version: "1.0",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          let response = responseJson;
          console.log("-------------QuestionList---------", response);

          resolve(responseJson.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }
  saveDataToIPFS(data) {
    return new Promise((resolve, reject) => {
      var key = CryptoJS.enc.Hex.parse(constants.secret);
      var iv = CryptoJS.enc.Hex.parse(constants.iv);
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
        iv: iv,
      }).toString();
      console.log(ciphertext);

      let dataPayload =
        typeof ciphertext === "object" && ciphertext.isBuffer
          ? ciphertext.toString("binary")
          : ciphertext;
      let boundary = this.createBoundary(dataPayload);
      let payload = `--${boundary}\r\nContent-Disposition: form-data; name="path"\r\nContent-Type: application/octet-stream\r\n\r\n${dataPayload}\r\n--${boundary}--`;

      fetch(ApiBase.IPFS_ADD, {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              constants.infuraIPFSProjectID + ":" + constants.infuraIPFSSecret
            ).toString("base64"),
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
          version: "1.0",
        },
        body: payload,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("response " + response.Hash);
          resolve(response.Hash);
        })
        .catch((err) => {
          console.log("err " + err);
          reject(err);
        });
    });
  }
  createBoundary(data) {
    while (true) {
      var boundary = `----IPFSMini${Math.random() * 100000}.${
        Math.random() * 100000
      }`;
      if (data.indexOf(boundary) === -1) {
        return boundary;
      }
    }
  }

  updateAnswers(params) {
    return new Promise((resolve, reject) => {
      this.callPostApi(ApiBase.UPDATE_ANSWERS, params)
        .then((res) => {
          if (!res.status) {
            reject(res);
          } else {
            resolve(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  callPostApi(urlStr, params, isNotEncoded) {
    console.log(urlStr);
    console.log(params);
    console.log("Access Token", Singleton.getInstance().access_token);

    return new Promise((resolve, reject) => {
      fetch(urlStr, {
        method: "POST",
        headers: {
          authorization: Singleton.getInstance().access_token,
          "x-api-key": "g80gookcos4owoco00kgcksgw4cgsos8s448gksg",
          "content-type": "application/x-www-form-urlencoded",
          version: "1.0",
        },
        //body: JSON.stringify(params)
        body: this.getEncodedData(params),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((responseData) => {
          let result = JSON.stringify(responseData);
          console.log("responsedata" + result);
          return resolve(responseData);
        })
        .catch((error) => {
          return reject(error);
          console.error("err" + error);
          // Alert.alert('Alert Title failure' + JSON.stringify(error))
        });
    });
  }
  getEncodedData = (parms) => {
    var formBody = [];
    for (var property in parms) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(parms[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(formBody);
    return formBody;
  };
}
