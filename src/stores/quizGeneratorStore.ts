import { create } from 'zustand'
import type { PageSnapshot, QuizQuestion } from '../types'

type QuizGeneratorState = {
  apiKey: string
  questionCount: number
  snapshot?: PageSnapshot
  questions: QuizQuestion[]
  error?: string
}

type QuizGeneratorActions = {
  setApiKey: (apiKey: string) => void
  setQuestionCount: (questionCount: number) => void
  setSnapshot: (snapshot: PageSnapshot) => void
  setQuestions: (questions: QuizQuestion[]) => void
  setError: (error?: string) => void
  updateSnapshotMedia: (media: PageSnapshot['media']) => void
}

export const useQuizGeneratorStore = create<QuizGeneratorState & QuizGeneratorActions>((set) => ({
  apiKey: '',
  questionCount: 5,
  questions: [],
  setApiKey: (apiKey) => set({ apiKey }),
  setQuestionCount: (questionCount) => set({ questionCount }),
  setSnapshot: (snapshot) => set({ snapshot }),
  setQuestions: (questions) => set({ questions }),
  setError: (error) => set({ error }),
  updateSnapshotMedia: (media) =>
    set((state) => ({
      snapshot: state.snapshot ? { ...state.snapshot, media } : state.snapshot,
    })),
}))
