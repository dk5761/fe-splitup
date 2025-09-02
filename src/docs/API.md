# SplitUp API Contract

This document outlines the API contract for the SplitUp backend.

**Base URL:** `/api/v1`

**Authentication:** All protected routes require a `Authorization` header with a Bearer token: `Authorization: Bearer <access_token>`.

**Currency:** All monetary amounts are in INR (Indian Rupees).

**Pagination:** All paginated endpoints use standardized pagination with `limit` and `offset` query parameters.

---

## Auth Module

**Base Path:** `/api/v1/auth`

### 1. Register

- **Description:** Registers a new user.
- **Endpoint:** `POST /register`
- **Request Body:**
  ```json
  {
    "name": "string",
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response Body:**
  ```json
  {
    "user": {
      "id": "uuid",
      "name": "string",
      "username": "string",
      "email": "string"
    },
    "access_token": "string",
    "refresh_token": "string"
  }
  ```

### 2. Login

- **Description:** Logs in a user.
- **Endpoint:** `POST /login`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response Body:**
  ```json
  {
    "user": {
      "id": "uuid",
      "name": "string",
      "username": "string",
      "email": "string"
    },
    "access_token": "string",
    "refresh_token": "string"
  }
  ```

### 3. Refresh Token

- **Description:** Refreshes the access token using a refresh token.
- **Endpoint:** `POST /refresh`
- **Request Body:**
  ```json
  {
    "refresh_token": "string"
  }
  ```
- **Response Body:**
  ```json
  {
    "access_token": "string",
    "refresh_token": "string"
  }
  ```

### 4. Logout

- **Description:** Logs out the user and invalidates the refresh token.
- **Endpoint:** `POST /logout`
- **Request Body:**
  ```json
  {
    "refresh_token": "string"
  }
  ```
- **Response:** `200 OK` with `{"message": "Logged out successfully"}`

### 5. Check Username

- **Description:** Checks if a username is available.
- **Endpoint:** `GET /check-username?username={username}`
- **Response:** `200 OK` with `{"exists": boolean}`

### 6. Forgot Password

- **Description:** Initiates the password reset process.
- **Endpoint:** `POST /forgot-password`
- **Request Body:**
  ```json
  {
    "email": "string"
  }
  ```
- **Response:** `200 OK` with `{"message": "If a user with that email exists, a password reset link has been sent."}`

### 7. Reset Password

- **Description:** Resets the password using a token.
- **Endpoint:** `POST /reset-password`
- **Request Body:**
  ```json
  {
    "token": "string",
    "new_password": "string"
  }
  ```
- **Response:** `200 OK` with `{"message": "Password has been reset successfully."}`

---

## User Module

**Base Path:** `/api/v1/user` (Protected)

### 1. Get Profile

- **Description:** Gets the current user's profile.
- **Endpoint:** `GET /me`
- **Response Body:**
  ```json
  {
    "id": "uuid",
    "name": "string",
    "username": "string",
    "email": "string",
    "upi_id": "string",
    "profile_image_url": "string"
  }
  ```

### 2. Update Profile

- **Description:** Updates the current user's profile.
- **Endpoint:** `PATCH /me`
- **Request Body:**
  ```json
  {
    "name": "string",
    "username": "string",
    "upi_id": "string",
    "profile_image_key": "string"
  }
  ```
- **Response Body:**
  ```json
  {
    "id": "uuid",
    "name": "string",
    "username": "string",
    "email": "string",
    "upi_id": "string",
    "profile_image_url": "string"
  }
  ```

### 3. Change Password

- **Description:** Changes the current user's password.
- **Endpoint:** `POST /change-password`
- **Request Body:**
  ```json
  {
    "current_password": "string",
    "new_password": "string"
  }
  ```
- **Response:** `200 OK` with `{"message": "Password changed successfully"}`

### 4. Delete Account

- **Description:** Deletes the current user's account.
- **Endpoint:** `DELETE /me`
- **Response:** `200 OK` with `{"message": "Account deleted successfully"}`

### 5. Search Users

- **Description:** Searches for users by name or email.
- **Endpoint:** `GET /search`
- **Query Parameters:**
  - `q` (string, required): Search query
  - `limit` (int, optional): Number of results per page (default: 10, max: 100)
  - `offset` (int, optional): Number of results to skip (default: 0)
- **Response Body:**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "name": "string",
        "username": "string",
        "email": "string",
        "profile_image_url": "string"
      }
    ],
    "pagination": {
      "total": 150,
      "limit": 10,
      "offset": 0,
      "next_offset": 10
    }
  }
  ```

### 6. Generate Profile Image Upload URL

- **Description:** Generates a presigned URL for uploading a profile image.
- **Endpoint:** `POST /image/upload-url`
- **Request Body:**
  ```json
  {
    "content_type": "string" // e.g., "image/jpeg"
  }
  ```
- **Response Body:**
  ```json
  {
    "upload_url": "string",
    "image_key": "string"
  }
  ```

---

## Friend Module

**Base Path:** `/api/v1/friends` (Protected)

### 1. Send Friend Request

