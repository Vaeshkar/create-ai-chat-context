# Code Standards - October 2025

**Last Updated:** October 13, 2025  
**Status:** Active - v2.0.0 Modernization

---

## 🎯 Philosophy

**"Small things, with love"** (Mach kleine dinge und mit liebe) - Meno Abels

- Write code you'd be proud to show a 53-year veteran programmer
- Every line should have a purpose
- If you can't explain why a line exists, delete it
- Prefer simple over clever
- Prefer explicit over implicit
- Prefer boring over exciting
- **Writing less is more** - But not at the cost of clarity

---

## 🏗️ Language & Runtime

### TypeScript 5.7+ (Strict Mode)
```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noImplicitReturns": true,
  "noUncheckedIndexedAccess": true
}
```

### ESM Only
- ✅ Use `import`/`export`
- ❌ Never `require()`/`module.exports`
- ✅ File extensions in imports: `import { foo } from './bar.js'`

### Node.js 20+ (LTS)
- Use modern APIs (native `fetch`, `crypto`, etc.)
- Target: ES2022 (async/await, optional chaining, nullish coalescing)

---

## 📏 Function Design

### Size Limits
- **Maximum 50 lines** per function (including comments and blank lines)
- If longer, break into smaller functions
- Each function should fit on one screen

### Single Responsibility
```typescript
// ❌ Bad - Does too much
function processUserAndSendEmail(userId: string) {
  const user = getUser(userId);
  validateUser(user);
  const email = formatEmail(user);
  sendEmail(email);
}

// ✅ Good - Each function does one thing
function processUser(userId: string): User {
  const user = getUser(userId);
  validateUser(user);
  return user;
}

function notifyUser(user: User): void {
  const email = formatEmail(user);
  sendEmail(email);
}
```

### Pure Functions Preferred
```typescript
// ✅ Good - Pure function (same input = same output)
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Bad - Side effects (modifies external state)
let total = 0;
function addToTotal(item: Item): void {
  total += item.price;
}
```

### Return Typed Results
```typescript
// ❌ Bad - Returns void, no way to know if it succeeded
function saveFile(path: string, content: string): void {
  fs.writeFileSync(path, content);
}

// ✅ Good - Returns result, caller can handle success/failure
function saveFile(path: string, content: string): Result<void> {
  try {
    fs.writeFileSync(path, content);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
```

---

## 🔒 Type Safety

### No `any` Types
```typescript
// ❌ Bad
function process(data: any) {
  return data.value;
}

// ✅ Good - Use unknown and narrow
function process(data: unknown): string {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return String(data.value);
  }
  throw new ValidationError('Invalid data structure');
}
```

### No `as` Casts (Use Type Guards)
```typescript
// ❌ Bad
const user = data as User;

// ✅ Good - Type guard
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data
  );
}

if (isUser(data)) {
  // TypeScript knows data is User here
  console.log(data.name);
}
```

### Explicit Return Types
```typescript
// ❌ Bad - Inferred return type
function getUser(id: string) {
  return db.query('SELECT * FROM users WHERE id = ?', [id]);
}

// ✅ Good - Explicit return type
async function getUserById(id: string): Promise<User | null> {
  const result = await db.query<User>('SELECT * FROM users WHERE id = ?', [id]);
  return result ?? null;
}
```

### Strict Null Checks
```typescript
// ❌ Bad - Doesn't handle null
function greet(name: string | null) {
  return `Hello, ${name.toUpperCase()}!`; // Runtime error if null
}

// ✅ Good - Handles null explicitly
function greet(name: string | null): string {
  if (name === null) {
    return 'Hello, Guest!';
  }
  return `Hello, ${name.toUpperCase()}!`;
}

// ✅ Better - Use nullish coalescing
function greet(name: string | null): string {
  return `Hello, ${(name ?? 'Guest').toUpperCase()}!`;
}
```

### Discriminated Unions
```typescript
// ✅ Good - Type-safe result handling
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Error };

function processResult<T>(result: Result<T>): void {
  if (result.success) {
    console.log(result.data); // TypeScript knows data exists
  } else {
    console.error(result.error); // TypeScript knows error exists
  }
}
```

---

## 🚨 Error Handling

### Throw Typed Errors
```typescript
// ❌ Bad - Generic error
throw new Error('File not found');

// ✅ Good - Custom typed error
throw new FileOperationError('read', filePath, originalError);
```

