import { describe, expect, it } from 'vitest'
import { groupAnagrams } from '../exercises/groupAnagrams'
import { findDuplicates } from '../exercises/findDuplicates'
import { firstNonRepeating } from '../exercises/firstNonRepeating'
import { topKFrequent } from '../exercises/topKFrequent'
import { twoSum } from '../exercises/twoSum'
import { isAnagram } from '../exercises/isAnagram'
import { isValidParentheses } from '../exercises/isValidParentheses'
import { reverseWords } from '../exercises/reverseWords'
import { mostFrequentChar } from '../exercises/mostFrequentChar'
import { intersection } from '../exercises/intersection'
import { moveZeros } from '../exercises/moveZeros'
import { isPalindrome } from '../exercises/isPalindrome'

function sortedGroups(groups: string[][]): string[][] {
  return groups
    .map((group) => [...group].sort())
    .sort((a, b) => a[0]?.localeCompare(b[0] ?? '') ?? 0)
}

describe('groupAnagrams', () => {
  it('groups anagrams together', () => {
    const result = groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])
    expect(sortedGroups(result)).toEqual(
      sortedGroups([
        ['eat', 'tea', 'ate'],
        ['tan', 'nat'],
        ['bat'],
      ]),
    )
  })
})

describe('findDuplicates', () => {
  it('returns words that appear more than once', () => {
    const result = findDuplicates(['a', 'b', 'a', 'c', 'b', 'a']).sort()
    expect(result).toEqual(['a', 'b'])
  })
})

describe('firstNonRepeating', () => {
  it('returns the first unique character', () => {
    expect(firstNonRepeating('swiss')).toBe('w')
  })

  it('returns null when every char repeats', () => {
    expect(firstNonRepeating('aabb')).toBeNull()
  })
})

describe('topKFrequent', () => {
  it('returns the k most frequent words', () => {
    expect(
      topKFrequent(['i', 'love', 'leetcode', 'i', 'love', 'coding'], 2),
    ).toEqual(['i', 'love'])
  })
})

describe('twoSum', () => {
  it('returns indices that add up to target', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1])
  })
})

describe('isAnagram', () => {
  it('detects anagrams', () => {
    expect(isAnagram('listen', 'silent')).toBe(true)
    expect(isAnagram('hello', 'world')).toBe(false)
  })
})

describe('isValidParentheses', () => {
  it('validates bracket pairs', () => {
    expect(isValidParentheses('()[]{}')).toBe(true)
    expect(isValidParentheses('(]')).toBe(false)
    expect(isValidParentheses('([)]')).toBe(false)
  })
})

describe('reverseWords', () => {
  it('reverses words and collapses spaces', () => {
    expect(reverseWords('hola mundo')).toBe('mundo hola')
    expect(reverseWords('  one   two ')).toBe('two one')
  })
})

describe('mostFrequentChar', () => {
  it('returns the most frequent character', () => {
    expect(mostFrequentChar('abbccc')).toBe('c')
    expect(mostFrequentChar('aabbc')).toBe('a')
  })
})

describe('intersection', () => {
  it('returns unique shared values', () => {
    expect(intersection([1, 2, 2, 3], [2, 2, 4])).toEqual([2])
    expect(intersection(['a', 'b'], ['c'])).toEqual([])
  })
})

describe('moveZeros', () => {
  it('moves zeros to the end', () => {
    expect(moveZeros([0, 1, 0, 3, 12])).toEqual([1, 3, 12, 0, 0])
  })
})

describe('isPalindrome', () => {
  it('ignores punctuation and case', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true)
    expect(isPalindrome('hello')).toBe(false)
  })
})