- **Description:** Sends a friend request to another user.
- **Endpoint:** `POST /requests`
- **Request Body:**
  ```json
  {
    "addressee_id": "uuid"
  }
  ```
- **Response:** `200 OK` with `{"message": "Friend request sent."}`

### 2. Get Pending Friend Requests

- **Description:** Gets pending friend requests for the current user.
- **Endpoint:** `GET /requests`
- **Query Parameters:**
  - `limit` (int, optional): Number of results per page (default: 10, max: 100)
  - `offset` (int, optional): Number of results to skip (default: 0)
- **Response Body:**
  ```json
  {
    "data": [
      {
        "requester_id": "uuid",
        "requester_name": "string",
        "requester_email": "string",
        "requested_at": "timestamp"
      }
    ],
    "pagination": {
      "total": 5,
      "limit": 10,
      "offset": 0,
      "next_offset": null
    }
  }
  ```

### 3. Respond to Friend Request

- **Description:** Accepts or rejects a friend request.
- **Endpoint:** `PUT /requests/{requesterId}`
- **Request Body:**
  ```json
  {
    "action": "accept" // or "reject"
  }
  ```
- **Response:** `200 OK` with `{"message": "Friend request accepted."}`

### 4. List Friends

- **Description:** Lists the current user's friends.
- **Endpoint:** `GET`
- **Query Parameters:**
  - `limit` (int, optional): Number of results per page (default: 10, max: 100)
  - `offset` (int, optional): Number of results to skip (default: 0)
- **Response Body:**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "name": "string",
        "username": "string",
        "email": "string",
        "profile_image_url": "string"
      }
    ],
    "pagination": {
      "total": 25,
      "limit": 10,
      "offset": 0,
      "next_offset": 10
    }
  }
  ```

### 5. Remove Friend

- **Description:** Removes a friend from the current user's friend list.
- **Endpoint:** `DELETE /{friendId}`
- **Response:** `200 OK` with `{"message": "Friend removed."}`

### 6. Get Friend Expenses

- **Description:** Gets expenses shared with a specific friend.
- **Endpoint:** `GET /{friendId}/expenses`
- **Query Parameters:**
  - `limit` (int, optional): Number of results per page (default: 10, max: 100)
  - `offset` (int, optional): Number of results to skip (default: 0)
  - `type` (string, optional): Filter by expense type ("all", "grouped", "non-grouped")
- **Response Body:**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "description": "string",
        "total_amount": "decimal",
        "category": "FOOD",
        "payer": {
          "id": "uuid",
          "name": "string"
        },
        "expense_date": "timestamp",
        "image_url": "string"
      }
    ],
    "pagination": {
      "total": 15,
      "limit": 10,
      "offset": 0,
      "next_offset": 10
    }
  }
  ```

### 7. Settle Expense (Unified Payment Recording)

- **Description:** Records a settlement payment between friends or group members.
- **Endpoint:** `POST /settle`
- **Request Body:**
  ```json
  {
    "to_user_id": "uuid",
    "amount": "decimal",
    "group_id": "uuid", // optional - for group settlements
    "payment_method": "UPI", // "UPI", "CASH", "BANK_TRANSFER", "OTHER"
    "upi_transaction_id": "string", // optional - for UPI payments
    "notes": "string", // optional
    "payment_date": "timestamp" // optional - defaults to now
  }
  ```
- **Response:** `200 OK` with `{"message": "Settlement recorded successfully"}`

### 8. Get Friendship Balance

- **Description:** Gets the balance between the current user and a friend.
- **Endpoint:** `GET /{friendId}/balance`
- **Response Body:**
  ```json
  {
    "balance": "decimal" // positive if friend owes you, negative if you owe friend
  }
  ```

### 9. Get Balance Breakdown

- **Description:** Gets detailed balance breakdown with a friend across groups.
- **Endpoint:** `GET /{friendId}/breakdown`
- **Response Body:**
  ```json
  {
    "friend_id": "uuid",
    "friend_name": "string",
    "total_balance": "decimal",
    "groups": [
      {
        "group_id": "uuid",
        "group_name": "string",
        "balance": "decimal"
      }
    ],
    "direct_balance": "decimal"
  }
  ```

---

## Group Module

**Base Path:** `/api/v1/groups` (Protected)

### 1. Create Group

- **Description:** Creates a new group with members.
- **Endpoint:** `POST`
- **Content-Type:** `multipart/form-data`
- **Request Form Fields:**
  - `group_data` (string, required): JSON string with group details
    ```json
    {
      "name": "string",
      "members": [
        {
          "user_id": "uuid",
          "role": "admin" // or "member"
        }
      ]
    }
    ```
  - `image` (file, optional): Group image
- **Response Body:**
  ```json
  {
    "id": "uuid",
    "name": "string",
    "created_by": "uuid",
    "image_url": "string",
    "member_count": 5,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```

### 2. List Groups

- **Description:** Lists groups the current user is a member of.
- **Endpoint:** `GET`
- **Query Parameters:**
  - `limit` (int, optional): Number of results per page (default: 10, max: 100)
  - `offset` (int, optional): Number of results to skip (default: 0)
