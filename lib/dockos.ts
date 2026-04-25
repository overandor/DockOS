import { computeJobs, spaces } from "./mock-data";
import { BookingRequest, ComputeNode, ComputeSession, MicroBooking, SpaceUnit } from "./types";

const API_URL = process.env.NEXT_PUBLIC_DOCKOS_API_URL;

async function maybeFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!API_URL) return null;
  const res = await fetch(`${API_URL}${path}`, { ...init, headers: { "Content-Type": "application/json", ...(init?.headers || {}) }, cache: "no-store" });
  if (!res.ok) throw new Error(`DockOS API error ${res.status}`);
  return res.json();
}

export async function getSpaces(): Promise<SpaceUnit[]> {
  return (await maybeFetch<SpaceUnit[]>("/spaces")) ?? spaces;
}

export async function getExploreResults(): Promise<SpaceUnit[]> {
  return (await maybeFetch<SpaceUnit[]>("/explore")) ?? spaces;
}

export async function getSpace(id: string): Promise<SpaceUnit | undefined> {
  const remote = await maybeFetch<SpaceUnit>(`/spaces/${id}`);
  return remote ?? spaces.find((space) => space.id === id);
}

export async function createBookingRequest(input: Omit<BookingRequest, "id" | "status">): Promise<BookingRequest> {
  const remote = await maybeFetch<BookingRequest>("/booking-requests", { method: "POST", body: JSON.stringify(input) });
  return remote ?? { ...input, id: `br-${Date.now()}`, status: "pending" };
}

export async function checkIn(bookingId: string): Promise<MicroBooking> {
  const remote = await maybeFetch<MicroBooking>(`/bookings/${bookingId}/check-in`, { method: "POST" });
  return remote ?? { id: bookingId, bookingRequestId: bookingId, minutesBooked: 60, checkInAt: new Date().toISOString(), status: "active" };
}

export async function checkOut(bookingId: string): Promise<MicroBooking> {
  const remote = await maybeFetch<MicroBooking>(`/bookings/${bookingId}/check-out`, { method: "POST" });
  return remote ?? { id: bookingId, bookingRequestId: bookingId, minutesBooked: 60, checkOutAt: new Date().toISOString(), status: "completed" };
}

export async function getComputeJobs() {
  return (await maybeFetch<typeof computeJobs>("/compute/jobs")) ?? computeJobs;
}

export async function registerComputeNode(node: Omit<ComputeNode, "id" | "status">): Promise<ComputeNode> {
  const remote = await maybeFetch<ComputeNode>("/compute/nodes", { method: "POST", body: JSON.stringify(node) });
  return remote ?? { ...node, id: `node-${Date.now()}`, status: "idle" };
}

export async function startComputeSession(nodeId: string, jobId: string): Promise<ComputeSession> {
  const remote = await maybeFetch<ComputeSession>(`/compute/nodes/${nodeId}/start`, { method: "POST", body: JSON.stringify({ jobId }) });
  return remote ?? { id: `cs-${Date.now()}`, nodeId, jobId, startedAt: new Date().toISOString(), status: "active" };
}

export async function stopComputeSession(sessionId: string): Promise<ComputeSession> {
  const remote = await maybeFetch<ComputeSession>(`/compute/sessions/${sessionId}/stop`, { method: "POST" });
  return remote ?? { id: sessionId, nodeId: "node-local", jobId: "j1", startedAt: new Date().toISOString(), status: "stopped" };
}
