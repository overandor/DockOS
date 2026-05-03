import { ComputeJob, SpaceUnit, User, Message, Conversation } from "./types";

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

// Mock users for messaging
const currentUser: User = { id: "user-current", name: "You", role: "guest", verified: true, rating: 4.8 };
const otherUser1: User = { id: "user-1", name: "Alex Chen", role: "host", verified: true, rating: 4.9 };
const otherUser2: User = { id: "user-2", name: "Jordan Martinez", role: "hybrid", verified: true, rating: 4.6 };
const otherUser3: User = { id: "user-3", name: "Casey Williams", role: "guest", verified: true, rating: 4.7 };

// Mock messages
export const messages: Message[] = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    fromUserId: "user-1",
    toUserId: "user-current",
    body: "Hi! Is the desk still available for tomorrow at 2 PM?",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    read: true,
    readAt: new Date(Date.now() - 3500000).toISOString()
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    fromUserId: "user-current",
    toUserId: "user-1",
    body: "Yes! I can book it for you. How many minutes do you need?",
    createdAt: new Date(Date.now() - 3400000).toISOString(),
    read: true,
    readAt: new Date(Date.now() - 3300000).toISOString()
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    fromUserId: "user-1",
    toUserId: "user-current",
    body: "Perfect! I'll need about 2 hours. Thanks!",
    createdAt: new Date(Date.now() - 3200000).toISOString(),
    read: true,
    readAt: new Date(Date.now() - 3100000).toISOString()
  },
  {
    id: "msg-4",
    conversationId: "conv-2",
    fromUserId: "user-2",
    toUserId: "user-current",
    body: "Hey, quick question about the WiFi speed",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    read: false
  },
  {
    id: "msg-5",
    conversationId: "conv-3",
    fromUserId: "user-3",
    toUserId: "user-current",
    body: "Can I book the quiet room for next week?",
    createdAt: new Date(Date.now() - 900000).toISOString(),
    read: false
  }
];

// Mock conversations
export const conversations: Conversation[] = [
  {
    id: "conv-1",
    participantIds: ["user-current", "user-1"],
    lastMessage: messages[2],
    lastMessageAt: messages[2].createdAt,
    unreadCount: 0,
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: "conv-2",
    participantIds: ["user-current", "user-2"],
    lastMessage: messages[3],
    lastMessageAt: messages[3].createdAt,
    unreadCount: 1,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "conv-3",
    participantIds: ["user-current", "user-3"],
    lastMessage: messages[4],
    lastMessageAt: messages[4].createdAt,
    unreadCount: 1,
    createdAt: new Date(Date.now() - 1800000).toISOString()
  }
];

export const allUsers: User[] = [currentUser, otherUser1, otherUser2, otherUser3];