- **Response Body:**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "name": "string",
        "created_by": "uuid",
        "image_url": "string",
        "member_count": 5,
        "created_at": "timestamp",
        "updated_at": "timestamp"
      }
    ],
    "pagination": {
      "total": 8,
      "limit": 10,
      "offset": 0,
      "next_offset": null
    }
  }
  ```

### 3. Get Group Details

- **Description:** Gets details of a specific group.
- **Endpoint:** `GET /{groupId}`
- **Response Body:**
  ```json
  {
    "id": "uuid",
    "name": "string",
    "created_by": "uuid",
    "image_url": "string",
    "member_count": 5,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
  ```

### 4. Update Group (Unified)

- **Description:** Updates group details, adds/removes members in a single atomic operation.
- **Endpoint:** `PATCH /{groupId}`
- **Request Body:**
  ```json
  {
    "name": "string", // optional
    "add_members": [
      {
        "user_id": "uuid",
        "role": "member" // optional, defaults to "member"
      }
    ], // optional
    "remove_members": ["uuid1", "uuid2"] // optional - user IDs to remove
  }
  ```
- **Response:** `200 OK` with `{"message": "Group updated successfully"}`

### 5. Delete Group

- **Description:** Deletes a group (admin only).
- **Endpoint:** `DELETE /{groupId}`
- **Response:** `200 OK` with `{"message": "Group deleted successfully"}`

### 6. Get Group Members

- **Description:** Gets members of a group.
- **Endpoint:** `GET /{groupId}/members`
- **Query Parameters:**
  - `role` (string, optional): Filter by role ("admin", "member")
  - `limit` (int, optional): Number of results per page (default: 25, max: 100)
  - `offset` (int, optional): Number of results to skip (default: 0)
- **Response Body:**
  ```json
  {
    "data": [
      {
        "user_id": "uuid",
        "username": "string",
        "name": "string",
        "email": "string",
        "role": "admin",
        "joined_at": "timestamp"
      }
    ],
    "pagination": {
      "total": 5,
      "limit": 25,
      "offset": 0,
      "next_offset": null
    }
  }
  ```

### 7. Add Members

- **Description:** Adds new members to a group (admin only).
- **Endpoint:** `POST /{groupId}/members`
- **Request Body:**
  ```json
  {
    "user_ids": ["uuid1", "uuid2"]
  }
  ```
- **Response:** `200 OK` with `{"message": "Members added successfully"}`

### 8. Remove Member

- **Description:** Removes a member from a group (admin only).
- **Endpoint:** `DELETE /{groupId}/members/{userId}`
- **Response:** `200 OK` with `{"message": "Member removed successfully"}`

### 9. Get Group Expenses

- **Description:** Gets expenses for a specific group.
- **Endpoint:** `GET /{groupId}/expenses`
- **Query Parameters:**
  - `limit` (int, optional): Number of results per page (default: 10, max: 100)
  - `offset` (int, optional): Number of results to skip (default: 0)
- **Response Body:**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "description": "string",
        "total_amount": "decimal",
        "category": "FOOD",
        "payer": {
          "id": "uuid",
          "name": "string"
        },
        "expense_date": "timestamp",
        "image_url": "string"
      }
    ],
    "pagination": {
      "total": 23,
      "limit": 10,
      "offset": 0,
      "next_offset": 10
    }
  }
  ```

### 10. Get Group Balances

- **Description:** Gets balance summary for all group members with debt simplification.
- **Endpoint:** `GET /{groupId}/balances`
- **Response Body:**
  ```json
  {
    "total_expense": "decimal",
    "members": [
      {
        "user_id": "uuid",
        "user_name": "string",
        "balance": "decimal", // positive if owed, negative if owes
        "paid": "decimal",
        "should_pay": "decimal"
      }
    ],
    "debts": [
      {
        "from": {
          "id": "uuid",
          "name": "string"
        },
        "to": {
          "id": "uuid",
          "name": "string"
        },
        "amount": "decimal"
      }
    ]
  }
  ```

### 11. Get Group Summary (NEW)

- **Description:** Gets comprehensive analytics and insights for a group.
- **Endpoint:** `GET /{groupId}/summary`
- **Response Body:**
  ```json
  {
    "group_info": {
      "id": "uuid",
      "name": "string",
      "member_count": 5,
      "created_at": "timestamp"
    },
    "total_expenses": "decimal",
    "expense_count": 23,
    "categories": [
      {
        "category": "FOOD",
        "amount": "decimal",
        "count": 12
      },
      {
        "category": "TRAVEL",
        "amount": "decimal",
        "count": 3
      }
    ],
    "monthly_trends": [
      {
        "year": 2024,
        "month": 8,
        "amount": "decimal",
        "count": 15
      }
    ],
    "top_spenders": [
      {
        "user_id": "uuid",
        "user_name": "string",
        "amount": "decimal",
        "count": 8
      }
    ],
    "recent_expenses": [
      {
        "id": "uuid",
        "description": "string",
        "amount": "decimal",
        "category": "FOOD",
        "payer_name": "string",
        "date": "timestamp"
      }
    ]
  }
  ```

### 12. Generate Group Image Upload URL

- **Description:** Generates a presigned URL for uploading a group image.
- **Endpoint:** `POST /image/upload-url`
- **Request Body:**
  ```json
  {
    "content_type": "string" // e.g., "image/jpeg"
  }
  ```
- **Response Body:**
  ```json
  {
    "upload_url": "string",
    "image_key": "string"
  }
  ```

---

## Expense Module

**Base Path:** `/api/v1/expenses` (Protected)

### 1. Create Expense (Enhanced)

- **Description:** Creates a new expense with optional receipt image upload and category. Supports 6 split types: EQUAL, CUSTOM, PERCENTAGE, SHARES, UNEQUAL, and ITEMIZED.
- **Endpoint:** `POST`
- **Content-Type:** `multipart/form-data`
- **Request Form Fields:**
  - `expense_data` (string, required): JSON string with expense details
  - `image` (file, optional): Receipt image (JPEG, PNG, GIF, WebP). Max 10MB.

#### Split Type Examples:

**1. EQUAL Split (Default):**

```json
{
  "description": "Lunch at restaurant",
  "total_amount": 450.0,
  "category": "FOOD",
  "group_id": "uuid",
  "payer_id": "uuid",
  "expense_date": "2024-08-31T10:30:00Z",
  "split_type": "EQUAL",
  "participants": [
    { "user_id": "uuid1" },
    { "user_id": "uuid2" },
    { "user_id": "uuid3" }
  ]
}
```

**2. CUSTOM Split:**

```json
{
  "description": "Grocery shopping",
  "total_amount": 1000.0,
  "category": "GROCERIES",
  "split_type": "CUSTOM",
  "participants": [
    { "user_id": "uuid1", "share_amount": 400.0 },
    { "user_id": "uuid2", "share_amount": 350.0 },
    { "user_id": "uuid3", "share_amount": 250.0 }
  ]
}
```

**3. PERCENTAGE Split:**

```json
{
  "description": "Monthly rent",
  "total_amount": 10000.0,
  "category": "RENT",
  "split_type": "PERCENTAGE",
  "participants": [
    { "user_id": "uuid1", "percentage": 50.0 },
    { "user_id": "uuid2", "percentage": 30.0 },
    { "user_id": "uuid3", "percentage": 20.0 }
  ]
}
```

**4. SHARES Split:**

```json
{
  "description": "Pizza order",
  "total_amount": 600.0,
  "category": "FOOD",
  "split_type": "SHARES",
  "participants": [
    { "user_id": "uuid1", "shares": 2 },
    { "user_id": "uuid2", "shares": 2 },
    { "user_id": "uuid3", "shares": 1 }
  ]
}
```

**5. UNEQUAL Split:**

```json
{
  "description": "Utility bills",
  "total_amount": 900.0,
  "category": "UTILITIES",
  "split_type": "UNEQUAL",
  "participants": [
    { "user_id": "uuid1", "ratio": 1.0 },
    { "user_id": "uuid2", "ratio": 1.5 },
    { "user_id": "uuid3", "ratio": 2.0 }
  ]
}
```

**6. ITEMIZED Split:**

```json
{
  "description": "Restaurant dinner",
  "total_amount": 1200.0,
  "category": "FOOD",
  "split_type": "ITEMIZED",
  "participants": [
    { "user_id": "uuid1" },
    { "user_id": "uuid2" },
    { "user_id": "uuid3" }
  ],
  "items": [
    {
      "name": "Alice's Pasta",
      "amount": 300.0,
      "is_shared": false,
      "consumers": ["uuid1"]
    },
    {
      "name": "Bob's Steak",
      "amount": 500.0,
      "is_shared": false,
      "consumers": ["uuid2"]
    },
    {
      "name": "Charlie's Salad",
      "amount": 200.0,
      "is_shared": false,
      "consumers": ["uuid3"]
    },
    {
      "name": "Shared Appetizer",
      "amount": 150.0,
      "is_shared": true
    },
    {
      "name": "Tax & Tip",
      "amount": 50.0,
      "is_shared": true
    }
  ]
}
```

#### Field Descriptions:

- `description` (string, required): Expense description
- `total_amount` (decimal, required): Total expense amount in INR
- `category` (string, optional): Expense category, defaults to "OTHER"
- `group_id` (uuid, optional): Group ID if this is a group expense
- `payer_id` (uuid, optional): Who paid for the expense, defaults to creator
- `expense_date` (timestamp, optional): When the expense occurred, defaults to now
- `split_type` (string, optional): How to split the expense, defaults to "EQUAL"
- `participants` (array, required): List of participants with split-specific fields:
  - `user_id` (uuid, required): Participant's user ID
  - `share_amount` (decimal): For CUSTOM splits - exact amount
  - `percentage` (decimal): For PERCENTAGE splits - percentage (0-100)
  - `shares` (integer): For SHARES splits - number of shares
  - `ratio` (decimal): For UNEQUAL splits - ratio multiplier
- `items` (array): For ITEMIZED splits - list of individual items:
  - `name` (string, required): Item name
  - `amount` (decimal, required): Item cost
  - `is_shared` (boolean): Whether item is shared among all participants
  - `consumers` (array): User IDs who consumed this item (for individual items)
  - `split_type` (string): How to split this item ("equal" or "custom")
  - `custom_split` (array): Custom split amounts for this item
- **Response Body:**
  ```json
  {
    "id": "uuid",
    "description": "string",
    "total_amount": "decimal",
    "category": "FOOD",
    "group_id": "uuid",
    "payer": {
      "id": "uuid",
      "name": "string"
    },
    "split_type": "EQUAL",
    "expense_date": "timestamp",
    "image_url": "string",
    "participants": [
      {
        "user_id": "uuid",
        "name": "string",
        "share_amount": "decimal"
      }
    ]
  }
  ```

### 2. Get Expense Details

- **Description:** Gets detailed information about a specific expense.
- **Endpoint:** `GET /{id}`
- **Response Body:**
  ```json
  {
    "id": "uuid",
    "description": "string",
    "total_amount": "decimal",
    "category": "FOOD",
    "group_id": "uuid",
    "payer": {
      "id": "uuid",
      "name": "string"
    },
    "split_type": "EQUAL",
    "expense_date": "timestamp",
    "image_url": "string",
    "participants": [
      {
        "user_id": "uuid",
        "name": "string",
        "share_amount": "decimal"
      }
    ]
  }
  ```

### 3. Update Expense

- **Description:** Updates an existing expense (creator only). Supports all split types.
- **Endpoint:** `PUT /{id}`
- **Request Body:** Same structure as Create Expense (without image upload). Examples:

**EQUAL Split Update:**

```json
{
  "description": "Updated lunch description",
  "total_amount": 500.0,
  "category": "FOOD",
  "split_type": "EQUAL",
  "participants": [
    { "user_id": "uuid1" },
    { "user_id": "uuid2" },
    { "user_id": "uuid3" }
  ]
}
```

**CUSTOM Split Update:**

```json
{
  "description": "Updated grocery split",
  "total_amount": 1200.0,
  "category": "GROCERIES",
  "split_type": "CUSTOM",
  "participants": [
    { "user_id": "uuid1", "share_amount": 500.0 },
    { "user_id": "uuid2", "share_amount": 400.0 },
    { "user_id": "uuid3", "share_amount": 300.0 }
  ]
}
```

**ITEMIZED Split Update:**

```json
{
  "description": "Updated restaurant bill",
  "total_amount": 1500.0,
  "category": "FOOD",
  "split_type": "ITEMIZED",
  "participants": [{ "user_id": "uuid1" }, { "user_id": "uuid2" }],
  "items": [
    {
      "name": "Main Course",
      "amount": 1200.0,
      "is_shared": true
    },
    {
      "name": "Dessert",
      "amount": 300.0,
      "is_shared": false,
      "consumers": ["uuid1"]
    }
  ]
}
```

- **Response Body:** Same as Get Expense Details

### 4. Delete Expense

- **Description:** Soft deletes an expense (creator only).
- **Endpoint:** `DELETE /{id}`
- **Response:** `204 No Content`

### 5. Get User Balances

- **Description:** Gets the current user's balances with all friends.
- **Endpoint:** `GET /balances`
- **Response Body:**
  ```json
  {
    "total_you_owe": "decimal",
    "total_you_are_owed": "decimal",
    "balances": [
      {
        "friend_id": "uuid",
        "friend_name": "string",
        "amount": "decimal" // positive if they owe you, negative if you owe them
      }
    ]
  }
  ```

### 6. Get Payment History

- **Description:** Gets payment history between the current user and a friend.
- **Endpoint:** `GET /history/{friendId}`
- **Query Parameters:**
  - `limit` (int, optional): Number of results per page (default: 20, max: 100)
  - `offset` (int, optional): Number of results to skip (default: 0)
- **Response Body:**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "from_user": {
          "id": "uuid",
          "name": "string"
        },
        "to_user": {
          "id": "uuid",
          "name": "string"
        },
        "amount": "decimal",
        "payment_method": "UPI",
        "upi_transaction_id": "string",
        "notes": "string",
        "payment_date": "timestamp",
        "group": {
          "id": "uuid",
          "name": "string"
        }
      }
    ],
    "pagination": {
      "total": 15,
      "limit": 20,
      "offset": 0,
      "next_offset": null
    }
  }
  ```

---

## Activity Feed Module

**Base Path:** `/api/v1/activity`

The Activity Feed module provides endpoints to retrieve activity feeds showing recent actions performed by users across the platform. Activities include expense creation/updates, group management, friendship actions, and payment records.

### Activity Types

- **Expense Activities:**

  - `expense_created` - User created a new expense
  - `expense_updated` - User updated an existing expense
  - `expense_deleted` - User deleted an expense

- **Group Activities:**

  - `group_created` - User created a new group
  - `group_updated` - User updated group details
  - `member_added` - User added a member to a group
  - `member_removed` - User removed a member from a group
  - `member_role_changed` - User changed a member's role

- **Friendship Activities:**

  - `friend_request_sent` - User sent a friend request
  - `friend_request_accepted` - User accepted a friend request
  - `friend_request_rejected` - User rejected a friend request
  - `friendship_removed` - User removed a friendship

- **Payment Activities:**
  - `payment_recorded` - User recorded a payment
  - `expense_settled` - User settled an expense

### 1. Get User Activity Feed

- **Description:** Retrieves the authenticated user's activity feed with optional filtering.
- **Endpoint:** `GET /feed`
- **Authentication:** Required
- **Query Parameters:**

  - `page` (int, optional): Page number (default: 1)
  - `limit` (int, optional): Items per page (default: 20, max: 100)
  - `filter` (string, optional): Filter by activity type
    - Values: `all`, `expenses`, `groups`, `friends`, `payments`
    - Default: `all`
  - `group_id` (uuid, optional): Filter activities for a specific group
  - `friend_id` (uuid, optional): Filter activities involving a specific friend

- **Response Body:**
  ```json
  {
    "activities": [
      {
        "id": "uuid",
        "actor_user": {
          "id": "uuid",
          "name": "string"
        },
        "activity_type": "expense_created",
        "entity_type": "expense",
        "entity_id": "uuid",
        "target_user": {
          "id": "uuid",
          "name": "string"
        },
        "group": {
          "id": "uuid",
          "name": "string"
        },
        "description": "Created expense: Dinner at restaurant (₹1200.00)",
        "metadata": {
          "amount": "1200.00",
          "currency": "INR",
          "expense_description": "Dinner at restaurant",
          "category": "FOOD"
        },
        "created_at": "2024-08-31T10:30:00Z"
      }
    ],
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8
  }
  ```

### 2. Get Group Activity Feed

- **Description:** Retrieves activity feed for a specific group.
- **Endpoint:** `GET /groups/{groupId}/feed`
- **Authentication:** Required
- **Path Parameters:**
  - `groupId` (uuid): The group ID
- **Query Parameters:**

  - `page` (int, optional): Page number (default: 1)
  - `limit` (int, optional): Items per page (default: 20, max: 100)

- **Response Body:**
  ```json
  {
    "activities": [
      {
        "id": "uuid",
        "actor_user": {
          "id": "uuid",
          "name": "string"
        },
        "activity_type": "member_added",
        "entity_type": "group",
        "entity_id": "uuid",
        "target_user": {
          "id": "uuid",
          "name": "string"
        },
        "group": {
          "id": "uuid",
          "name": "string"
        },
        "description": "Added member to group: Weekend Trip",
        "metadata": {
          "group_name": "Weekend Trip"
        },
        "created_at": "2024-08-31T09:15:00Z"
      }
    ],
    "page": 1,
    "limit": 20,
    "total": 45,
    "total_pages": 3
  }
  ```

### 3. Get Friend Activity Feed

- **Description:** Retrieves activity feed for activities between the authenticated user and a specific friend.
- **Endpoint:** `GET /friends/{friendId}/feed`
- **Authentication:** Required
- **Path Parameters:**
  - `friendId` (uuid): The friend's user ID
- **Query Parameters:**

  - `page` (int, optional): Page number (default: 1)
  - `limit` (int, optional): Items per page (default: 20, max: 100)

- **Response Body:**
  ```json
  {
    "activities": [
      {
        "id": "uuid",
        "actor_user": {
          "id": "uuid",
          "name": "string"
        },
        "activity_type": "payment_recorded",
        "entity_type": "payment",
        "entity_id": "uuid",
        "target_user": {
          "id": "uuid",
          "name": "string"
        },
        "description": "Recorded payment: ₹500.00",
        "metadata": {
          "amount": "500.00",
          "currency": "INR",
          "payment_method": "upi"
        },
        "created_at": "2024-08-31T08:45:00Z"
      }
    ],
    "page": 1,
    "limit": 20,
    "total": 25,
    "total_pages": 2
  }
  ```

### Activity Feed Response Schema

#### ActivityFeedResponse

- `id` (uuid): Unique activity identifier
- `actor_user` (UserInfo): User who performed the activity
- `activity_type` (string): Type of activity performed
- `entity_type` (string): Type of entity the activity relates to
- `entity_id` (uuid): ID of the entity the activity relates to
- `target_user` (UserInfo, optional): User who was the target of the activity
- `group` (GroupInfo, optional): Group associated with the activity
- `description` (string): Human-readable description of the activity
- `metadata` (Metadata, optional): Additional context data
- `created_at` (datetime): When the activity occurred

#### UserInfo

- `id` (uuid): User ID
- `name` (string): User's display name

#### GroupInfo

- `id` (uuid): Group ID
- `name` (string): Group name

#### Metadata

- `amount` (string, optional): Monetary amount involved
- `currency` (string, optional): Currency code (always "INR")
- `expense_description` (string, optional): Description of expense
- `category` (string, optional): Expense category
- `group_name` (string, optional): Group name
- `role` (string, optional): User role in group context
- `payment_method` (string, optional): Payment method used

### Error Responses

All activity feed endpoints return standard error responses:

- **400 Bad Request:** Invalid query parameters or path parameters
- **401 Unauthorized:** Missing or invalid authentication token
- **403 Forbidden:** User doesn't have access to the requested resource
- **404 Not Found:** Group or friend not found
- **500 Internal Server Error:** Server-side error

---

## Expense Categories

The following expense categories are supported:

- `FOOD` - Restaurant meals, groceries, food delivery
- `TRAVEL` - Transportation, flights, accommodation
- `ENTERTAINMENT` - Movies, concerts, games, events
- `SHOPPING` - Clothing, electronics, general purchases
- `UTILITIES` - Electricity, water, internet, phone bills
- `RENT` - Housing rent, property expenses
- `GROCERIES` - Supermarket shopping, household items
- `HEALTHCARE` - Medical expenses, pharmacy, insurance
- `EDUCATION` - Books, courses, tuition fees
- `OTHER` - Miscellaneous expenses (default)

---

## Standardized Pagination

All paginated endpoints support the following query parameters:

- `limit` (int, optional): Number of items per page
  - Default: 10
  - Maximum: 100
  - Values > 100 are automatically capped at 100
- `offset` (int, optional): Number of items to skip
  - Default: 0
  - Must be >= 0

### Pagination Response Format

All paginated responses include a `pagination` object:

```json
{
  "data": [...],
  "pagination": {
    "total": 150,        // Total number of items
    "limit": 10,         // Items per page
    "offset": 20,        // Current offset
    "next_offset": 30    // Next offset (null if no more items)
  }
}
```

---

## Error Responses

All endpoints return standardized error responses:

### 400 Bad Request

```json
{
  "error": "Invalid request",
  "message": "Detailed error description",
  "status_code": 400
}
```

**Split Type Validation Errors:**

```json
{
  "error": "validation_error",
  "message": "sum of share amounts must equal total amount",
  "status_code": 400,
  "details": {
    "split_type": "CUSTOM",
    "expected_total": 1000.0,
    "actual_total": 950.0
  }
}
```

```json
{
  "error": "validation_error",
  "message": "sum of percentages must equal 100",
  "status_code": 400,
  "details": {
    "split_type": "PERCENTAGE",
    "expected_total": 100.0,
    "actual_total": 95.0
  }
}
```

```json
{
  "error": "validation_error",
  "message": "sum of item amounts must equal total expense amount",
  "status_code": 400,
  "details": {
    "split_type": "ITEMIZED",
    "expected_total": 1200.0,
    "actual_total": 1150.0
  }
}
```

### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Authentication required",
  "status_code": 401
}
```

