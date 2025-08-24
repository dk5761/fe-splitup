# SplitUp API Contract

This document outlines the API contract for the SplitUp backend.

**Base URL:** `/api/v1`

**Authentication:** All protected routes require a `Authorization` header with a Bearer token: `Authorization: Bearer <access_token>`.

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

- **Description:** Refreshes an access token.
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

- **Description:** Logs out a user by invalidating the refresh token.
- **Endpoint:** `POST /logout`
- **Request Body:**
  ```json
  {
    "refresh_token": "string"
  }
  ```
- **Response:** `200 OK` with `{"message": "Logged out successfully."}`

### 5. Check Username Exists

- **Description:** Checks if a username is already taken.
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
    "email": "string"
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
    "email": "string"
  }
  ```
- **Response Body:**
  ```json
  {
    "id": "uuid",
    "name": "string",
    "username": "string",
    "email": "string"
  }
  ```

### 3. Change Password

- **Description:** Changes the current user's password.
- **Endpoint:** `POST /change-password`
- **Request Body:**
  ```json
  {
    "old_password": "string",
    "new_password": "string"
  }
  ```
- **Response:** `200 OK` with `{"message": "Password changed successfully"}`

### 4. Delete Account

- **Description:** Deletes the current user's account.
- **Endpoint:** `DELETE /me`
- **Response:** `200 OK` with `{"message": "Account deleted successfully"}`

### 5. Search Users

- **Description:** Searches for users by username or email.
- **Endpoint:** `GET /search?q={query}&page={page}&limit={limit}`
- **Response Body:**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "name": "string",
        "username": "string",
        "email": "string"
      }
    ],
    "total": "int",
    "limit": "int",
    "offset": "int"
  }
  ```

---

## Friend Module

**Base Path:** `/api/v1/friend` (Protected)

### 1. Send Friend Request

- **Description:** Sends a friend request to another user.
- **Endpoint:** `POST /requests`
- **Request Body:**
  ```json
  {
    "addresseeId": "uuid"
  }
  ```
- **Response:** `200 OK` with `{"message": "Friend request sent."}`

### 2. Get Pending Friend Requests

- **Description:** Gets all pending friend requests for the current user.
- **Endpoint:** `GET /requests`
- **Response Body:**
  ```json
  [
    {
      "user": {
        "id": "uuid",
        "name": "string",
        "username": "string",
        "email": "string"
      },
      "sentAt": "timestamp",
      "direction": "string" // "incoming" or "outgoing"
    }
  ]
  ```

### 3. Respond to Friend Request

- **Description:** Accepts or declines a friend request.
- **Endpoint:** `PUT /requests/{requesterId}`
- **Request Body:**
  ```json
  {
    "action": "string" // "accept" or "decline"
  }
  ```
- **Response:** `200 OK` with `{"message": "Friend request {action}ed."}`

### 4. List Friends

- **Description:** Lists all friends of the current user.
- **Endpoint:** `GET`
- **Response Body:**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "name": "string",
        "username": "string",
        "email": "string"
      }
    ],
    "total": "int",
    "limit": "int",
    "offset": "int"
  }
  ```

### 5. Remove Friend

- **Description:** Removes a friend.
- **Endpoint:** `DELETE /{friendId}`
- **Response:** `200 OK` with `{"message": "Friend removed."}`

### 6. Get Friend Expenses

- **Description:** Gets expenses between the current user and a friend.
- **Endpoint:** `GET /{friendId}/expenses?page={page}&limit={limit}`
- **Response Body:**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "description": "string",
        "total_amount": "decimal",
        "payer": {
          "id": "uuid",
          "name": "string"
        },
        "expense_date": "timestamp",
        "image_url": "string" // Presigned S3 URL (if image exists)
      }
    ],
    "pagination": {
      "current_page": "int",
      "total_pages": "int",
      "total_items": "int"
    }
  }
  ```

---

## Group Module

**Base Path:** `/api/v1/groups` (Protected)

