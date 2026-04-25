import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image src="/logo.svg" alt="Couchify logo" width={34} height={34} />
      <div>
        <p className="text-lg font-semibold text-navy">Couchify</p>
        <p className="text-xs text-harbor">DockOS powers physical presence.</p>
      </div>
    </Link>
  );
}
