import z from 'zod'

import { zDisplay } from 'types/filters'

export const minifigsSearchSchema = z.object({
  appearance: z.string().optional(),
  characterName: z.string().optional(),
  display: zDisplay.default('all'),
  tag: z.string().optional(),
  timeline: z.string().optional(),
})

export type MinifigsSearch = z.infer<typeof minifigsSearchSchema>

export const setsSearchSchema = z.object({
  display: zDisplay.default('all'),
  appearance: z.string().optional(),
  tag: z.string().optional(),
  timeline: z.string().optional(),
  subtheme: z.string().optional(),
  releaseYear: z.string().or(z.number()).optional(),
  search: z.string().or(z.number()).optional(),
})

export type SetsSearch = z.infer<typeof setsSearchSchema>
