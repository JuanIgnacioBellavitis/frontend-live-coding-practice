/**
 * Exercise 2 — Find duplicates
 *
 * Say: "I'll count occurrences in a Map, then keep keys with count > 1."
 *
 * Example:
 * findDuplicates(['a', 'b', 'a', 'c', 'b', 'a'])
 * → ['a', 'b']  (order may vary)
 */
export function findDuplicates(words: string[]): string[] {
  // TODO: implement
  const counts = new Map<string, number>();
  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()].filter(([, count]) => count > 1).map(([word]) => word);
}

console.log(findDuplicates(['a', 'b', 'a', 'c', 'b', 'a']))