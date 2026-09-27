/**
 * Exercise 6 — Is anagram?
 *
 * Say: "I'll count letters in both strings; they must match."
 *
 * Example:
 * isAnagram('listen', 'silent') → true
 * isAnagram('hello', 'world') → false
 */
export function isAnagram(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }

  const counts = new Map<string, number>()

  for (const char of a) {
    counts.set(char, (counts.get(char) ?? 0) + 1)
  }

  for (const char of b) {
    const next = (counts.get(char) ?? 0) - 1
    if (next < 0) {
      return false
    }
    counts.set(char, next)
  }

  return true
}
