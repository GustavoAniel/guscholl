import { Atom, Pen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-slate-900">
      <div className="flex flex-1 flex-col items-center justify-center w-full gap-4">
        <Link className="text-white flex justify-center gap-2 font-bold bg-emerald-500 w-72 text-center py-8 rounded-xl" href="/login">
          Login
        </Link>
      </div>
    </main>
  );
}
