import { api } from "../api"
import Cookies from "js-cookie"

import { SignUpParams, SignInParams } from "../../interfaces"

export const signUp = (params: SignUpParams) => {
  const url = 'auth';

  return api.post(url, params)
}

export const signIn = (params: SignInParams)  => {
  const url = 'auth/sign_in';

  return api.post(url, params)
}

export const signOut = () => {
  const url = 'auth/sign_out';

  return api.delete(url, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }}) 
}

export const getUser = () => {
  const url = 'auth/validate_token';

  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return api.get(url, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}