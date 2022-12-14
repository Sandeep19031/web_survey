


const API_MAIN = {
    // URL: 'https://ws-app.eq8.network/v1/', //Main
    URL: 'https://stage-api.eq8.network/v1/', //Test New Contract
    // URL: 'https://ws-stage.eq8.network/v1/',  //Stage
    IPFS_URL: 'https://ipfs.infura.io:5001/api/v0/'
}
const ApiBase = {
    GET_COUNTRY_CODES: API_MAIN.URL + 'get_country_code',
    SEND_OTP: API_MAIN.URL + 'sendotpV2',
    VERIFY_OTP: API_MAIN.URL + 'verifyotpV2',
    ONLY_SEND_OTP: API_MAIN.URL + 'verifyoldnumberV2',
    REGISTER: API_MAIN.URL + 'register',
    CHECK_DISPLAY_NAME: API_MAIN.URL + 'checkusername',
    LOGIN_URL: API_MAIN.URL + 'login',
    GET_ALL_COIN_LIST: API_MAIN.URL + 'getcoinlist',
    ACTIVATE_WALLET: API_MAIN.URL + 'activateinactivatewallet',
    GET_FIAT_LIST: API_MAIN.URL + 'getfiatcurrencylist',
    SET_FIAT_CURRENCY: API_MAIN.URL + 'setuserfiatcurrency',
    GET_MY_WALLETS: API_MAIN.URL + 'mywallet',
    BASE: API_MAIN.URL + 'static',
    API_BASEURL: API_MAIN.URL,
    // BASE: 'https://wlt-ws.platinumdex.com/api/v1/static',
    // API_BASEURL: 'https://wlt-ws.platinumdex.com/api/v1/',
    GET_DATA_ERC20: API_MAIN.URL + 'getrawdatastring',
    SET_DEFAULT_WALLET: API_MAIN.URL + 'setdefaultwallet',
    DELETE_WALLET: API_MAIN.URL + 'deletewallet',
    ADD_WALLET: API_MAIN.URL + 'addwallet',
    DAPP: API_MAIN.URL + 'dapp',
    CHANGE_NUMBER: API_MAIN.URL + 'changenumber',
    CHANGE_NUMBER: API_MAIN.URL + 'changenumber',
    ADDTOKEN: API_MAIN.URL + 'addtoken',
    GET_TRANSACTIONS: API_MAIN.URL + 'transactions',
    GET_TRANSACTION_DETAIL: API_MAIN.URL + 'transactiondetails',
    FORGOT_PIN: API_MAIN.URL + 'forgotpin',
    CONTACT_LIST: API_MAIN.URL + 'contactlist',
    CREATE_GROUP_CHANNEL: API_MAIN.URL + 'creategrouporchannel',
    ADD_GROUP_MEMBER: API_MAIN.URL + 'addmember',
    ADD_CHANNEL_MEMBER: API_MAIN.URL + 'joinchannel',
    CREATE_CHAT_THREAD: API_MAIN.URL + 'chatthread',
    CHANGE_MSG_STATUS: API_MAIN.URL + 'changemsgtxnstatus',
    // SOCKET_CONNECTION_URL: 'https://ws-app.eq8.network/wallet',
    SOCKET_CONNECTION_URL: 'https://ws-stage.eq8.network/wallet',
    CHAT_HISTORY: API_MAIN.URL + 'messages',
    CHAT_LIST: API_MAIN.URL + 'chatlist',
    GROUP_USER_LIST: API_MAIN.URL + 'groupchannelinfo',
    GROUP_REMOVE_MEMBER: API_MAIN.URL + 'removeMember',
    LEAVE_GROUP: API_MAIN.URL + 'leavegroupchannel',
    CLEAR_CHAT: API_MAIN.URL + 'clearchat',
    UPLOAD_CHAT_IMAGE: API_MAIN.URL + 'uploadchatimage',
    CHANGE_GROUP_NAME: API_MAIN.URL + 'changegroupchannelname',
    BLOCK_USER: API_MAIN.URL + 'block',
    UN_BLOCK_USER: API_MAIN.URL + 'unblock',
    BLOCK_LIST: API_MAIN.URL + 'blocklist',
    SEARCH_CHAT: API_MAIN.URL + 'search',
    UPDATE_TOKEN: API_MAIN.URL + 'updateuserdevicetoken',
    IS_BLOCKED_BY_OTHER: API_MAIN.URL + "isblocked",
    SEND_CO_SIGNER_REQUEST: API_MAIN.URL + "sendcosignerrequest",
    ACCEPT_DECLINE_COSIGNER: API_MAIN.URL + "acceptdeclinecosignerrequest",
    GET_COSIGNER_REQUESTS: API_MAIN.URL + "getcosignerrequests",
    ON_OFF_3FA: API_MAIN.URL + "onoff3fa",
    INVITE_AGAIN: API_MAIN.URL + "inviteagaincosigner",
    DELETE_REQ: API_MAIN.URL + "deletependingrequestcosigner",
    REMOVE_COSIGNER: API_MAIN.URL + "sendcosignerremoverequest",
    APPROVE_REMOVE_COSIGNER: API_MAIN.URL + "acceptdeclineremovecosignerrequest",
    SEND_BACKUP_REQ: API_MAIN.URL + "sendbackuprequestcosigner",
    BACKUP_REQ_ACCEPT_DECLINE: API_MAIN.URL + "bkRequestAcceptDecline",
    GET_BACKUP_DETAILS: API_MAIN.URL + "getbkbequestcosignerdetails",
    SET_WITHDRAW_LIMIT: API_MAIN.URL + "setwithdrawlimit",
    ACCEPT_DECLINE_SETLIMIT: API_MAIN.URL + "acceptdeclinewithdrawlimitrequest",
    ACCEPT_DECLINE_WITHDRAW: API_MAIN.URL + "acceptdeclinewithdrawrequest",
    ///api/v1/searchtoken
    VERIFY_ADDRESS: API_MAIN.URL + "verifywallet",
    SEARCH_TOKEN: API_MAIN.URL + "searchtoken",
    onOFF3FAAPPROVAL: API_MAIN.URL + "onoff3farequestacceptdecline",
    GET_NONCE: API_MAIN.URL + "eth/nonce",
    // ABOUT_US: 'https://wlt-ws.platinumdex.com/api/v1/static/page/getaboutus',
    ABOUT_US: 'https://platinum.wallet.staging-host.com/static/page/getaboutus',
    CHECK_TOKEN: "https://blockscout.com/eth/ropsten/api?module=token&action=getToken&contractaddress=",
    // CHECK_TOKEN: "https://blockscout.com/eth/mainnet/api?module=token&action=getToken&contractaddress="
    GET_INTEREST_LIST: API_MAIN.URL + 'interests',
    CHECK_EMAIL: API_MAIN.URL + 'checkemail',
    MOBILE_LOGIN: API_MAIN.URL + 'loginmobilecheckV2',
    EMAIL_LOGIN: API_MAIN.URL + 'emaillogin',
    GET_PROFILE: API_MAIN.URL + 'profile',
    IMAGE_UPLOAD: API_MAIN.URL + 'kyc/upload',
    PROFILE_PIC_URL: API_MAIN.URL + 'edit/photo',
    SUBMIT_KYC: API_MAIN.URL + 'kyc/save',
    EDIT_PROFILE: API_MAIN.URL + 'edit/profile',
    EDIT_INTERESTS: API_MAIN.URL + 'edit/interests',
    GET_BADGES_LIST: API_MAIN.URL + 'badges',
    GET_BADGE_QUESTIONS: API_MAIN.URL + 'surveys',
    GET_BADGE_SUBMITTED_QUESTIONS: API_MAIN.URL + 'answersForBadges',
    GET_GAS_FEE: API_MAIN.URL + 'gasfee',
    UPDATE_ANSWERS: API_MAIN.URL + 'answer',
    GET_GAS_PRICE: API_MAIN.URL + 'gasfee/polygon',
    CHANGE_PIN: API_MAIN.URL + 'changepin',
    GET_DATA_POLYGON: API_MAIN.URL + 'polygon/getrawdatastring',
    EMAIL_UPDATE_OTP: API_MAIN.URL + 'sendotpemailedit',
    GET_NOTIFICATIONS: API_MAIN.URL + 'notifications',
    DELETE_NOTIFICATIONS: API_MAIN.URL + 'notifications/delete',
    ADD_QUESTION: API_MAIN.URL + 'add-question',
    CHECK_DUPLICATE_QUESTION: API_MAIN.URL + 'check-duplicate',    
    CHECK_REFERRAL_CODE_EXISTS: API_MAIN.URL + 'verify-invite-code?invite_code=',
    GET_MY_QUESTIONS_LIST: API_MAIN.URL + 'questions',
    READ_ALL_NOTIFICATIONS: API_MAIN.URL + 'notifications/read',
    UNREAD_NOTIFICATIONS: API_MAIN.URL + 'notifications/unread',
    REPORT_DEFECT: API_MAIN.URL + 'report-defect',
    GET_SURVEYS_LIST: API_MAIN.URL + 'onlySurveys',
    GET_COMPLETED_SURVEYS: API_MAIN.URL + 'completed-surveys',
    GET_POLLS_LIST: API_MAIN.URL + 'polls',
    UPDATE_POLL_CLAIM_STATUS: API_MAIN.URL + 'update-reward-claim-status',
    GET_POLL_DETAIL: API_MAIN.URL + 'single-poll?badge_id=',
    GIVE_APPROVAL: API_MAIN.URL + 'approval',
    CHECK_APPROVAL: API_MAIN.URL + 'check-approval',
    IPFS_ADD: API_MAIN.IPFS_URL + 'add',
    CHANGE_EMAIL_NOTIFICATION_STATUS: API_MAIN.URL + 'edit/notification/status',
    REWARD_LIST: API_MAIN.URL + 'rewards-claim',
    REPORT_ERROR: API_MAIN.URL + 'errors',
    ADD_START_TIME: API_MAIN.URL + 'addStartTime',
}

export default ApiBase;