### 403 Forbidden

```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions",
  "status_code": 403
}
```

### 404 Not Found

```json
{
  "error": "Not found",
  "message": "Resource not found",
  "status_code": 404
}
```

### 409 Conflict

```json
{
  "error": "Conflict",
  "message": "Resource already exists or conflict detected",
  "status_code": 409
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred",
  "status_code": 500
}
```

---

## Notes

1. **Currency**: All monetary amounts are in INR (Indian Rupees) and represented as decimal strings.

2. **Timestamps**: All timestamps are in ISO 8601 format (e.g., `2024-08-31T10:30:00Z`).

3. **UUIDs**: All IDs are UUID v4 format.

4. **Image Uploads**:

   - Supported formats: JPEG, PNG, GIF, WebP
   - Maximum size: 10MB
   - Images are stored in S3 and returned as presigned URLs

5. **Pagination**: All list endpoints use offset-based pagination with standardized response format.

6. **Split Types**: All 6 split types are fully implemented:

   - `EQUAL`: Equal splits among all participants (default)
   - `CUSTOM`: Exact amounts specified for each participant
   - `PERCENTAGE`: Percentage-based splits (0-100%)
   - `SHARES`: Integer ratio-based splits (1:2:3)
   - `UNEQUAL`: Decimal ratio-based splits (1.0:1.5:2.0)
   - `ITEMIZED`: Item-level splits with individual and shared items

