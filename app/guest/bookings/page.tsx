import LiveSessionTimer from "@/components/LiveSessionTimer";

export default function GuestBookingsPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Guest bookings</h1>
      <div className="rounded-2xl bg-white p-5 shadow-soft">
        <h2 className="font-semibold">Active booking</h2>
        <LiveSessionTimer />
        <div className="mt-3 flex gap-2">
          <button className="rounded-lg bg-harbor px-3 py-2 text-sm text-white">Check in</button>
          <button className="rounded-lg bg-sunset px-3 py-2 text-sm text-white">Check out</button>
          <button className="rounded-lg bg-white px-3 py-2 text-sm shadow-soft">Extend</button>
        </div>
        <p className="mt-2 text-sm">Compute contribution credit: $3.20</p>
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-soft">
        <h2 className="font-semibold">Upcoming bookings</h2>
        <p className="text-sm text-gray-600">2 upcoming private docks this week.</p>
      </div>
    </div>
  );
}
