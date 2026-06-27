import { useMutation } from '@tanstack/react-query'
import { enrichMediaWithTranscripts, requestQuiz } from '../services/openAiQuizService'
import { getActiveTabSnapshot } from '../services/pageScannerService'
import { useQuizGeneratorStore } from '../stores/quizGeneratorStore'

/**
 * Owns popup actions and delegates state to Zustand plus async work to React Query mutations.
 */
export function useQuizGenerator() {
  const apiKey = useQuizGeneratorStore((state) => state.apiKey)
  const questionCount = useQuizGeneratorStore((state) => state.questionCount)
  const snapshot = useQuizGeneratorStore((state) => state.snapshot)
  const questions = useQuizGeneratorStore((state) => state.questions)
  const error = useQuizGeneratorStore((state) => state.error)
  const setApiKey = useQuizGeneratorStore((state) => state.setApiKey)
  const setQuestionCount = useQuizGeneratorStore((state) => state.setQuestionCount)
  const setSnapshot = useQuizGeneratorStore((state) => state.setSnapshot)
  const setQuestions = useQuizGeneratorStore((state) => state.setQuestions)
  const setError = useQuizGeneratorStore((state) => state.setError)
  const updateSnapshotMedia = useQuizGeneratorStore((state) => state.updateSnapshotMedia)

  const scanPageMutation = useMutation({
    mutationFn: getActiveTabSnapshot,
    onMutate: () => setError(undefined),
    onSuccess: (nextSnapshot) => setSnapshot(nextSnapshot),
    onError: (mutationError) => {
      setError(mutationError instanceof Error ? mutationError.message : 'Could not scan page.')
    },
  })

  const generateQuestionsMutation = useMutation({
    mutationFn: async () => {
      if (!snapshot) throw new Error('Scan a page before generating questions.')
      if (!apiKey.trim()) throw new Error('OpenAI API key is required.')

      const media = await enrichMediaWithTranscripts(apiKey.trim(), snapshot.media)
      const nextQuestions = await requestQuiz(apiKey.trim(), snapshot, media, questionCount)

      return { media, questions: nextQuestions }
    },
    onMutate: () => setError(undefined),
    onSuccess: ({ media, questions: nextQuestions }) => {
      updateSnapshotMedia(media)
      setQuestions(nextQuestions)
    },
    onError: (mutationError) => {
      setError(mutationError instanceof Error ? mutationError.message : 'Could not generate questions.')
    },
  })

  return {
    apiKey,
    questionCount,
    snapshot,
    questions,
    error,
    isScanning: scanPageMutation.isPending,
    isGenerating: generateQuestionsMutation.isPending,
    setApiKey,
    setQuestionCount,
    scanPage: scanPageMutation.mutate,
    generateQuestions: generateQuestionsMutation.mutate,
  }
}
