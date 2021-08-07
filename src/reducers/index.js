import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import errorReducer from './errorReducer'
import { encryptTransform } from 'redux-persist-transform-encrypt';
import session from "redux-persist/lib/storage/session";
// const rootPersistConfig = {
//     key: "root",
//     storage,
//     whitelist: ["auth"],
// };

const encryptor = encryptTransform({
    secretKey: 'myKey',
    onError: function (error) {
        console.log(error)
    }
})

const authPersistConfig = {
    key: 'auth',
    storage: session,
    transforms: [encryptor],
    blacklist: ['auth']

  }

const appReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    errors: errorReducer,
});

export default appReducer;
