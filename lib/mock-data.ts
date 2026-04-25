import { ComputeJob, SpaceUnit, User } from "./types";

const host: User = { id: "u-host-1", name: "Morgan Lee", role: "host", verified: true, rating: 4.9 };

const mkSpace = (id: string, title: string, type: SpaceUnit["type"], availableMinutes: number, pricePerMinute: number, distanceMiles: number, privacyLevel: SpaceUnit["privacyLevel"], hostAway = false, computeDiscountAvailable = true, amenities: string[] = ["Wi-Fi", "Restroom"]): SpaceUnit => ({
  id,
  title,
  type,
  description: "Dock anywhere. Rest privately.",
  availableMinutes,
  pricePerMinute,
  distanceMiles,
  rating: 4.7,
  privacyLevel,
  hostAway,
  computeDiscountAvailable,
  amenities,
  rules: {
    noSmoking: true,
    quietMode: true,
    noGuests: false,
    notes: ["Private space by the minute.", "Respect session timing."]
  },
  host,
  availability: [
    { id: `${id}-a1`, start: "09:00", end: "12:00", availableMinutes: Math.min(availableMinutes, 180) },
    { id: `${id}-a2`, start: "13:00", end: "18:00", availableMinutes: Math.max(0, availableMinutes - 180) }
  ]
});

export const spaces: SpaceUnit[] = [
  mkSpace("1", "Quiet couch near Union Square", "Couch", 120, 0.45, 0.4, "High", false, true),
  mkSpace("2", "Private desk window in SoHo", "Desk", 180, 0.55, 1.2, "Premium", false, true),
  mkSpace("3", "Host-away living room in Brooklyn", "Private Dock", 240, 0.35, 3.4, "Standard", true, true),
  mkSpace("4", "Phone-call corner near Midtown", "Quiet Room", 90, 0.4, 0.8, "High", false, false),
  mkSpace("5", "Nap spot near Grand Central", "Couch", 60, 0.6, 0.7, "Premium", false, true),
  mkSpace("6", "Balcony smoking dock in Queens", "Private Dock", 150, 0.3, 5.2, "Standard", true, true, ["Wi-Fi"]),
  mkSpace("7", "Private office seat near Flatiron", "Desk", 210, 0.65, 1.1, "Premium", false, false),
  mkSpace("8", "Waiting lounge near JFK", "Couch", 300, 0.25, 12.4, "Standard", true, true),
  mkSpace("9", "Quiet room for 30-minute reset", "Quiet Room", 30, 0.7, 0.9, "High", false, true),
  mkSpace("10", "Premium empty apartment window", "Private Dock", 180, 0.9, 2.3, "Premium", true, true)
];

export const computeJobs: ComputeJob[] = [
  { id: "j1", name: "Lightweight model inference batch", estimatedMinutes: 12, reward: 2.1, safeMode: true },
  { id: "j2", name: "Static site preview render", estimatedMinutes: 8, reward: 1.2, safeMode: true },
  { id: "j3", name: "Document embedding batch", estimatedMinutes: 15, reward: 2.8, safeMode: true },
  { id: "j4", name: "Image thumbnail generation", estimatedMinutes: 6, reward: 1.1, safeMode: true },
  { id: "j5", name: "Synthetic test workload", estimatedMinutes: 10, reward: 1.7, safeMode: true }
];
