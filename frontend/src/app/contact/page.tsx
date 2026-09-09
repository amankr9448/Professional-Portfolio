import profile from "@/content/profile.json";

export default function Contact() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-3xl font-semibold text-paper lg:text-4xl">Contact</h1>
      <p className="mt-4 text-paper/60">
        Send a message directly through the portfolio API.
      </p>

      <form className="mt-8 space-y-4" action={`${apiBaseUrl}/api/contact/`} method="POST">
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-slate" htmlFor="name">Name</label>
          <input
            id="name" name="name" required
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-paper focus:border-steel outline-none"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-slate" htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" required
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-paper focus:border-steel outline-none"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-wide text-slate" htmlFor="message">Message</label>
          <textarea
            id="message" name="message" required rows={5}
            className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-paper focus:border-steel outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-ochre px-5 py-2.5 font-mono text-sm font-medium text-void hover:brightness-110 transition-[filter]"
        >
          Send message
        </button>
      </form>

      <div className="mt-10 flex flex-col gap-1 font-mono text-sm text-paper/70">
        <span className="text-slate">Or reach out directly:</span>
        <span>{profile.contact.email}</span>
        <span>{profile.contact.github}</span>
        <span>{profile.contact.linkedin}</span>
      </div>
    </div>
  );
}
