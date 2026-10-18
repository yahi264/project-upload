import { readRequests } from "@/lib/requests";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const requests = await readRequests();
  const pieces = requests.reduce((n, r) => n + r.items.filter((i) => (i.unit ?? "pcs") === "pcs").reduce((m, i) => m + i.quantity, 0), 0);

  return (
    <>
      <div className="bg-ink py-5"><div className="container-x"><img src="/images/site/logo-word.png" alt="Hieron" className="h-4 w-auto" /></div></div>
      <section className="container-x py-14">
        <p className="eyebrow text-gold">Dashboard</p>
        <h1 className="mt-3 font-display text-5xl font-light">Client requests</h1>

        <div className="mt-10 grid max-w-xl grid-cols-2 gap-px bg-navy/10">
          <div className="bg-cream p-6">
            <p className="font-display text-4xl">{requests.length}</p>
            <p className="eyebrow mt-1 text-steel">Requests</p>
          </div>
          <div className="bg-cream p-6">
            <p className="font-display text-4xl">{pieces.toLocaleString("en")}</p>
            <p className="eyebrow mt-1 text-steel">Pieces requested</p>
          </div>
        </div>

        {requests.length === 0 ? (
          <p className="mt-16 text-steel">No requests yet. They will appear here as soon as a client sends the form.</p>
        ) : (
          <div className="mt-12 space-y-6">
            {requests.map((r) => (
              <details key={r.id} className="group border border-navy/10 bg-white/60 open:bg-white">
                <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-4 p-6">
                  <div>
                    <p className="font-display text-2xl">{r.company}</p>
                    <p className="mt-1 text-sm text-steel">
                      {r.name} · {r.country || "—"} · {r.items.length} products · {(r.locale ?? "en").toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">{r.id}</p>
                    <p className="text-steel">{new Date(r.createdAt).toLocaleString("en-GB")}</p>
                  </div>
                </summary>
                <div className="grid gap-8 border-t border-navy/10 p-6 md:grid-cols-2">
                  <dl className="space-y-2 text-sm">
                    <Row k="Email" v={<a href={`mailto:${r.email}?subject=Your Hieron request ${r.id}`} className="underline">{r.email}</a>} />
                    <Row k="Phone" v={r.phone || "—"} />
                    <Row k="Rooms" v={r.rooms || "—"} />
                    <Row k="Branding" v={r.branding ? "Yes" : "No"} />
                    <Row k="Message" v={<span className="whitespace-pre-wrap">{r.message || "—"}</span>} />
                  </dl>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-navy/10 text-left text-steel">
                        <th className="py-2 font-normal">Product</th>
                        <th className="py-2 font-normal">Size / finish</th>
                        <th className="py-2 text-right font-normal">Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {r.items.map((i) => (
                        <tr key={`${i.slug}${i.size}${i.option}`} className="border-b border-navy/5">
                          <td className="py-2">{i.name}<span className="block text-xs text-steel">{i.category}</span></td>
                          <td className="py-2">{i.size}<span className="block text-xs text-steel">{i.option}</span></td>
                          <td className="py-2 text-right">{i.quantity.toLocaleString("en")} {i.unit ?? "pcs"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-3">
      <dt className="text-steel">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