### 1. Create Group

- **Description:** Creates a new group, with an option to upload a profile image.
- **Endpoint:** `POST`
- **Content-Type:** `multipart/form-data`
- **Request Form Fields:**

  - `name` (string, required): The name of the group.
  - `members` (string, required): A JSON string representation of an array of members.
    - Example JSON string: `[{"user_id": "uuid", "role": "member"}]`
  - `image` (file, optional): The group's profile image (e.g., `.jpg`, `.png`). Max 5MB.

- **Example Request (`curl`):**
  ```bash
  curl -X POST \
    http://localhost:8080/api/v1/groups \
    -H "Authorization: Bearer <token>" \
    -F "name=Trip to the Alps" \
    -F 'members=[{"user_id":"a1b2c3d4-...","role":"member"},{"user_id":"e5f6g7h8-...","role":"admin"}]' \
    -F "image=@/path/to/your/image.jpg"
  ```
- **Response Body:**
  ```json
  // Group details
  ```

### 2. List Groups

- **Description:** Lists all groups the current user is a member of.
- **Endpoint:** `GET?page={page}&limit={limit}`
- **Response Body:**
  ```json
  // Paginated list of groups
  ```

### 3. Get Group By ID

- **Description:** Gets the details of a specific group.
- **Endpoint:** `GET /{groupId}`
- **Response Body:**
  ```json
  // Group details
  ```

### 4. Update Group Name

- **Description:** Updates the name of a group.
- **Endpoint:** `PUT /{groupId}`
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Response:** `200 OK` with `{"message": "Group name updated successfully"}`

### 5. Update Group

- **Description:** Updates a group (add/remove members).
- **Endpoint:** `PATCH /{groupId}`
- **Request Body:**
  ```json
  {
    "name": "string",
    "addMembers": ["uuid"],
    "removeMembers": ["uuid"]
  }
  ```
- **Response:** `200 OK` with `{"message": "Group updated successfully"}`

### 6. Delete Group

- **Description:** Deletes a group.
- **Endpoint:** `DELETE /{groupId}`
- **Response:** `204 No Content`

### 7. Add Members to Group

- **Description:** Adds members to a group.
- **Endpoint:** `POST /{groupId}/members`
- **Request Body:**
  ```json
  {
    "user_ids": ["uuid"]
  }
  ```
- **Response:** `200 OK` with `{"message": "Members added successfully"}`

### 8. Get Group Members

- **Description:** Gets the members of a group.
- **Endpoint:** `GET /{groupId}/members?page={page}&limit={limit}&role={role}`
- **Response Body:**
  ```json
  // Paginated list of group members
  ```

### 9. Remove Member from Group

- **Description:** Removes a member from a group.
- **Endpoint:** `DELETE /{groupId}/members/{userId}`
- **Response:** `204 No Content`

### 10. Get Group Expenses

