import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main class="app">
    <h1>JS / TS warmups</h1>
    <p>Implement the TODOs in <code>src/exercises/</code>, then run:</p>
    <pre>npm test</pre>
    <ol>
      <li><code>groupAnagrams</code></li>
      <li><code>findDuplicates</code></li>
      <li><code>firstNonRepeating</code></li>
      <li><code>topKFrequent</code></li>
      <li><code>twoSum</code></li>
      <li><code>isAnagram</code></li>
      <li><code>isValidParentheses</code></li>
      <li><code>reverseWords</code></li>
      <li><code>mostFrequentChar</code></li>
      <li><code>intersection</code></li>
      <li><code>moveZeros</code></li>
      <li><code>isPalindrome</code></li>
    </ol>
    <p>Stuck? Peek at <code>src/solutions/reference.ts</code> — then rewrite from scratch.</p>
    <p>Speak in English while coding. Timebox each exercise to 10–15 minutes.</p>
  </main>
`
