/**
 * Exercise 8 — Reverse words
 *
 * Say: "I'll split by spaces, reverse the array, and join again."
 *
 * Example:
 * reverseWords('hola mundo') → 'mundo hola'
 * reverseWords('  one   two ') → 'two one'  (trim + collapse spaces)
 */
export function reverseWords(sentence: string): string {
  // TODO: implement
  void sentence
  return sentence.trim().split(/\s+/).reverse().join(' ');
}

console.log(reverseWords('hola mundo'))
console.log(reverseWords('  one   two '))