- **Description:** Gets the expenses for a specific group.
- **Endpoint:** `GET /{groupId}/expenses?page={page}&limit={limit}`
- **Response Body:**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "description": "string",
        "total_amount": "decimal",
        "payer": {
          "id": "uuid",
          "name": "string"
        },
        "expense_date": "timestamp",
        "image_url": "string" // Presigned S3 URL (if image exists)
      }
    ],
    "pagination": {
      "current_page": "int",
      "total_pages": "int",
      "total_items": "int"
    }
  }
  ```

### 11. Get Group Balances

- **Description:** Gets the total balances of all members within a specific group, along with a summary of simplified debts.
- **Endpoint:** `GET /{groupId}/balances`
- **Response Body:**
  ```json
  {
    "total_expense": "decimal",
    "members": [
      {
        "user_id": "uuid",
        "user_name": "string",
        "balance": "decimal",
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

---

## Expense Module

**Base Path:** `/api/v1/expenses` (Protected)

### 1. Create Expense

- **Description:** Creates a new expense with optional receipt image upload.
- **Endpoint:** `POST`
- **Content-Type:** `multipart/form-data`
- **Request Form Fields:**

  - `expense_data` (string, required): A JSON string representation of the expense data.
    - Example JSON string:
      ```json
      {
        "description": "string",
        "total_amount": "decimal",
        "group_id": "uuid", // optional
        "payer_id": "uuid", // optional, defaults to the creator
        "expense_date": "timestamp",
        "split_type": "string", // "EQUAL" or "MANUAL"
        "participants": [
          {
            "user_id": "uuid",
            "share_amount": "decimal" // required for "MANUAL" split type
          }
        ]
      }
      ```
  - `image` (file, optional): The receipt image (e.g., `.jpg`, `.png`). Max 5MB.

- **Example Request (`curl`):**
  ```bash
  curl -X POST \
    http://localhost:8080/api/v1/expenses \
    -H "Authorization: Bearer <token>" \
    -F 'expense_data={"description":"Dinner","total_amount":"100.00","payer_id":"uuid_of_payer","split_type":"EQUAL","participants":[{"user_id":"uuid1"},{"user_id":"uuid2"}]}' \
    -F "image=@/path/to/receipt.jpg"
  ```
- **Response Body:**
  ```json
  {
    "id": "uuid",
    "description": "string",
    "total_amount": "decimal",
    "group_id": "uuid",
    "payer": {
      "id": "uuid",
      "name": "string"
    },
    "split_type": "string",
    "expense_date": "timestamp",
    "image_url": "string", // Presigned S3 URL (if image was uploaded)
    "participants": [
      {
        "user_id": "uuid",
        "name": "string",
        "share_amount": "decimal"
      }
    ]
  }
  ```

### 2. Get Balances

- **Description:** Gets the user's balances with friends.
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
        "amount": "decimal"
      }
    ]
  }
  ```

### 3. Record Payment

- **Description:** Records a payment between users.
- **Endpoint:** `POST /payments`
- **Request Body:**
  ```json
  {
    "to_user_id": "uuid",
    "amount": "decimal",
    "currency": "string",
    "payment_date": "timestamp"
  }
  ```
- **Response Body:**
  ```json
  // Updated balance response
  ```

### 4. Get Expense By ID

- **Description:** Gets the details of a specific expense.
- **Endpoint:** `GET /{id}`
- **Response Body:**
  ```json
  {
    "id": "uuid",
    "description": "string",
    "total_amount": "decimal",
    "group_id": "uuid",
    "payer": {
      "id": "uuid",
      "name": "string"
    },
    "split_type": "string",
    "expense_date": "timestamp",
    "image_url": "string", // Presigned S3 URL (if image exists)
    "participants": [
      {
        "user_id": "uuid",
        "name": "string",
        "share_amount": "decimal"
      }
    ]
  }
  ```

### 5. Update Expense

- **Description:** Updates an existing expense.
- **Endpoint:** `PUT /{id}`
- **Request Body:**
  ```json
  {
    "description": "string",
    "total_amount": "decimal",
    "split_type": "string",
    "participants": [
      {
        "user_id": "uuid",
        "share_amount": "decimal"
      }
    ]
  }
  ```
- **Response Body:**
  ```json
  {
    "id": "uuid",
    "description": "string",
    "total_amount": "decimal",
    "group_id": "uuid",
    "payer": {
      "id": "uuid",
      "name": "string"
    },
    "split_type": "string",
    "expense_date": "timestamp",
    "image_url": "string", // Presigned S3 URL (if image exists)
    "participants": [
      {
        "user_id": "uuid",
        "name": "string",
        "share_amount": "decimal"
      }
    ]
  }
  ```

### 6. Delete Expense

- **Description:** Deletes an expense.
- **Endpoint:** `DELETE /{id}`
- **Response:** `204 No Content`

### 7. Get Payment History

- **Description:** Gets the payment history with a friend.
- **Endpoint:** `GET /history/{friendId}?page={page}&limit={limit}`
- **Response Body:**
  ```json
  // Paginated list of payments
  ```
