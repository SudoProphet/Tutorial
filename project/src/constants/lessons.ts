import { Lesson, ProgrammingLanguage } from '../types';

export const SAMPLE_LESSONS: Lesson[] = [
  {
    id: 'intro-algorithms',
    title: 'Introduction to Algorithms',
    description: 'Learn the fundamental concepts of algorithms and their importance in computer science.',
    content: `# Introduction to Algorithms

An algorithm is a step-by-step procedure for solving a problem or completing a task. Think of it as a recipe that a computer can follow.

## Key Characteristics of Algorithms:
1. **Clear and unambiguous** - Each step must be precisely defined
2. **Input** - Algorithms take input data to process
3. **Output** - They produce a result or output
4. **Finite** - Algorithms must terminate after a finite number of steps
5. **Effective** - Each step must be achievable

## Real-World Example: Making a Cup of Coffee
1. Get a coffee mug
2. Add coffee grounds to filter
3. Add water to coffee maker
4. Turn on coffee maker
5. Wait for coffee to brew
6. Pour coffee into mug

This is an algorithm! It's a clear set of instructions that anyone can follow.`,
    language: 'python',
    difficulty: 'beginner',
    estimatedTime: 15,
    points: 50,
    codeExamples: [
      {
        id: 'simple-algorithm',
        title: 'Simple Number Check Algorithm',
        code: `def is_even(number):
    """
    Algorithm to check if a number is even
    Input: An integer
    Output: True if even, False if odd
    """
    if number % 2 == 0:
        return True
    else:
        return False

# Test the algorithm
test_numbers = [2, 3, 4, 5, 10]
for num in test_numbers:
    result = is_even(num)
    print(f"{num} is {'even' if result else 'odd'}")`,
        language: 'python',
        explanation: 'This algorithm demonstrates the basic structure: input (number), process (check remainder), output (True/False).',
        editable: true
      }
    ],
    category: 'algorithms',
    published: true,
    version: 1,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'python-basics',
    title: 'Python Programming Fundamentals',
    description: 'Master the basics of Python programming including variables, data types, and control structures.',
    content: `# Python Programming Fundamentals

Python is an excellent first programming language due to its clear, readable syntax and powerful capabilities.

## Variables and Data Types

Variables are containers for storing data values. Python has several built-in data types:

- **Integers**: Whole numbers (1, 2, 3, -5)
- **Floats**: Decimal numbers (3.14, -2.5)
- **Strings**: Text ("Hello", 'World')
- **Booleans**: True or False values

## Basic Operations

Python supports arithmetic operations, string manipulation, and logical operations.`,
    language: 'python',
    difficulty: 'beginner',
    estimatedTime: 25,
    points: 75,
    codeExamples: [
      {
        id: 'python-variables',
        title: 'Working with Variables',
        code: `# Different data types in Python
name = "Alice"           # String
age = 16                 # Integer
height = 5.6             # Float
is_student = True        # Boolean

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height} feet")
print(f"Is student: {is_student}")

# Basic arithmetic
birth_year = 2024 - age
print(f"Birth year: {birth_year}")

# String operations
greeting = "Hello, " + name + "!"
print(greeting)`,
        language: 'python',
        explanation: 'This example shows how to create variables of different types and perform basic operations.',
        editable: true
      }
    ],
    category: 'programming-fundamentals',
    published: true,
    version: 1,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: 'data-structures-arrays',
    title: 'Understanding Arrays and Lists',
    description: 'Explore the fundamental data structure of arrays and how they store collections of data.',
    content: `# Arrays and Lists

Arrays (called lists in Python) are fundamental data structures that store collections of elements in a specific order.

## Key Concepts:
- **Index**: Position of an element (starts at 0)
- **Length**: Number of elements in the array
- **Element**: Individual item stored in the array

## Common Operations:
- Access elements by index
- Add new elements
- Remove elements
- Search for elements
- Iterate through all elements`,
    language: 'python',
    difficulty: 'beginner',
    estimatedTime: 20,
    points: 60,
    codeExamples: [
      {
        id: 'array-operations',
        title: 'Array Operations in Python',
        code: `# Creating a list (array) of favorite subjects
subjects = ["Math", "Science", "History", "Art"]

print("Original list:", subjects)
print("First subject:", subjects[0])
print("Last subject:", subjects[-1])
print("Number of subjects:", len(subjects))

# Adding elements
subjects.append("Music")
subjects.insert(1, "English")
print("After adding:", subjects)

# Removing elements
subjects.remove("History")
print("After removing History:", subjects)

# Iterating through the list
print("All subjects:")
for i, subject in enumerate(subjects):
    print(f"{i + 1}. {subject}")`,
        language: 'python',
        explanation: 'This demonstrates the basic operations you can perform on arrays/lists.',
        editable: true
      }
    ],
    category: 'data-structures',
    published: true,
    version: 1,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  }
];