7. **Settlement**: Use the unified `/friends/settle` endpoint for recording payments between users, whether in groups or direct friendships.

8. **Group Analytics**: The `/groups/{groupId}/summary` endpoint provides comprehensive insights including category breakdowns, spending trends, and member analytics.

---

## Notification Module

**Base Path:** `/api/v1/notifications` (Protected)

### 1. Register Device for Push Notifications

- **Description:** Register a device token for receiving push notifications (FCM for Android, APN for iOS).
- **Endpoint:** `POST /devices`
- **Request Body:**
  ```json
  {
    "device_type": "ios|android|web",
    "device_token": "string"
  }
  ```
- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "Device registered successfully",
    "data": null
  }
  ```

### 2. Unregister Device

- **Description:** Remove a device token from receiving push notifications.
- **Endpoint:** `DELETE /devices?device_token=<token>`
- **Query Parameters:**
  - `device_token` (required): The device token to unregister
- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "Device unregistered successfully",
    "data": null
  }
  ```

### 3. Get User Devices

- **Description:** Get all registered devices for the current user.
- **Endpoint:** `GET /devices`
- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "Devices retrieved successfully",
    "data": [
      {
        "id": "uuid",
        "device_type": "ios|android|web",
        "device_token": "string",
        "is_active": true,
        "created_at": "timestamp"
      }
    ],
    "pagination": {
      "total": 1,
      "limit": 10,
      "offset": 0,
      "next_offset": null
    }
  }
  ```

### 4. Get Notification History

- **Description:** Get paginated notification history for the current user.
- **Endpoint:** `GET /`
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 20, max: 100)
  - `is_read` (optional): Filter by read status (true/false)
  - `type` (optional): Filter by notification type
  - `date_from` (optional): Filter from date (YYYY-MM-DD)
  - `date_to` (optional): Filter to date (YYYY-MM-DD)
- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "Notifications retrieved successfully",
    "data": {
      "data": [
        {
          "id": "uuid",
          "type": "expense_added|payment_received|group_invite|friend_request|system_alert",
          "title": "string",
          "message": "string",
          "data": {
            "expense_id": "uuid",
            "amount": "decimal",
            "group_id": "uuid"
          },
          "is_read": false,
          "read_at": null,
          "created_at": "timestamp"
        }
      ],
      "pagination": {
        "total": 150,
        "limit": 20,
        "offset": 0,
        "next_offset": 20
      }
    }
  }
  ```

