
const stats = [
  {
    value: "2 M+",
    label: "Produtos no Open Food Facts",
  },
  {
    value: "100+",
    label: "Países cobertos",
  },
  {
    value: "99.9%",
    label: "Uptime garantido",
  },
  {
    value: "100%",
    label: "Open Source",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
      <div className="container-editorial">
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-[var(--border-subtle)]">
          {stats.map(({ value, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 px-6 py-8"
              >
              <span className="font-display text-2xl text-[var(--fg-primary)] leading-none">
                {value}
              </span>
              <span className="label text-center text-[var(--fg-muted)]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
