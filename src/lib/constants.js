import THEME from './theme';

export const PATTERNS = [
  'Arrays', 'Strings', 'Hashing', 'Two Pointers', 'Sliding Window',
  'Binary Search', 'Stacks', 'Queues', 'Recursion', 'Backtracking',
  'Linked Lists', 'Trees', 'BST', 'Graphs', 'Heaps',
  'DP', 'Greedy', 'Tries', 'Bit Manipulation', 'Math', 'Sorting'
];

export const ROUNDS = [
  'Recruiter Screen', 'Online Assessment', 'Technical 1', 'Technical 2',
  'System Design', 'Behavioral', 'Final / Hiring Manager', 'Founder Round'
];

export const STATUSES = [
  { value: 'applied', label: 'Applied', color: '#64748B' },
  { value: 'screening', label: 'Screening', color: '#3B82F6' },
  { value: 'technical', label: 'Technical', color: '#F59E0B' },
  { value: 'final', label: 'Final', color: '#8B5CF6' },
  { value: 'offer', label: 'Offer', color: '#10B981' },
  { value: 'rejected', label: 'Rejected', color: '#EF4444' },
  { value: 'ghosted', label: 'Ghosted', color: '#9CA3AF' },
];

export const TIERS = [
  { value: 'tier1', label: 'Tier 1', color: THEME.tier1 },
  { value: 'tier15', label: 'Tier 1.5', color: THEME.tier15 },
  { value: 'tier2', label: 'Tier 2', color: THEME.tier2 },
];

export const OUTCOMES = [
  { value: 'nailed', label: 'Nailed', color: THEME.success },
  { value: 'partial', label: 'Partial', color: THEME.warning },
  { value: 'struggled', label: 'Struggled', color: THEME.danger },
];

export const WORKOUT_TYPES = [
  'Chest & Triceps', 'Back & Biceps', 'Shoulders & Legs', 'Cardio', 'Full Body', 'Yoga', 'Rest'
];

export const FINANCE_ACCOUNTS = [
  { key: 'hdfc', name: 'HDFC' },
  { key: 'iob', name: 'IOB' },
  { key: 'pixel', name: 'Pixel Credit Card' },
];

