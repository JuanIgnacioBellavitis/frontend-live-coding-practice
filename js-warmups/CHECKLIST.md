# JS Warmups — Practice Checklist

Small string/array drills for the **first block** of a Wizeline-style live coding (~10–15 min each).

---

## How to practice

1. Open one file in `src/exercises/`
2. Implement the TODO
3. Run tests: `npm test`
4. Explain out loud in **English** before coding
5. Only then peek at `src/solutions/reference.ts` if stuck

---

## Exercises

| # | File | Skill |
|---|------|--------|
| 1 | `groupAnagrams.ts` | Map + sort letters |
| 2 | `findDuplicates.ts` | Count with Map |
| 3 | `firstNonRepeating.ts` | Count + second pass |
| 4 | `topKFrequent.ts` | Count + sort + slice |
| 5 | `twoSum.ts` | Map of complements |
| 6 | `isAnagram.ts` | Letter counts |
| 7 | `isValidParentheses.ts` | Stack |
| 8 | `reverseWords.ts` | split / reverse / join |
| 9 | `mostFrequentChar.ts` | Max count |
| 10 | `intersection.ts` | Set |
| 11 | `moveZeros.ts` | Filter + fill |
| 12 | `isPalindrome.ts` | Normalize + reverse |

---

## Priority for Wizeline-style warmups

Do these first: **twoSum**, **isAnagram**, **isValidParentheses**, **reverseWords**.

---

## Interview openers

> "I'll clarify the examples, then pick a Map / Set / stack."

> "Time complexity is roughly O(n * k log k) for anagrams where k is word length."

---

## Commands

```bash
cd js-warmups
npm test
npm run test:watch
npm run dev
```