### Never Swallow Errors
```typescript
// ❌ Bad - Silent failure
try {
  await saveFile(path, content);
} catch (error) {
  // Nothing - error is lost
}

// ✅ Good - Handle or propagate
try {
  await saveFile(path, content);
} catch (error) {
  logger.error('Failed to save file', { path, error });
  throw new FileOperationError('write', path, error);
}
```

### Validate Inputs
```typescript
// ✅ Good - Validate at function entry
function getUserById(id: string): Promise<User> {
  if (!id || id.trim().length === 0) {
    throw new ValidationError('User ID cannot be empty');
  }
  
  if (!/^[a-zA-Z0-9-]+$/.test(id)) {
    throw new ValidationError('User ID contains invalid characters');
  }
  
  return db.users.findById(id);
}
```

### Fail Fast
```typescript
// ✅ Good - Early returns (guard clauses)
function processOrder(order: Order): void {
  if (!order) {
    throw new ValidationError('Order is required');
  }
  
  if (order.items.length === 0) {
    throw new ValidationError('Order must have at least one item');
  }
  
  if (order.total <= 0) {
    throw new ValidationError('Order total must be positive');
  }
  
  // Process order...
}
```

### Provide Context
```typescript
// ❌ Bad - Vague error
throw new Error('Invalid input');

// ✅ Good - Specific context
throw new ValidationError(
  `Invalid email format: "${email}". Expected format: user@domain.com`
);
```

---

## 🧪 Testing Requirements

### Every Function Must Have Tests
```typescript
// src/utils/format.ts
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

// tests/utils/format.test.ts
describe('formatCurrency', () => {
  it('should format positive numbers', () => {
    expect(formatCurrency(10.5)).toBe('$10.50');
  });
  
  it('should format zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
  
  it('should format negative numbers', () => {
    expect(formatCurrency(-5.99)).toBe('$-5.99');
  });
  
  it('should round to 2 decimal places', () => {
    expect(formatCurrency(10.999)).toBe('$11.00');
  });
});
```

### Test Structure: Arrange, Act, Assert
```typescript
it('should create user with valid data', async () => {
  // Arrange
  const userData = { name: 'John', email: 'john@example.com' };
  
  // Act
  const user = await createUser(userData);
  
  // Assert
  expect(user.name).toBe('John');
  expect(user.email).toBe('john@example.com');
  expect(user.id).toBeDefined();
});
```

### Test Cases Required
1. **Happy path** - Normal, expected usage
2. **Error cases** - Invalid inputs, failures
3. **Edge cases** - Boundaries, empty values, null/undefined

### Descriptive Test Names
```typescript
// ❌ Bad
it('works', () => { ... });

// ✅ Good
it('should throw FileOperationError when file does not exist', () => { ... });
it('should return empty array when no users match criteria', () => { ... });
it('should handle concurrent requests without data corruption', () => { ... });
```

---

## 📁 Code Organization

### Import Order
```typescript
// 1. Node built-ins
import { readFile } from 'fs/promises';
import { join } from 'path';

// 2. External dependencies
import chalk from 'chalk';
import { Command } from 'commander';

// 3. Internal modules (absolute paths)
import type { User } from '../types/index.js';
import { logger } from '../utils/logger.js';
import { validateEmail } from './validation.js';
```

### Types Before Implementation
```typescript
// ✅ Good - Define types first
interface UserData {
  name: string;
  email: string;
}

interface CreateUserResult {
  success: boolean;
  user?: User;
  error?: Error;
}

// Then implement
async function createUser(data: UserData): Promise<CreateUserResult> {
  // Implementation...
}
```

### Export Patterns
```typescript
// ✅ Option 1: Export on declaration
export function formatDate(date: Date): string {
  return date.toISOString();
}

// ✅ Option 2: Export at bottom
function formatDate(date: Date): string {
  return date.toISOString();
}

export { formatDate };

// ✅ Option 3: Barrel exports (index.ts)
export { formatDate } from './format.js';
export { validateEmail } from './validation.js';
```

---

## 🏷️ Naming Conventions

### Functions
- `camelCase`
- Verb-first: `getUserById`, `validateEmail`, `formatCurrency`

