import { LanguageRecord } from '$/types'
import levenshtein from './levenshtein'
import translation from './translation'

/**
 * Filter items by text and sort by score.
 *
 * WARNING: Do not have a key named "score" in keys
 *
 * @param items Array to filter
 * @param text Text to search
 * @param keys Keys to look into (need to be top level keys of items and need to result into a {@link LanguageRecord})
 */
export default function <T extends Record<string, any>>(items: T[], text: string, keys: (keyof T)[]) {
  const search = text.trim().toLowerCase()
  const itemsWithScore = items.map((item) => ({ ...item, score: 0 }))
  let results = itemsWithScore

  // exact match -> score: 4
  results = itemsWithScore
    // filter for exact match
    .filter((item) => keys.some((key) => translation(item[key] as LanguageRecord).toLowerCase() === search))
    // attribute score
    .map((item) => ({ ...item, score: 4 }))

  // fuzzy exact match -> score: 3
  results = [
    ...results,
    ...itemsWithScore
      // filter for not in result already & for fuzzy exact match
      .filter(
        (item) =>
          !results.find((result) => result.id === item.id) &&
          keys.some((key) => levenshtein(translation(item[key] as LanguageRecord).toLowerCase(), search) === 1),
      )
      // attribute score
      .map((item) => ({ ...item, score: 3 })),
  ]

  // starts with -> score: 2
  results = [
    ...results,
    ...itemsWithScore
      // filter for not in result already & for starts with
      .filter(
        (item) =>
          !results.find((result) => result.id === item.id) &&
          keys.some((key) =>
            translation(item[key] as LanguageRecord)
              .toLowerCase()
              .startsWith(search),
          ),
      )
      // attribute score
      .map((item) => ({ ...item, score: 2 })),
  ]

  // includes -> score: 1
  results = [
    ...results,
    ...itemsWithScore
      // filter for not in result already & for includes
      .filter(
        (item) =>
          !results.find((result) => result.id === item.id) &&
          keys.some((key) =>
            translation(item[key] as LanguageRecord)
              .toLowerCase()
              .includes(search),
          ),
      )
      // attribute score
      .map((item) => ({ ...item, score: 1 })),
  ]

  // sort by score
  results = results.sort((a, b) => b.score - a.score)

  // remove score key
  return results.map((result) => {
    // divide result in score and rest then return rest
    const { score, ...rest } = result
    score
    return rest
  })
}
