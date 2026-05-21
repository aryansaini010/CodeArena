import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from '../models/Problem';
import connectDB from './db';

dotenv.config();

const problems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    description:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    examples: [
      { inputText: 'nums = [2,7,11,15], target = 9', outputText: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { inputText: 'nums = [3,2,4], target = 6', outputText: '[1,2]', explanation: '' },
      { inputText: 'nums = [3,3], target = 6', outputText: '[0,1]', explanation: '' },
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
    testCases: [
      { input: '[2,7,11,15]\n9', output: '[0,1]' },
      { input: '[3,2,4]\n6', output: '[1,2]' },
      { input: '[3,3]\n6', output: '[0,1]' },
    ],
    starterCode: [
      { language: 'javascript', code: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};' },
      { language: 'python', code: 'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass' },
      { language: 'cpp', code: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};' },
      { language: 'java', code: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}' },
    ],
    editorial: 'Use a hash map to store complement values as you iterate through the array.',
    tags: ['Array', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Facebook', 'Apple', 'Microsoft'],
  },
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'Easy',
    description:
      'Given the `head` of a singly linked list, reverse the list, and return *the reversed list*.',
    examples: [
      { inputText: 'head = [1,2,3,4,5]', outputText: '[5,4,3,2,1]', explanation: '' },
      { inputText: 'head = [1,2]', outputText: '[2,1]', explanation: '' },
      { inputText: 'head = []', outputText: '[]', explanation: '' },
    ],
    constraints: ['The number of nodes in the list is the range [0, 5000].', '-5000 <= Node.val <= 5000'],
    testCases: [
      { input: '[1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: '[1,2]', output: '[2,1]' },
    ],
    starterCode: [
      { language: 'javascript', code: '/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar reverseList = function(head) {\n    \n};' },
      { language: 'python', code: 'class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass' },
      { language: 'cpp', code: 'class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};' },
      { language: 'java', code: 'class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}' },
    ],
    editorial: 'Iteratively reverse links or use recursion.',
    tags: ['Linked List', 'Recursion'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    description:
      'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    examples: [
      { inputText: 's = "()"', outputText: 'true', explanation: '' },
      { inputText: 's = "()[]{}"', outputText: 'true', explanation: '' },
      { inputText: 's = "(]"', outputText: 'false', explanation: '' },
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only `()[]{}`.'],
    testCases: [
      { input: '()', output: 'true' },
      { input: '()[]{}', output: 'true' },
      { input: '(]', output: 'false' },
    ],
    starterCode: [
      { language: 'javascript', code: '/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};' },
      { language: 'python', code: 'class Solution:\n    def isValid(self, s: str) -> bool:\n        pass' },
      { language: 'cpp', code: 'class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};' },
      { language: 'java', code: 'class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}' },
    ],
    editorial: 'Use a stack data structure.',
    tags: ['String', 'Stack'],
    companies: ['Google', 'Amazon', 'Facebook'],
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    difficulty: 'Medium',
    description:
      'Given an integer array `nums`, find the subarray with the largest sum, and return *its sum*.',
    examples: [
      { inputText: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', outputText: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { inputText: 'nums = [1]', outputText: '1', explanation: '' },
      { inputText: 'nums = [5,4,-1,7,8]', outputText: '23', explanation: '' },
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', output: '6' },
      { input: '[1]', output: '1' },
      { input: '[5,4,-1,7,8]', output: '23' },
    ],
    starterCode: [
      { language: 'javascript', code: '/**\n * @param {number[]} nums\n * @return {number}\n */\nvar maxSubArray = function(nums) {\n    \n};' },
      { language: 'python', code: 'class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        pass' },
      { language: 'cpp', code: 'class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};' },
      { language: 'java', code: 'class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}' },
    ],
    editorial: "Use Kadane's Algorithm — track max ending here and global max.",
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    companies: ['Amazon', 'Apple', 'Microsoft', 'Google'],
  },
  {
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    difficulty: 'Easy',
    description:
      'You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn *the head of the merged linked list*.',
    examples: [
      { inputText: 'list1 = [1,2,4], list2 = [1,3,4]', outputText: '[1,1,2,3,4,4]', explanation: '' },
      { inputText: 'list1 = [], list2 = []', outputText: '[]', explanation: '' },
      { inputText: 'list1 = [], list2 = [0]', outputText: '[0]', explanation: '' },
    ],
    constraints: ['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100'],
    testCases: [
      { input: '[1,2,4]\n[1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: '[]\n[]', output: '[]' },
    ],
    starterCode: [
      { language: 'javascript', code: '/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nvar mergeTwoLists = function(list1, list2) {\n    \n};' },
      { language: 'python', code: 'class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        pass' },
      { language: 'cpp', code: 'class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};' },
      { language: 'java', code: 'class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}' },
    ],
    editorial: 'Use a dummy head and iterate through both lists.',
    tags: ['Linked List', 'Recursion'],
    companies: ['Amazon', 'Microsoft', 'Google'],
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    description:
      'Given a string `s`, find the length of the **longest substring** without repeating characters.',
    examples: [
      { inputText: 's = "abcabcbb"', outputText: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { inputText: 's = "bbbbb"', outputText: '1', explanation: 'The answer is "b", with the length of 1.' },
      { inputText: 's = "pwwkew"', outputText: '3', explanation: 'The answer is "wke", with the length of 3.' },
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    testCases: [
      { input: 'abcabcbb', output: '3' },
      { input: 'bbbbb', output: '1' },
      { input: 'pwwkew', output: '3' },
    ],
    starterCode: [
      { language: 'javascript', code: '/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    \n};' },
      { language: 'python', code: 'class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass' },
      { language: 'cpp', code: 'class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};' },
      { language: 'java', code: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}' },
    ],
    editorial: 'Use sliding window technique with a set or hash map.',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'],
  },
  {
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    difficulty: 'Hard',
    description:
      'Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return **the median** of the two sorted arrays.\n\nThe overall run time complexity should be `O(log (m+n))`.',
    examples: [
      { inputText: 'nums1 = [1,3], nums2 = [2]', outputText: '2.00000', explanation: 'merged array = [1,2,3] and median is 2.' },
      { inputText: 'nums1 = [1,2], nums2 = [3,4]', outputText: '2.50000', explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.' },
    ],
    constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m <= 1000', '0 <= n <= 1000', '1 <= m + n <= 2000', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
    testCases: [
      { input: '[1,3]\n[2]', output: '2.00000' },
      { input: '[1,2]\n[3,4]', output: '2.50000' },
    ],
    starterCode: [
      { language: 'javascript', code: '/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n    \n};' },
      { language: 'python', code: 'class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        pass' },
      { language: 'cpp', code: 'class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};' },
      { language: 'java', code: 'class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}' },
    ],
    editorial: 'Use binary search on the shorter array to partition both arrays.',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    companies: ['Google', 'Amazon', 'Goldman Sachs', 'Apple'],
  },
  {
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    difficulty: 'Medium',
    description:
      'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn *the maximum amount of water a container can store*.',
    examples: [
      { inputText: 'height = [1,8,6,2,5,4,8,3,7]', outputText: '49', explanation: '' },
      { inputText: 'height = [1,1]', outputText: '1', explanation: '' },
    ],
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    testCases: [
      { input: '[1,8,6,2,5,4,8,3,7]', output: '49' },
      { input: '[1,1]', output: '1' },
    ],
    starterCode: [
      { language: 'javascript', code: '/**\n * @param {number[]} height\n * @return {number}\n */\nvar maxArea = function(height) {\n    \n};' },
      { language: 'python', code: 'class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        pass' },
      { language: 'cpp', code: 'class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};' },
      { language: 'java', code: 'class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}' },
    ],
    editorial: 'Two pointer approach from both ends.',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    companies: ['Amazon', 'Google', 'Facebook'],
  },
];

const seed = async () => {
  await connectDB();
  await Problem.deleteMany({});
  await Problem.insertMany(problems);
  console.log('Seed data inserted successfully!');
  mongoose.connection.close();
};

seed().catch(console.error);
