/**
 * Exercise 1 — Group anagrams
 *
 * Say: "I'll sort letters of each word as a key and group originals in a Map."
 *
 * Example:
 * groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])
 * → [["eat","tea","ate"], ["tan","nat"], ["bat"]]  (order of groups may vary)
 */
export function groupAnagrams(words: string[]): string[][] {
  // TODO: implement
  
  const groups = new Map<string, string[]>();
  
  for (const word of words) {
    const sorted = word.split('').sort().join('');
    groups.set(sorted, [...(groups.get(sorted) ?? []), word]);
  }
  return [...groups.values()];
}

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))