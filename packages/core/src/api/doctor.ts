import { IDoctor } from "../../../../@types";
import { BASE_URL } from "../utils/values";

export async function fetchDoctorByPhone(phone: string): Promise<IDoctor> {
  const res = await fetch(`${BASE_URL}/doctor/${phone}`);
  if (res.ok) {
    return (await res.json()).doctor;
  }
  throw new Error(await res.text());
}
