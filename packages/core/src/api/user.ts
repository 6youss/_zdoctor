import { BASE_URL } from "../utils/values";
import { IUser, IUserProfile } from "../../../../@types";
import { SignupBody } from "../screens/Signup/schemas";

export async function postLogin(username: string, password: string): Promise<IUser> {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (res.ok) {
    return await res.json();
  }
  throw new Error((await res.json()).message);
}

export async function postSignup(body: SignupBody): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    return await res.json();
  }

  throw new Error((await res.json()).message);
}

export async function getUser(accessToken: string | undefined): Promise<IUserProfile> {
  const res = await fetch(`${BASE_URL}/user/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.ok) {
    return await res.json();
  }
  throw new Error((await res.json()).message);
}

export async function postDevice(accessToken: string | undefined, fcmToken: string, platform: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/devices/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ fcmToken, platform }),
  });
  if (res.ok) {
    return await res.json();
  }

  throw new Error((await res.json()).message);
}
