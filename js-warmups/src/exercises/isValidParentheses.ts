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