### 5. Mark Notifications as Read

- **Description:** Mark one or more notifications as read.
- **Endpoint:** `PUT /notifications/read`
- **Request Body:**
  ```json
  {
    "notification_ids": ["uuid", "uuid"]
  }
  ```
- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "Notifications marked as read",
    "data": null
  }
  ```

### 6. Get Notification Statistics

- **Description:** Get notification counts and statistics for the current user.
- **Endpoint:** `GET /notifications/stats`
- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "Notification stats retrieved successfully",
    "data": {
      "total_notifications": 150,
      "unread_count": 12,
      "read_count": 138
    }
  }
  ```

### 7. WebSocket Connection for Real-time Notifications

- **Description:** Establish a WebSocket connection for real-time notifications.
- **Endpoint:** `GET /ws` (WebSocket upgrade)
- **Headers:**
  - `Authorization: Bearer <access_token>`
  - `Upgrade: websocket`
  - `Connection: Upgrade`
- **Connection Flow:**
  1. Client connects to `/ws` with authorization header
  2. Server upgrades to WebSocket connection
  3. Server sends ping every 30 seconds
  4. Client responds with pong
  5. Server sends real-time notifications as JSON messages
- **Message Format:**
  ```json
  {
    "type": "expense_added|payment_received|group_invite|friend_request",
    "title": "string",
    "message": "string",
    "data": {
      "expense_id": "uuid",
      "amount": "decimal",
      "group_id": "uuid"
    },
    "timestamp": "timestamp"
  }
  ```
