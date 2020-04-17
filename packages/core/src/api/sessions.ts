import { BASE_URL } from "../utils/values";
import { ISession, ISessionDetails } from "../../../../@types";

export async function postSession(
  accessToken: string | undefined,
  patientId: string,
  doctorId: string,
  date: Date
): Promise<ISession> {
  const res = await fetch(`${BASE_URL}/sessions/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ patientId, doctorId, date: date.toISOString() }),
  });
  if (res.ok) {
    return (await res.json()).session;
  }
  throw new Error((await res.json()).message);
}

export async function getDoctorSessions(accessToken: string | undefined, doctorId: string): Promise<Array<ISession>> {
  //console.log("getting sessions", doctorId);
  const res = await fetch(`${BASE_URL}/sessions/doctor/${doctorId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return (await res.json()).sessions;
  }
  throw new Error((await res.json()).message);
}

export async function getSessionDetails(accessToken: string | undefined, sessionId: string): Promise<ISessionDetails> {
  const res = await fetch(`${BASE_URL}/sessions/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return (await res.json()).session;
  }
  throw new Error((await res.json()).message);
}
