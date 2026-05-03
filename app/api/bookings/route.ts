import { BookingRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { spaceId, minutes, paymentMethod, computeEnabled, userId } = body;

    if (!spaceId || !minutes || !paymentMethod || !userId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const validPaymentMethods = ["usd", "eth", "btc", "sol", "usdc"];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return Response.json({ error: "Invalid payment method" }, { status: 400 });
    }

    // Create booking request
    const bookingRequest: BookingRequest = {
      id: `booking_${Date.now()}`,
      userId,
      spaceId,
      minutes,
      computeEnabled,
      status: "pending"
    };

    // In a real app, this would save to database
    console.log("[v0] Creating booking request:", bookingRequest);
    console.log("[v0] Payment method:", paymentMethod);

    return Response.json({
      success: true,
      bookingId: bookingRequest.id,
      message: `Booking request created with ${paymentMethod.toUpperCase()} payment`,
      paymentDetails: {
        method: paymentMethod,
        status: "pending",
        confirmationRequired: true
      }
    });
  } catch (error) {
    console.error("[v0] Booking error:", error);
    return Response.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
