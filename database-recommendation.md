# Database Recommendation for Ragline Backend

## Overview
Analysis of database options for adding user authentication to the existing document processing API, which currently uses DynamoDB for document metadata storage.

## Requirements
- Add user authentication with admin and regular users
- Admin can create other user accounts
- No relationships between users and documents
- Maintain existing document processing functionality

## Final Recommendation: **DynamoDB for Both Users and Documents**

### Database Design

#### Documents Table (Existing - No Changes)
```typescript
{
  documentId: string (PK)
  fileName: string
  status: 'pending' | 'running' | 'finished' | 'failed'
  size: number
  mimetype: string
  createdAt: string
}
```

#### Users Table (New)
```typescript
{
  userName: string (PK)  // Primary key - enables direct O(1) lookups
  hashedPassword: string // bcrypt hash
  role: 'admin' | 'user'
  createdAt: string
}
```

### Key Benefits

1. **Architectural Consistency**
   - Single database technology across the entire system
   - Maintains serverless architecture (no instances to manage)
   - Consistent repository patterns and error handling

2. **Optimal Performance & Cost**
   - Document metadata operations remain unchanged and optimal
   - User authentication via direct PK lookups (no GSI needed)
   - Pay-per-use scaling appropriate for user count

3. **Implementation Simplicity**
   - Extend existing AppRepository with user methods
   - Use standard bcrypt for password hashing
   - Minimal migration effort (additive changes only)

4. **Future-Proof**
   - Easy to add user fields (lastLogin, email, etc.)
   - Can scale to hundreds of users efficiently
   - Option to migrate to RDS later if complex user features are needed

### Implementation Approach

```typescript
// Add to existing AppRepository
async createUser(userName: string, password: string, role: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  // Store in DynamoDB users table
}

async authenticateUser(userName: string, password: string) {
  // Get user by PK, compare with bcrypt
}
```

### Alternative Considered: RDS PostgreSQL

**Why not chosen:**
- Over-engineered for simple user authentication needs
- Would require complete migration of working document storage
- Introduces instance management to serverless architecture
- Higher cost and complexity without proportional benefits

### Decision Factors

- **Documents work perfectly in DynamoDB** - don't fix what's not broken
- **Users are simple enough** - basic auth doesn't justify architectural change
- **No relationships** - eliminates main advantage of relational databases
- **Scale appropriate** - DynamoDB handles both use cases efficiently

### When to Reconsider

Consider migrating to RDS if you later need:
- Complex user permissions and roles
- Advanced reporting across users and documents
- Audit trails and user activity logs
- Hundreds of users with complex management features

---

**Recommendation:** Proceed with DynamoDB for both users and documents using userName as primary key for the users table.