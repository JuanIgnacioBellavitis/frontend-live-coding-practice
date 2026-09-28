/**
 * Exercise 5 — Two sum
 *
 * Say: "I'll store each number's index in a Map and look for target - num."
 *
 * Example:
 * twoSum([2, 7, 11, 15], 9) → [0, 1]
 */
export function twoSum(nums: number[], target: number): number[] {
  // TODO: implement
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
