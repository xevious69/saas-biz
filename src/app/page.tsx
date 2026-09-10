const foundations = [
  "TypeScript and Next.js",
  "PostgreSQL and Supabase",
  "Automated tests and security checks",
  "Preview-first releases",
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-20 sm:px-10">
      <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
        Ready to build
      </p>
      <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-7xl">
        SaaS Biz
      </h1>
      <p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-600">
        A safe foundation for your next product. Build locally, validate every change,
        review it in pre-production, and promote it when it is ready.
      </p>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {foundations.map((foundation) => (
          <li
            key={foundation}
            className="rounded-2xl border border-zinc-200 bg-white p-5 text-zinc-800 shadow-sm"
          >
            {foundation}
          </li>
        ))}
      </ul>
    </main>
  );
}
