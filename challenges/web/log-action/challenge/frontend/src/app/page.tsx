import Link from 'next/link';

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold">Home</h1>
      <p>Log in <Link href="/login">here</Link>.</p>
    </>
  )
}