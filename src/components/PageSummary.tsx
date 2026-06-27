import type { PageSnapshot } from '../types'

type PageSummaryProps = {
  snapshot: PageSnapshot
}

export function PageSummary({ snapshot }: PageSummaryProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900" aria-label="Scanned page summary">
      <h2 className="mb-3 text-lg font-semibold text-slate-950 dark:text-slate-50">Trang da quet</h2>
      <dl className="grid gap-2.5">
        <SummaryItem label="Tieu de" value={snapshot.title || 'Khong co tieu de'} />
        <SummaryItem label="URL" value={snapshot.url} />
        <SummaryItem label="Markdown" value={`${snapshot.markdown.length.toLocaleString()} ky tu`} />
        <SummaryItem label="Media" value={`${snapshot.media.length} muc`} />
      </dl>
    </section>
  )
}

type SummaryItemProps = {
  label: string
  value: string
}

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="grid gap-0.5">
      <dt className="text-xs text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="m-0 break-words text-sm text-slate-900 dark:text-slate-100">{value}</dd>
    </div>
  )
}
