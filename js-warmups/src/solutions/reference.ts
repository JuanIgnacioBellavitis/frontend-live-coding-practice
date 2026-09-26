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
  const map = new Map<string, string[]>()

  for (const word of words) {
    const key = word.split('').sort().join('')
    const group = map.get(key) ?? []
    group.push(word)
    map.set(key, group)
  }

  return [...map.values()]
}

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
  const counts = new Map<string, number>()

  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1)
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([word]) => word)
}

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
  const counts = new Map<string, number>()

  for (const char of input) {
    counts.set(char, (counts.get(char) ?? 0) + 1)
  }

  for (const char of input) {
    if (counts.get(char) === 1) {
      return char
    }
  }

  return null
}

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
  const counts = new Map<string, number>()

  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1)
  }

  return [...counts.entries()]
    .sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1]
      }
      return a[0].localeCompare(b[0])
    })
    .slice(0, k)
    .map(([word]) => word)
}

/**
 * Exercise 5 — Two sum
 */
export function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>()

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]
    if (seen.has(need)) {
      return [seen.get(need)!, i]
    }
    seen.set(nums[i], i)
  }

  return []
}

/**
 * Exercise 6 — Is anagram?
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

/**
 * Exercise 7 — Valid parentheses
 *
 * Say: "I'll push opening brackets on a stack and pop when I see a match."
 *
 * Example:
 * isValidParentheses('()[]{}') → true
 * isValidParentheses('(]') → false
 */
export function isValidParentheses(input: string): boolean {
  const pairs: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{',
  }
  const stack: string[] = []

  for (const char of input) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char)
      continue
    }

    if (!(char in pairs)) {
      continue
    }

    if (stack.pop() !== pairs[char]) {
      return false
    }
  }

  return stack.length === 0
}

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
  return sentence
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .reverse()
    .join(' ')
}

/**
 * Exercise 9 — Most frequent character
 */
export function mostFrequentChar(input: string): string | null {
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
  const setA = new Set(a)
  const result: T[] = []
  const seen = new Set<T>()

  for (const item of b) {
    if (setA.has(item) && !seen.has(item)) {
      seen.add(item)
      result.push(item)
    }
  }

  return result
}

/**
 * Exercise 11 — Move zeros
 */
export function moveZeros(nums: number[]): number[] {
  const nonZeros = nums.filter((n) => n !== 0)
  const zeros = nums.length - nonZeros.length
  return [...nonZeros, ...Array(zeros).fill(0)]
}

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
  const normalized = input.toLowerCase().replace(/[^a-z0-9]/g, '')
  const reversed = normalized.split('').reverse().join('')
  return normalized === reversed
}
