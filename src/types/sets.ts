import { z } from 'zod'

export const setValidationSchema = z.object({
  appearances: z.array(z.string()).optional(),
  id: z.string().min(1, {
    message: 'Id is required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  subtheme: z.string().min(1, {
    message: 'Subtheme is required',
  }),
  releaseYear: z.number().min(1, { message: 'Release year is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  note: z.string(),
  ownedQuantity: z.number(),
  tags: z.array(z.string()).optional(),
  timelines: z.array(z.string()).optional(),
  minifigs: z.array(z.object({ id: z.string().min(1), quantity: z.number().min(1) })),
  box: z.nullable(z.boolean()),
  notice: z.nullable(z.boolean()),
  bags: z.nullable(z.boolean()),
  partsQuantity: z.nullable(z.number()),
  priceBought: z.union([z.string(), z.number(), z.literal('Gift')]),
  storeValueFr: z.union([z.string(), z.number(), z.literal('polybag')]),
  marketValue: z.number().min(1),
})

export type Set = z.infer<typeof setValidationSchema>

export type SetsList = Set[]
