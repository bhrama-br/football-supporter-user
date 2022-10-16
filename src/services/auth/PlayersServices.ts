import { api } from "../api"
import Cookies from "js-cookie"

export const getPlayers = (body = {}) => {
  const url = 'user/players'
  return api.get(url, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }, params: body})
}


export const getDashboard = (body = {}) => {
  const url = 'user/dashboard'
  return api.get(url, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }, params: body})
}


export const getPlayer = (id: number) => {
  const url = `user/players/${id}`
  return api.get(url, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}

export const postSubscriber = (id: number) => {
  const url = `user/players/${id}/subscribe`
  return api.post(url, {}, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}

export const postUnsubscriber = (id: number) => {
  const url = `user/players/${id}/unsubscribe`
  return api.post(url, {}, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}
