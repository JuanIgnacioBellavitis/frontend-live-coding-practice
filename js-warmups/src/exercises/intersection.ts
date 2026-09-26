/**
 * Exercise 10 — Intersection of arrays
 *
 * Say: "Put the first array in a Set, then keep unique items also in the second."
 *
 * Example:
 * intersection([1, 2, 2, 3], [2, 2, 4]) → [2]
 * intersection(['a', 'b'], ['c']) → []
 */
export function intersection<T>(a: T[], b: T[]): T[] {
  // TODO: implement
  const set = new Set(a);
  return [...set].filter(item => b.includes(item));
}

console.log(intersection([1, 2, 2, 3], [2, 2, 4]))
console.log(intersection(['a', 'b'], ['b', 'c']))