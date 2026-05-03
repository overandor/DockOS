export type User = {
  id: string;
  name: string;
  role: "guest" | "host" | "hybrid";
  verified: boolean;
  rating: number;
};

export type SpaceRuleSet = {
  noSmoking: boolean;
  quietMode: boolean;
  noGuests: boolean;
  notes: string[];
};

export type AvailabilityWindow = {
  id: string;
  start: string;
  end: string;
  availableMinutes: number;
};

export type SpaceUnit = {
  id: string;
  title: string;
  type: "Couch" | "Desk" | "Quiet Room" | "Private Dock";
  description: string;
  availableMinutes: number;
  pricePerMinute: number;
  distanceMiles: number;
  rating: number;
  privacyLevel: "Standard" | "High" | "Premium";
  hostAway: boolean;
  computeDiscountAvailable: boolean;
  amenities: string[];
  rules: SpaceRuleSet;
  host: User;
  availability: AvailabilityWindow[];
};

export type BookingRequest = {
  id: string;
  userId: string;
  spaceId: string;
  minutes: number;
  computeEnabled: boolean;
  status: "pending" | "approved" | "declined";
};

export type MicroBooking = {
  id: string;
  bookingRequestId: string;
  checkInAt?: string;
  checkOutAt?: string;
  minutesBooked: number;
  status: "upcoming" | "active" | "completed";
};

export type CheckInSession = {
  id: string;
  bookingId: string;
  startedAt: string;
  elapsedMinutes: number;
};

export type PaymentLedger = {
  bookingId: string;
  basePrice: number;
  computeCredit: number;
  finalPrice: number;
  currency: "USD" | "ETH" | "BTC" | "SOL" | "USDC";
  cryptoAmount?: number;
  cryptoRate?: number;
};

export type ComputeNode = {
  id: string;
  userId: string;
  deviceName: string;
  status: "idle" | "active" | "stopped";
  optedIn: boolean;
};

export type ComputeJob = {
  id: string;
  name: string;
  estimatedMinutes: number;
  reward: number;
  safeMode: true;
};

export type ComputeSession = {
  id: string;
  nodeId: string;
  jobId: string;
  status: "active" | "completed" | "stopped";
  startedAt: string;
};

export type ComputeContribution = {
  sessionId: string;
  creditsUsd: number;
  verified: boolean;
};

export type RevenueSplit = {
  host: number;
  platform: number;
  computePool: number;
};

export type Message = {
  id: string;
  conversationId: string;
  fromUserId: string;
  toUserId: string;
  body: string;
  createdAt: string;
  read: boolean;
  readAt?: string;
};

export type Conversation = {
  id: string;
  participantIds: [string, string];
  lastMessage?: Message;
  lastMessageAt: string;
  unreadCount: number;
  createdAt: string;
};

export type Dispute = {
  id: string;
  bookingId: string;
  reason: string;
  status: "open" | "under_review" | "resolved";
};
