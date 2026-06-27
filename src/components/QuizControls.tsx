type QuizControlsProps = {
  questionCount: number
  hasSnapshot: boolean
  error?: string
  isScanning: boolean
  isGenerating: boolean
  onQuestionCountChange: (questionCount: number) => void
  onScanPage: () => void
  onGenerateQuestions: () => void
}

export function QuizControls({
  questionCount,
  hasSnapshot,
  error,
  isScanning,
  isGenerating,
  onQuestionCountChange,
  onScanPage,
  onGenerateQuestions,
}: QuizControlsProps) {
  const isBusy = isScanning || isGenerating

  return (
    <section className="border border-black bg-white p-4 text-black shadow-[6px_6px_0_#111]" aria-label="Quiz generator controls">
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-black pb-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-black/50">Action stack</p>
          <h2 className="mt-1 text-xl font-black uppercase leading-none tracking-[-0.04em]">Create quiz</h2>
        </div>
        <span className="border border-black px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em]">AI</span>
      </div>

      <div className="grid gap-4">
        <label className="grid max-w-40 gap-2 text-xs font-black uppercase tracking-[0.16em] text-black">
          <span>Question count</span>
          <input
            className="h-11 w-full border border-black bg-white px-3 text-base font-black text-black outline-none transition focus:border-black focus:bg-white focus:text-black"
            type="number"
            min="1"
            max="20"
            value={questionCount}
            onChange={(event) => onQuestionCountChange(Number(event.target.value))}
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="h-12 border border-black bg-white px-4 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#111] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            type="button"
            onClick={onScanPage}
            disabled={isBusy}
          >
            {isScanning ? 'Scanning' : 'Scan page'}
          </button>
          <button
            className="h-12 border border-black bg-white px-4 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#111] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            type="button"
            onClick={onGenerateQuestions}
            disabled={isBusy || !hasSnapshot}
          >
            {isGenerating ? 'Generating' : 'Create quiz'}
          </button>
        </div>

        {error ? <p className="border border-red-600 bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
      </div>
    </section>
  )
}
