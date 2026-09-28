/**
 * Exercise 9 — Most frequent character
 *
 * Say: "Count chars with a Map, then pick the one with the highest count."
 * Ties: return the first character that reaches the max count in the string order.
 *
 * Example:
 * mostFrequentChar('abbccc') → 'c'
 * mostFrequentChar('aabbc') → 'a'
 */
export function mostFrequentChar(input: string): string | null {
  // TODO: implement
  if (!input) {
    return null
  }

  const counts = new Map<string, number>()
  let bestChar = input[0]
  let bestCount = 0

  for (const char of input) {
    const count = (counts.get(char) ?? 0) + 1
    counts.set(char, count)

    if (count > bestCount) {
      bestCount = count
      bestChar = char
    }
  }

  return bestChar
}
