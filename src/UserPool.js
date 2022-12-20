import {CognitoUserPool} from 'amazon-cognito-identity-js';

const poolData ={
    UserPoolId: "ap-northeast-1_G5n3eI8NW",
    ClientId: "4p71sbbbr1kuej0nr44qrvmbjg"
}

export default new CognitoUserPool(poolData);