export const DEFAULT_SYSTEM_DESIGN_CHAPTERS = [
  { id: 'ch1', chapter: 1, title: 'Scale from Zero to Millions', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=Y-Gl4HEyeUQ' },
  { id: 'ch2', chapter: 2, title: 'Back-of-Envelope Estimation', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=UC5xf8FbdJc' },
  { id: 'ch3', chapter: 3, title: 'A Framework for System Design Interviews', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=i7twT3x5yv8' },
  { id: 'ch4', chapter: 4, title: 'Design a Rate Limiter', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=FU4WlwfS3G0' },
  { id: 'ch5', chapter: 5, title: 'Design Consistent Hashing', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=UF9Iqmg94tk' },
  { id: 'ch6', chapter: 6, title: 'Design a Key-Value Store', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=rnZmdmlR-2M' },
  { id: 'ch7', chapter: 7, title: 'Design a Unique ID Generator in Distributed Systems', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=typLpfDsxQY' },
  { id: 'ch8', chapter: 8, title: 'Design a URL Shortener', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=fMZMm_0ZhK4' },
  { id: 'ch9', chapter: 9, title: 'Design a Web Crawler', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=BKZxZwUgL3Y' },
  { id: 'ch10', chapter: 10, title: 'Design a Notification System', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=bBTPZ9NdSk8' },
  { id: 'ch11', chapter: 11, title: 'Design a News Feed System', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=pUPSfNcOmKA' },
  { id: 'ch12', chapter: 12, title: 'Design a Chat System', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=vvhC64hQZMk' },
  { id: 'ch13', chapter: 13, title: 'Design a Search Autocomplete System', completed: false, dateCompleted: null, notes: '', videoUrl: 'https://www.youtube.com/watch?v=us0qySiUsGU' },
];

export const DEFAULT_TARGET_COMPANIES = [
  { id: 'google', company: 'Google', role: 'SWE L3/L4', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://careers.google.com/' },
  { id: 'microsoft', company: 'Microsoft', role: 'SDE 2', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://careers.microsoft.com/' },
  { id: 'amazon', company: 'Amazon', role: 'SDE 2', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://www.amazon.jobs/' },
  { id: 'atlassian', company: 'Atlassian', role: 'Senior SWE', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://www.atlassian.com/company/careers' },
  { id: 'uber', company: 'Uber', role: 'SWE II', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://www.uber.com/us/en/careers/' },
  { id: 'adobe', company: 'Adobe', role: 'MTS 2', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://careers.adobe.com/' },
  { id: 'meta', company: 'Meta', role: 'E4', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://www.metacareers.com/' },
  { id: 'salesforce', company: 'Salesforce', role: 'MTS / Senior MTS', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://careers.salesforce.com/' },
  { id: 'razorpay', company: 'Razorpay', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://razorpay.com/careers/' },
  { id: 'cred', company: 'CRED', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://careers.cred.club/' },
  { id: 'postman', company: 'Postman', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://www.postman.com/company/careers/' },
  { id: 'swiggy', company: 'Swiggy', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://careers.swiggy.com/' },
  { id: 'flipkart', company: 'Flipkart', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://www.flipkartcareers.com/' },
  { id: 'phonepe', company: 'PhonePe', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://www.phonepe.com/careers/' },
  { id: 'zomato', company: 'Zomato', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://www.zomato.com/careers' },
  { id: 'dream11', company: 'Dream11', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://www.dreamsports.group/careers' },
  { id: 'groww', company: 'Groww', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://groww.in/careers' },
  { id: 'walmart', company: 'Walmart Labs', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://careers.walmart.com/' },
  { id: 'sprinklr', company: 'Sprinklr', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://www.sprinklr.com/careers/' },
  { id: 'zerodha', company: 'Zerodha', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18', careerUrl: 'https://zerodha.com/careers/' },
];

// LeetCode problem database — name, difficulty, pattern, link
// Used for autocomplete in DSA tab
export const LEETCODE_PROBLEMS = [
  // Arrays
  { name: 'Two Sum', difficulty: 'Easy', pattern: 'Arrays', link: 'https://leetcode.com/problems/two-sum/' },
  { name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', pattern: 'Arrays', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
  { name: 'Contains Duplicate', difficulty: 'Easy', pattern: 'Arrays', link: 'https://leetcode.com/problems/contains-duplicate/' },
  { name: 'Product of Array Except Self', difficulty: 'Medium', pattern: 'Arrays', link: 'https://leetcode.com/problems/product-of-array-except-self/' },
  { name: 'Maximum Subarray', difficulty: 'Medium', pattern: 'Arrays', link: 'https://leetcode.com/problems/maximum-subarray/' },
  { name: 'Maximum Product Subarray', difficulty: 'Medium', pattern: 'Arrays', link: 'https://leetcode.com/problems/maximum-product-subarray/' },
  { name: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', pattern: 'Arrays', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
  { name: 'Search in Rotated Sorted Array', difficulty: 'Medium', pattern: 'Binary Search', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
  { name: '3Sum', difficulty: 'Medium', pattern: 'Two Pointers', link: 'https://leetcode.com/problems/3sum/' },
  { name: 'Container With Most Water', difficulty: 'Medium', pattern: 'Two Pointers', link: 'https://leetcode.com/problems/container-with-most-water/' },
  { name: 'Trapping Rain Water', difficulty: 'Hard', pattern: 'Two Pointers', link: 'https://leetcode.com/problems/trapping-rain-water/' },
  // Strings
  { name: 'Valid Anagram', difficulty: 'Easy', pattern: 'Strings', link: 'https://leetcode.com/problems/valid-anagram/' },
  { name: 'Valid Parentheses', difficulty: 'Easy', pattern: 'Stacks', link: 'https://leetcode.com/problems/valid-parentheses/' },
  { name: 'Valid Palindrome', difficulty: 'Easy', pattern: 'Strings', link: 'https://leetcode.com/problems/valid-palindrome/' },
  { name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', pattern: 'Sliding Window', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
  { name: 'Longest Palindromic Substring', difficulty: 'Medium', pattern: 'Strings', link: 'https://leetcode.com/problems/longest-palindromic-substring/' },
  { name: 'Group Anagrams', difficulty: 'Medium', pattern: 'Hashing', link: 'https://leetcode.com/problems/group-anagrams/' },
  { name: 'Minimum Window Substring', difficulty: 'Hard', pattern: 'Sliding Window', link: 'https://leetcode.com/problems/minimum-window-substring/' },
  // Sliding Window
  { name: 'Maximum Average Subarray I', difficulty: 'Easy', pattern: 'Sliding Window', link: 'https://leetcode.com/problems/maximum-average-subarray-i/' },
  { name: 'Longest Repeating Character Replacement', difficulty: 'Medium', pattern: 'Sliding Window', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
  { name: 'Permutation in String', difficulty: 'Medium', pattern: 'Sliding Window', link: 'https://leetcode.com/problems/permutation-in-string/' },
  // Binary Search
  { name: 'Binary Search', difficulty: 'Easy', pattern: 'Binary Search', link: 'https://leetcode.com/problems/binary-search/' },
  { name: 'Koko Eating Bananas', difficulty: 'Medium', pattern: 'Binary Search', link: 'https://leetcode.com/problems/koko-eating-bananas/' },
  { name: 'Median of Two Sorted Arrays', difficulty: 'Hard', pattern: 'Binary Search', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
  // Linked Lists
  { name: 'Reverse Linked List', difficulty: 'Easy', pattern: 'Linked Lists', link: 'https://leetcode.com/problems/reverse-linked-list/' },
  { name: 'Merge Two Sorted Lists', difficulty: 'Easy', pattern: 'Linked Lists', link: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
  { name: 'Linked List Cycle', difficulty: 'Easy', pattern: 'Linked Lists', link: 'https://leetcode.com/problems/linked-list-cycle/' },
  { name: 'Remove Nth Node From End of List', difficulty: 'Medium', pattern: 'Linked Lists', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
  { name: 'Reorder List', difficulty: 'Medium', pattern: 'Linked Lists', link: 'https://leetcode.com/problems/reorder-list/' },
  { name: 'Merge k Sorted Lists', difficulty: 'Hard', pattern: 'Linked Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
  // Trees
  { name: 'Invert Binary Tree', difficulty: 'Easy', pattern: 'Trees', link: 'https://leetcode.com/problems/invert-binary-tree/' },
  { name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', pattern: 'Trees', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
  { name: 'Same Tree', difficulty: 'Easy', pattern: 'Trees', link: 'https://leetcode.com/problems/same-tree/' },
  { name: 'Subtree of Another Tree', difficulty: 'Easy', pattern: 'Trees', link: 'https://leetcode.com/problems/subtree-of-another-tree/' },
  { name: 'Lowest Common Ancestor of a BST', difficulty: 'Medium', pattern: 'BST', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/' },
  { name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', pattern: 'Trees', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
  { name: 'Validate Binary Search Tree', difficulty: 'Medium', pattern: 'BST', link: 'https://leetcode.com/problems/validate-binary-search-tree/' },
  { name: 'Kth Smallest Element in a BST', difficulty: 'Medium', pattern: 'BST', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
  { name: 'Construct Binary Tree from Preorder and Inorder', difficulty: 'Medium', pattern: 'Trees', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
  { name: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', pattern: 'Trees', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
  { name: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', pattern: 'Trees', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
  // Graphs
  { name: 'Number of Islands', difficulty: 'Medium', pattern: 'Graphs', link: 'https://leetcode.com/problems/number-of-islands/' },
  { name: 'Clone Graph', difficulty: 'Medium', pattern: 'Graphs', link: 'https://leetcode.com/problems/clone-graph/' },
  { name: 'Course Schedule', difficulty: 'Medium', pattern: 'Graphs', link: 'https://leetcode.com/problems/course-schedule/' },
  { name: 'Pacific Atlantic Water Flow', difficulty: 'Medium', pattern: 'Graphs', link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
  { name: 'Graph Valid Tree', difficulty: 'Medium', pattern: 'Graphs', link: 'https://leetcode.com/problems/graph-valid-tree/' },
  { name: 'Word Ladder', difficulty: 'Hard', pattern: 'Graphs', link: 'https://leetcode.com/problems/word-ladder/' },
  // Heaps
  { name: 'Kth Largest Element in an Array', difficulty: 'Medium', pattern: 'Heaps', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
  { name: 'Top K Frequent Elements', difficulty: 'Medium', pattern: 'Heaps', link: 'https://leetcode.com/problems/top-k-frequent-elements/' },
  { name: 'Find Median from Data Stream', difficulty: 'Hard', pattern: 'Heaps', link: 'https://leetcode.com/problems/find-median-from-data-stream/' },
  // Stacks
  { name: 'Min Stack', difficulty: 'Medium', pattern: 'Stacks', link: 'https://leetcode.com/problems/min-stack/' },
  { name: 'Daily Temperatures', difficulty: 'Medium', pattern: 'Stacks', link: 'https://leetcode.com/problems/daily-temperatures/' },
  { name: 'Largest Rectangle in Histogram', difficulty: 'Hard', pattern: 'Stacks', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
  // DP
  { name: 'Climbing Stairs', difficulty: 'Easy', pattern: 'DP', link: 'https://leetcode.com/problems/climbing-stairs/' },
  { name: 'House Robber', difficulty: 'Medium', pattern: 'DP', link: 'https://leetcode.com/problems/house-robber/' },
  { name: 'House Robber II', difficulty: 'Medium', pattern: 'DP', link: 'https://leetcode.com/problems/house-robber-ii/' },
  { name: 'Longest Increasing Subsequence', difficulty: 'Medium', pattern: 'DP', link: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
  { name: 'Coin Change', difficulty: 'Medium', pattern: 'DP', link: 'https://leetcode.com/problems/coin-change/' },
  { name: 'Longest Common Subsequence', difficulty: 'Medium', pattern: 'DP', link: 'https://leetcode.com/problems/longest-common-subsequence/' },
  { name: 'Word Break', difficulty: 'Medium', pattern: 'DP', link: 'https://leetcode.com/problems/word-break/' },
  { name: 'Combination Sum IV', difficulty: 'Medium', pattern: 'DP', link: 'https://leetcode.com/problems/combination-sum-iv/' },
  { name: 'Decode Ways', difficulty: 'Medium', pattern: 'DP', link: 'https://leetcode.com/problems/decode-ways/' },
  { name: 'Unique Paths', difficulty: 'Medium', pattern: 'DP', link: 'https://leetcode.com/problems/unique-paths/' },
  { name: 'Jump Game', difficulty: 'Medium', pattern: 'DP', link: 'https://leetcode.com/problems/jump-game/' },
  { name: 'Edit Distance', difficulty: 'Medium', pattern: 'DP', link: 'https://leetcode.com/problems/edit-distance/' },
  // Backtracking
  { name: 'Combination Sum', difficulty: 'Medium', pattern: 'Backtracking', link: 'https://leetcode.com/problems/combination-sum/' },
  { name: 'Permutations', difficulty: 'Medium', pattern: 'Backtracking', link: 'https://leetcode.com/problems/permutations/' },
  { name: 'Subsets', difficulty: 'Medium', pattern: 'Backtracking', link: 'https://leetcode.com/problems/subsets/' },
  { name: 'Word Search', difficulty: 'Medium', pattern: 'Backtracking', link: 'https://leetcode.com/problems/word-search/' },
  { name: 'N-Queens', difficulty: 'Hard', pattern: 'Backtracking', link: 'https://leetcode.com/problems/n-queens/' },
  // Greedy
  { name: 'Jump Game II', difficulty: 'Medium', pattern: 'Greedy', link: 'https://leetcode.com/problems/jump-game-ii/' },
  { name: 'Gas Station', difficulty: 'Medium', pattern: 'Greedy', link: 'https://leetcode.com/problems/gas-station/' },
  // Tries
  { name: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', pattern: 'Tries', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
  { name: 'Word Search II', difficulty: 'Hard', pattern: 'Tries', link: 'https://leetcode.com/problems/word-search-ii/' },
  // Bit Manipulation
  { name: 'Number of 1 Bits', difficulty: 'Easy', pattern: 'Bit Manipulation', link: 'https://leetcode.com/problems/number-of-1-bits/' },
  { name: 'Counting Bits', difficulty: 'Easy', pattern: 'Bit Manipulation', link: 'https://leetcode.com/problems/counting-bits/' },
  { name: 'Missing Number', difficulty: 'Easy', pattern: 'Bit Manipulation', link: 'https://leetcode.com/problems/missing-number/' },
  { name: 'Reverse Bits', difficulty: 'Easy', pattern: 'Bit Manipulation', link: 'https://leetcode.com/problems/reverse-bits/' },
  { name: 'Sum of Two Integers', difficulty: 'Medium', pattern: 'Bit Manipulation', link: 'https://leetcode.com/problems/sum-of-two-integers/' },
  // Hashing
  { name: 'Longest Consecutive Sequence', difficulty: 'Medium', pattern: 'Hashing', link: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
  { name: 'Encode and Decode Strings', difficulty: 'Medium', pattern: 'Hashing', link: 'https://leetcode.com/problems/encode-and-decode-strings/' },
  // Sorting
  { name: 'Merge Intervals', difficulty: 'Medium', pattern: 'Sorting', link: 'https://leetcode.com/problems/merge-intervals/' },
  { name: 'Insert Interval', difficulty: 'Medium', pattern: 'Sorting', link: 'https://leetcode.com/problems/insert-interval/' },
  { name: 'Non-overlapping Intervals', difficulty: 'Medium', pattern: 'Sorting', link: 'https://leetcode.com/problems/non-overlapping-intervals/' },
  // Math
  { name: 'Rotate Image', difficulty: 'Medium', pattern: 'Math', link: 'https://leetcode.com/problems/rotate-image/' },
  { name: 'Spiral Matrix', difficulty: 'Medium', pattern: 'Math', link: 'https://leetcode.com/problems/spiral-matrix/' },
  { name: 'Set Matrix Zeroes', difficulty: 'Medium', pattern: 'Math', link: 'https://leetcode.com/problems/set-matrix-zeroes/' },
];

export const DEFAULT_AROGYACARE_TASKS = [
  { id: 'ac1', task: 'LangGraph multi-agent: missed-dose detector + family-escalation agent', status: 'todo', notes: '', dateAdded: '2026-04-18', dateCompleted: null },
  { id: 'ac2', task: 'Natural-language chat for patients (RAG over medical FAQ corpus)', status: 'todo', notes: '', dateAdded: '2026-04-18', dateCompleted: null },
  { id: 'ac3', task: 'Deploy publicly: Vercel (frontend) + Railway/Render (backend)', status: 'todo', notes: '', dateAdded: '2026-04-18', dateCompleted: null },
  { id: 'ac4', task: 'Record 90-sec demo video for resume + LinkedIn', status: 'todo', notes: '', dateAdded: '2026-04-18', dateCompleted: null },
];
