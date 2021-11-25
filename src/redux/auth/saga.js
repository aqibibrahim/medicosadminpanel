import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { auth as firebaseAuth } from "helpers/Firebase";
import { adminRoot, UserRole } from "constants/defaultValues";
import { setCurrentUser } from "helpers/Utils";
import axios from "axios";
// import { useHistory } from 'react-router-dom';
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, FORGOT_PASSWORD, RESET_PASSWORD } from "../actions";

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from "./actions";

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) => {
  return await axios
    .post("/admin-auth/login", {
      email,
      password,
    })
    .then((resp) => resp.data.data)
    .catch(
      (error) =>
        error.response?.message ?? {
          status: "error",
          code: 400,
          message: "Some error",
          data: [],
        }
    );
};
function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      const item = {
        uid: loginUser.email,
        id: loginUser.email,
        email: loginUser.email,
        token: loginUser.token,
        title: loginUser.name,
        img: "/assets/img/profiles/l-1.jpg",
        date: "Last seen today 15:24",
        role: UserRole.Admin,
      };
      setCurrentUser(item);
      yield put(loginUserSuccess(item));
      axios.defaults.headers.common["x-access-token"] = loginUser.token;
      history.push(adminRoot);
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password, fullname) => {
  // return await firebaseAuth
  //   .createUserWithEmailAndPassword(email, password)
  //   .then((user) => user)
  //   .catch((error) => error);

  return await axios
    .post("/admin-auth/register", {
      email,
      password,
      name: fullname,
    })
    .then((resp) => resp.data.data)
    .catch((error) => {
      console.log(error.response);
      return (
        error.response?.message ?? {
          status: "error",
          code: 400,
          message: "Some error",
          data: [],
        }
      );
    });
};

function* registerWithEmailPassword({ payload }) {
  const { email, password, fullname } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(registerWithEmailPasswordAsync, email, password, fullname);
    console.log("registerUser", registerUser);
    if (!registerUser.message) {
      console.log("sucess");
      // const item = { uid: registerUser.user.uid, ...currentUser };
      // setCurrentUser(item);
      // yield put(registerUserSuccess(item));
      history.push("user/login");
    } else {
      console.log("error");
      yield put(registerUserError(registerUser.message[0]));
    }
  } catch (error) {
    console.log("cathc");
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await firebaseAuth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  return await firebaseAuth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess("success"));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  return await firebaseAuth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(resetPasswordAsync, resetPasswordCode, newPassword);
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess("success"));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
