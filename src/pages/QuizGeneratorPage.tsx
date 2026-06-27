import { AppHeader } from '../components/AppHeader'
import { PageSummary } from '../components/PageSummary'
import { QuestionList } from '../components/QuestionList'
import { QuizControls } from '../components/QuizControls'
import { useQuizGenerator } from '../hooks/useQuizGenerator'

export function QuizGeneratorPage() {
  const {
    apiKey,
    questionCount,
    snapshot,
    questions,
    error,
    isScanning,
    isGenerating,
    setApiKey,
    setQuestionCount,
    scanPage,
    generateQuestions,
  } = useQuizGenerator()

  return (
    <main className="flex min-h-[560px] w-[420px] flex-col gap-3.5 bg-slate-50 p-4 text-left text-slate-700 dark:bg-slate-950 dark:text-slate-300">
      <AppHeader />

      <QuizControls
        apiKey={apiKey}
        questionCount={questionCount}
        hasSnapshot={Boolean(snapshot)}
        error={error}
        isScanning={isScanning}
        isGenerating={isGenerating}
        onApiKeyChange={setApiKey}
        onQuestionCountChange={setQuestionCount}
        onScanPage={scanPage}
        onGenerateQuestions={generateQuestions}
      />

      {snapshot ? <PageSummary snapshot={snapshot} /> : null}

      <QuestionList questions={questions} />
    </main>
  )
}
