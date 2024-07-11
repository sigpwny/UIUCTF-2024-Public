import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Admin
      </h1>
      <p>Very cool! You logged in as admin!</p>
      <Link href="/logout">Log out</Link>
    </div>
  );
}