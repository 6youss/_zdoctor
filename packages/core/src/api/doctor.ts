import { IDoctor } from "../../../../@types";
import { BASE_URL } from "../utils/values";

export async function fetchDoctorByPhone(phone: string): Promise<IDoctor> {
  const res = await fetch(`${BASE_URL}/doctor/${phone}`);
  if (res.ok) {
    return (await res.json()).doctor;
  }
  throw new Error(await res.text());
}

export async function patchDoctor(
  accessToken: string | undefined,
  id: string,
  body: Partial<IDoctor>
): Promise<IDoctor> {
  const res = await fetch(`${BASE_URL}/doctor/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    return (await res.json()).doctor;
  }
  throw new Error(await res.text());
}
