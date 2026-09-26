/**
 * Exercise 3 — First non-repeating character
 *
 * Say: "Count frequencies, then return the first char whose count is 1."
 *
 * Example:
 * firstNonRepeating('swiss') → 'w'
 * firstNonRepeating('aabb') → null
 */
export function firstNonRepeating(input: string): string | null {
  // TODO: implement
  const counts = new Map<string, number>();
  for (const char of input) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }
  return [...counts.entries()].find(([, count]) => count === 1)?.[0] ?? null;
}

console.log(firstNonRepeating('aabbac'))
