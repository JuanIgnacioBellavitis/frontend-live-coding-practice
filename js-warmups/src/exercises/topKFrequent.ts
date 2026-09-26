/**
 * Exercise 4 — Top K frequent words
 *
 * Say: "Count with a Map, sort by frequency desc then word asc, take k."
 *
 * Example:
 * topKFrequent(['i', 'love', 'leetcode', 'i', 'love', 'coding', 'leetcode'], 2)
 * → ['i', 'love']
 */
export function topKFrequent(words: string[], k: number): string[] {
  // TODO: implement

  const counts = new Map<string, number>();
 
  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([word]) => word).slice(0, k);
}

console.log(topKFrequent(['i', 'love', 'leetcode', 'i', 'love', 'coding'], 2))