- **Heartbeat Messages:**

  ```json
  // Client sends:
  {"type": "heartbeat", "timestamp": "2024-01-01T12:00:00Z"}

  // Server responds:
  {"type": "heartbeat_ack", "timestamp": "2024-01-01T12:00:01Z"}
  ```

### 8. Send Test Notification (Development Only)

- **Description:** Send a test notification to the current user for development/testing purposes.
- **Endpoint:** `POST /notifications/test`
- **Query Parameters:**
  - `message` (optional): Custom test message (default: "Test notification")
- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "Test notification sent successfully",
    "data": null
  }
  ```

---

## Notification Types

The system supports the following notification types:

### Real-time Notifications

- **`expense_added`**: When a new expense is created in a group
- **`expense_updated`**: When an expense is modified
- **`payment_received`**: When a payment is recorded
- **`group_invite`**: When user is added to a group
- **`friend_request`**: When a friend request is sent/accepted

### System Notifications

- **`system_alert`**: System-wide announcements
- **`security_alert`**: Security-related notifications

### Notification Channels

- **`websocket`**: Real-time in-app notifications via WebSocket
- **`push`**: Mobile push notifications (FCM/APN)
- **`email`**: Email notifications (future implementation)

### Automatic Notification Triggers

The system automatically sends notifications for the following events:

1. **Expense Events:**

   - User creates expense → Notify group members
   - User updates expense → Notify affected users
   - Expense is settled → Notify involved users

2. **Payment Events:**

   - Payment recorded → Notify recipient
   - Balance reminder → Notify users with outstanding debts

3. **Group Events:**

   - User added to group → Notify new member
   - Group details updated → Notify all members
   - Member role changed → Notify affected member

4. **Friend Events:**
   - Friend request sent → Notify target user
   - Friend request accepted → Notify requester
   - Friendship removed → Notify both users

---

## Additional Notes

9. **Real-time Notifications**: Connect to `/ws` endpoint to receive real-time notifications via WebSocket. The connection includes automatic ping/pong heartbeat to ensure connection health.

10. **Push Notifications**: Register device tokens via `/notifications/devices` to receive push notifications when the app is in background. Supports iOS (APN) and Android (FCM).

11. **Notification History**: All notifications are stored and can be retrieved via `/notifications` endpoint with filtering and pagination support.

12. **Device Management**: Users can register multiple devices and unregister old devices to control where they receive push notifications.
