/**
 * Exercise 11 — Move zeros
 *
 * Say: "I'll keep non-zeros in order, then fill the rest with zeros."
 *
 * Example:
 * moveZeros([0, 1, 0, 3, 12]) → [1, 3, 12, 0, 0]
 */
export function moveZeros(nums: number[]): number[] {
  // TODO: implement
  const nonZeros = nums.filter((n) => n !== 0)
  const zeros = nums.length - nonZeros.length
  return [...nonZeros, ...Array(zeros).fill(0)]
}
