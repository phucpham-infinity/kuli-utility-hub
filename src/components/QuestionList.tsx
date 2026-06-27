import type { QuizQuestion } from '../types'

type QuestionListProps = {
  questions: QuizQuestion[]
}

export function QuestionList({ questions }: QuestionListProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900" aria-label="Generated questions">
      <h2 className="mb-3 text-lg font-semibold text-slate-950 dark:text-slate-50">Cau hoi trac nghiem</h2>
      {questions.length === 0 ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">Chua co cau hoi. Hay quet trang roi tao trac nghiem.</p>
      ) : (
        <ol className="grid list-decimal gap-3 pl-5">
          {questions.map((question, index) => (
            <QuestionCard question={question} key={`${question.question}-${index}`} />
          ))}
        </ol>
      )}
    </section>
  )
}

type QuestionCardProps = {
  question: QuizQuestion
}

function QuestionCard({ question }: QuestionCardProps) {
  return (
    <li className="border-t border-slate-200 pt-3 first:border-t-0 first:pt-0 dark:border-slate-700">
      <h3 className="mb-2.5 text-sm font-semibold leading-6 text-slate-950 dark:text-slate-50">{question.question}</h3>
      {question.imageUrl ? <img className="my-2 block max-w-full rounded-xl" src={question.imageUrl} alt="Question attachment" /> : null}
      {question.transcript ? <p className="my-2 rounded-xl bg-slate-100 p-3 text-sm text-slate-900 dark:bg-slate-800 dark:text-slate-100">Transcript: {question.transcript}</p> : null}
      <ul className="grid list-none gap-1.5 p-0">
        {question.choices.map((choice) => (
          <li className={choice.id === question.answerId ? 'text-sm text-green-600 dark:text-green-400' : 'text-sm text-slate-700 dark:text-slate-300'} key={choice.id}>
            <strong>{choice.id}.</strong> {choice.text}
          </li>
        ))}
      </ul>
      {question.explanation ? <p className="my-2 rounded-xl bg-slate-100 p-3 text-sm text-slate-900 dark:bg-slate-800 dark:text-slate-100">{question.explanation}</p> : null}
    </li>
  )
}