### Types/Interfaces
- `PascalCase`
- Descriptive: `UserProfile`, `CommandOptions`, `FileStats`

### Constants
- `UPPER_SNAKE_CASE`
- `MAX_RETRIES`, `DEFAULT_TIMEOUT`, `API_BASE_URL`

### Files
- `kebab-case.ts`
- `file-system.ts`, `user-service.ts`, `error-handler.ts`

### Booleans
- Prefix with `is`/`has`/`should`/`can`
- `isValid`, `hasError`, `shouldRetry`, `canAccess`

---

## 📝 Documentation

### JSDoc for Public APIs
```typescript
/**
 * Retrieves a user by their unique identifier
 * 
 * @param id - The user's unique identifier
 * @returns The user object if found
 * @throws {UserNotFoundError} When user doesn't exist
 * @throws {ValidationError} When ID format is invalid
 * 
 * @example
 * ```typescript
 * const user = await getUserById('user-123');
 * console.log(user.name);
 * ```
 */
export async function getUserById(id: string): Promise<User> {
  // Implementation...
}
```

### Inline Comments (Sparingly)
```typescript
// ✅ Good - Explains WHY
// Use exponential backoff to avoid overwhelming the API
await delay(Math.pow(2, retryCount) * 1000);

// ❌ Bad - Explains WHAT (obvious from code)
// Increment the counter
counter++;
```

---

## ⚠️ What to Avoid

- ❌ `any` type
- ❌ `as` type assertions (use type guards)
- ❌ `require()` / `module.exports`
- ❌ Functions over 50 lines
- ❌ Nested callbacks (use async/await)
- ❌ Mutable global state
- ❌ `console.log` (use logger utility)
- ❌ Magic numbers (use named constants)
- ❌ Deep nesting (max 3 levels)
- ❌ Abbreviations in names (`usr` → `user`, `btn` → `button`)

---

## ✅ Preferred Patterns

### Early Returns (Guard Clauses)
```typescript
// ✅ Good
function processUser(user: User | null): void {
  if (!user) return;
  if (!user.isActive) return;
  if (!user.email) return;
  
  sendEmail(user.email);
}
```

### Destructuring
```typescript
// ✅ Good
const { name, email, age } = user;
const [first, ...rest] = items;
```

### Optional Chaining & Nullish Coalescing
```typescript
// ✅ Good
const userName = user?.profile?.name ?? 'Guest';
```

### Array Methods Over Loops
```typescript
// ✅ Good
const activeUsers = users.filter(u => u.isActive);
const userNames = users.map(u => u.name);
const total = prices.reduce((sum, price) => sum + price, 0);
```

### Const Over Let
```typescript
// ✅ Good
const items = [1, 2, 3];

// ❌ Bad
let items = [1, 2, 3];
```

### Template Literals
```typescript
// ✅ Good
const message = `Hello, ${name}! You have ${count} messages.`;

// ❌ Bad
const message = 'Hello, ' + name + '! You have ' + count + ' messages.';
```

### Async/Await Over Promise Chains
```typescript
// ✅ Good
async function getUser(id: string): Promise<User> {
  const data = await fetchUser(id);
  const profile = await fetchProfile(data.profileId);
  return { ...data, profile };
}

// ❌ Bad
function getUser(id: string): Promise<User> {
  return fetchUser(id)
    .then(data => fetchProfile(data.profileId))
    .then(profile => ({ ...data, profile }));
}
```

---

## ✅ Code Review Checklist

Before committing code, verify:

- [ ] `pnpm typecheck` passes (no type errors)
- [ ] `pnpm test` passes (all tests green)
- [ ] `pnpm lint` passes (no linting errors)
- [ ] `pnpm format` applied (code formatted)
- [ ] No `any` types used
- [ ] All functions < 50 lines
- [ ] All functions have tests
- [ ] Error handling present
- [ ] JSDoc on public functions
- [ ] No `console.log` statements
- [ ] Imports organized correctly
- [ ] No magic numbers (use constants)
- [ ] Descriptive variable names

---

## 📚 References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Meno's ts-xxhash](https://github.com/mabels/ts-xxhash) - Reference implementation
- [Vitest Documentation](https://vitest.dev/)
- [ESLint TypeScript](https://typescript-eslint.io/)

---

**Remember:** "Small things, with love" 🪵

