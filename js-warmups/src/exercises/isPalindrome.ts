/**
 * Exercise 12 — Palindrome
 *
 * Say: "Normalize to lowercase letters/digits only, then compare to its reverse."
 *
 * Example:
 * isPalindrome('A man, a plan, a canal: Panama') → true
 * isPalindrome('hello') → false
 */
export function isPalindrome(input: string): boolean {
  // TODO: implement
  void input
  const normalized = input.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === normalized.split('').reverse().join('');
}

console.log(isPalindrome('A man, a plan, a canal: Panama'))
console.log(isPalindrome('hello'))