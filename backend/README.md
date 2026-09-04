# E-Commerce Backend - Project Development Journey

## Project Overview

This is a **Node.js/TypeScript e-commerce backend** built with Express, Prisma ORM, and PostgreSQL. The project implements user authentication, product management, shopping cart, orders, and payments.

---

## Development Timeline: From 0 to Current State

### Phase 1: Project Initialization

- Created a TypeScript Node.js backend project
- Set up package.json with dependencies:
  - **Express** - Web framework
  - **Prisma** - ORM for database management
  - **TypeScript** - Type safety
  - **bcrypt** - Password hashing
  - **jsonwebtoken (JWT)** - Authentication tokens
  - **Zod** - Schema validation
  - **PostgreSQL** - Database

### Phase 2: Database Setup with Prisma

- Initialized Prisma configuration
- Created `prisma/schema.prisma` with models:
  - **User** - User accounts with email, password, username, avatar
  - **Product** - E-commerce products with pricing and status
  - **ProductVariant** - Product variants (color, size, images)
  - **Category** - Product categories
  - **Cart** - Shopping cart
  - **CartItem** - Items in cart
  - **Order** - Customer orders
  - **OrderItem** - Items in orders
  - **Payment** - Payment information
  - **ShippingAddress** - Shipping details
  - **Wishlist** - User wishlists
  - **WishlistItem** - Items in wishlists
  - **Enums** - OrderStatus, ProductStatus, PaymentStatus, PaymentMethod

- Generated Prisma Client to `generated/prisma/` directory
- Created migrations:
  - `20260826225924_init` - Initial schema
  - `20260902144845_update_schema` - Schema updates
  - `20260902155819_update_user_schema` - User model updates

### Phase 3: Project Structure & File Organization

```
src/
├── app.ts              - Express app setup
├── server.ts           - Server entry point
├── config/
│   └── database.ts     - Prisma client configuration
├── controllers/
│   └── auth.controller.ts - Authentication endpoints
├── repositories/
│   └── auth.repository.ts - Database operations layer
├── routes/
│   └── auth.routes.ts  - Auth route definitions
├── services/
│   └── auth.service.ts - Business logic layer
├── utils/
│   ├── hash.ts         - Password hashing utilities
│   └── jwt.ts          - JWT token utilities
├── validations/
│   └── auth.validation.ts - Input validation schemas
├── middleware/         - (Empty, for future middleware)
└── types/             - (Empty, for future type definitions)
```

### Phase 4: Authentication Implementation

#### User Model Setup

- Added User model to Prisma schema with fields:
  - `id` - UUID primary key
  - `email` - Unique email
  - `password` - Hashed password (required, non-optional)
  - `username` - Optional username
  - `avatar` - Optional profile picture
  - `createdAt` & `updatedAt` - Timestamps

#### Repository Layer (`auth.repository.ts`)

- **findUserByEmail()** - Query user by email
- **findUserByUsername()** - Query user by username
- **createUser()** - Create new user with email and hashed password

#### Service Layer (`auth.service.ts`)

- **register()** - User registration with:
  - Email existence check
  - Username uniqueness validation
  - Password hashing using bcrypt
  - JWT token generation
  - Safe user response (password excluded)
- **login()** - User login with:
  - Email verification
  - Password comparison
  - JWT token generation
  - Safe user response

#### Validation (`auth.validation.ts`)

- **registerSchema** - Validates username, email, password (min 6 chars)
- **loginSchema** - Validates email and password
- Zod-based type-safe validation with error messages

#### Utilities

- **hash.ts** - Password hashing and comparison using bcrypt
- **jwt.ts** - JWT token generation and verification

### Phase 5: Bug Fixes & Refinements

#### Initial Issues Found

1. **Missing imports** - User type and repository functions were undefined
2. **Import path errors** - Used `@/` alias which wasn't configured
3. **Field name mismatch** - Referenced `password` but schema had `hashedPassword`
4. **Validation schema mismatch** - Register schema missing required fields
5. **Type errors** - AuthResponse type referencing non-existent fields

#### Fixes Applied

1. ✅ Added all necessary imports (User type, repository functions, comparePassword)
2. ✅ Fixed import paths from `@/generated/prisma/client` to `../../generated/prisma/client`
3. ✅ Changed validation schema to match actual User model fields
4. ✅ Used correct field name `password` (not `hashedPassword`)
5. ✅ Updated AuthResponse interface to `Omit<User, "password">`
6. ✅ Regenerated Prisma Client after schema changes

---

## Current Architecture

### Three-Layer Architecture

```
Routes (auth.routes.ts)
    ↓
Controllers (auth.controller.ts) - Handle HTTP requests
    ↓
Services (auth.service.ts) - Business logic
    ↓
Repositories (auth.repository.ts) - Database access
    ↓
Prisma Client → PostgreSQL
```

### Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **Password Hashing**: bcrypt (10 salt rounds)

---

## Key Design Decisions

1. **Separation of Concerns** - Repository, Service, and Controller layers keep logic organized
2. **Type Safety** - TypeScript and Zod ensure compile-time and runtime type validation
3. **Security** - Passwords are hashed with bcrypt and excluded from API responses
4. **Flexibility** - Prisma ORM allows easy database migrations and type-safe queries
5. **Scalability** - Layer-based architecture allows easy feature expansion

---

## Next Steps (To be implemented)

- [ ] Product CRUD operations
- [ ] Shopping cart management
- [ ] Order processing
- [ ] Payment integration (Stripe)
- [ ] User profile management
- [ ] Wishlist functionality
- [ ] Admin dashboard endpoints
- [ ] Error handling middleware
- [ ] Logging system
- [ ] API documentation (Swagger/OpenAPI)

---

## How to Run

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start the server
npm run dev
```

---

## File Structure Summary

| File                                  | Purpose                                        |
| ------------------------------------- | ---------------------------------------------- |
| `src/app.ts`                          | Express app configuration and middleware setup |
| `src/server.ts`                       | Server startup and port listening              |
| `src/config/database.ts`              | Prisma client instance                         |
| `src/services/auth.service.ts`        | Registration & login logic                     |
| `src/repositories/auth.repository.ts` | Database queries for users                     |
| `src/controllers/auth.controller.ts`  | HTTP request handlers                          |
| `src/routes/auth.routes.ts`           | Route definitions                              |
| `src/validations/auth.validation.ts`  | Input validation schemas                       |
| `src/utils/hash.ts`                   | Password hashing utilities                     |
| `src/utils/jwt.ts`                    | JWT token utilities                            |
| `prisma/schema.prisma`                | Database schema definition                     |

---

## Lessons Learned

1. **Import paths matter** - Always verify that import paths match your TypeScript configuration
2. **Schema consistency** - Keep Prisma schema field names aligned across the entire codebase
3. **Type safety prevents bugs** - TypeScript catches many errors at compile time
4. **Validation is critical** - Zod schemas ensure data integrity at the API boundary
5. **Regenerate Prisma** - After schema changes, always regenerate the Prisma Client

---

**Project Status**: ✅ Authentication system complete and working  
**Last Updated**: September 4, 2026
