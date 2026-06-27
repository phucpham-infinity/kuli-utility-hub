type QuizControlsProps = {
  apiKey: string
  questionCount: number
  hasSnapshot: boolean
  error?: string
  isScanning: boolean
  isGenerating: boolean
  onApiKeyChange: (apiKey: string) => void
  onQuestionCountChange: (questionCount: number) => void
  onScanPage: () => void
  onGenerateQuestions: () => void
}

export function QuizControls({
  apiKey,
  questionCount,
  hasSnapshot,
  error,
  isScanning,
  isGenerating,
  onApiKeyChange,
  onQuestionCountChange,
  onScanPage,
  onGenerateQuestions,
}: QuizControlsProps) {
  const isBusy = isScanning || isGenerating

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900" aria-label="Quiz generator controls">
      <div className="grid gap-3">
        <label className="grid gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
          <span>OpenAI API key</span>
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
            type="password"
            value={apiKey}
            placeholder="sk-..."
            autoComplete="off"
            onChange={(event) => onApiKeyChange(event.target.value)}
          />
        </label>

        <label className="grid max-w-36 gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
          <span>So cau hoi</span>
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
            type="number"
            min="1"
            max="20"
            value={questionCount}
            onChange={(event) => onQuestionCountChange(Number(event.target.value))}
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-full border border-violet-500/50 bg-violet-500/10 px-4 py-2.5 text-sm font-bold text-violet-700 transition hover:bg-violet-500/15 disabled:cursor-not-allowed disabled:opacity-55 dark:text-violet-300"
            type="button"
            onClick={onScanPage}
            disabled={isBusy}
          >
            {isScanning ? 'Dang quet...' : 'Quet trang'}
          </button>
          <button
            className="rounded-full bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-55"
            type="button"
            onClick={onGenerateQuestions}
            disabled={isBusy || !hasSnapshot}
          >
            {isGenerating ? 'Dang tao cau hoi...' : 'Tao trac nghiem'}
          </button>
        </div>

        {error ? <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-300">{error}</p> : null}
      </div>
    </section>
  )
}
