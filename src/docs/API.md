## SplitUp API

### Base URL

- Public: `/health`
- API: `/api/v1/*`
- Auth: Bearer JWT in header `Authorization: Bearer <token>`

### Conventions

- IDs: UUID strings
- Amounts: strings with 2 decimals, e.g., `"12.30"`
- Timestamps: ISO 8601
- Errors: `{ "error": "<message>" }`

---

## Auth

### POST `/api/v1/auth/register`

- Body:

```json
{ "username": "john", "email": "john@example.com", "password": "secret123" }
```

- 201:

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "username": "john",
    "email": "john@example.com",
    "created_at": "...",
    "updated_at": "..."
  },
  "token": "<jwt>"
}
```

### POST `/api/v1/auth/login`

- Body:

```json
{ "email": "john@example.com", "password": "secret123" }
```

- 200:

```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "username": "john",
    "email": "john@example.com",
    "created_at": "...",
    "updated_at": "..."
  },
  "token": "<jwt>"
}
```

### GET `/api/v1/auth/check-username?username=...`

- 200:

```json
{ "exists": true }
```

---

## User (auth required)

### GET `/api/v1/user/me`

- 200 → `UserResponse`

### GET `/api/v1/user/search?q=...`

- Query: `limit` (default 20, max 100), `offset` (default 0)
- 200 → `UserResponse[]`

---

## Group (auth required)

### POST `/api/v1/group/create`

- Body:

```json
{ "name": "Trip" }
```

- 201 → `GroupResponse`
- Note: Creator is auto-added as `owner`.

### GET `/api/v1/group/get-all`

- Uses authenticated user (optional fallback `?user_id=...`). Pagination: `limit` (default 20, max 100), `offset` (default 0)
- 200 → `GroupResponse[]` (groups the user is a member of)

### GET `/api/v1/group/get-by-id?group_id=...`

- 200 → `GroupResponse`

### GET `/api/v1/group/get-users?group_id=...`

- Pagination: `limit` (default 20, max 100), `offset` (default 0)
- 200 → `UserResponse[]`

### GET `/api/v1/group/details?group_id=...`

- 200 → `GroupDetailsResponse` (group + members + expenses list)

### PATCH `/api/v1/group/update`

- Body:

```json
{ "name": "New Name", "group_id": "<uuid>" }
```

- 200 → `GroupResponse`

### DELETE `/api/v1/group/delete?group_id=...`

- 200 → `{ "message": "Group deleted successfully" }`

### PUT `/api/v1/group/add-user`

- Body:

```json
{ "user_id": "<uuid>", "group_id": "<uuid>", "role": "owner|admin|member" }
```

- 200 → `{ "message": "User added to group successfully" }`

### PUT `/api/v1/group/remove-user`

- Body:

```json
{ "user_id": "<uuid>", "group_id": "<uuid>" }
```

- 200 → `{ "message": "User removed from group successfully" }`

### PUT `/api/v1/group/update-user-role`

- Body:

```json
{ "user_id": "<uuid>", "group_id": "<uuid>", "role": "owner|admin|member" }
```

- 200 → `{ "message": "User role updated successfully" }`

---

## Expense (auth required; nested under group)

Base path: `/api/v1/group/:groupID/expenses`

### POST ``

- Body (CreateExpenseRequest):

```json
{
  "group_id": "<uuid>",
  "description": "Dinner",
  "amount": "120.00",
  "paid_by_user_id": "<uuid>",
  "expense_date": "2025-06-10T12:00:00Z",
  "split_type": "EQUAL",
  "participants": ["<uuid>", "<uuid>"]
}
```

- Behavior: If `participants` omitted, auto-uses all current group members. Payer must be among participants.
- 201 → `ExpenseResponse`

### GET ``

- Pagination: `limit` (default 20, max 100), `offset` (default 0)
- 200 → `ExpenseResponse[]` (splits omitted in list for performance)

### GET `/:expenseID`

- 200 → `ExpenseResponse`

### PUT `/:expenseID`

- Body (UpdateExpenseRequest): any subset of

```json
{
  "description": "...",
  "amount": "12.34",
  "expense_date": "2025-06-10T12:00:00Z",
  "paid_by_user_id": "<uuid>",
  "split_type": "EQUAL|EXACT_AMOUNTS|PERCENTAGE",
  "participants": ["<uuid>", "<uuid>"]
}
```

- 200 → `ExpenseResponse`

### DELETE `/:expenseID`

- 200 → `{ "message": "Expense deleted successfully" }`
- Permission: only the expense creator can delete.

---

## Receipt (GenAI; auth required)

### POST `/api/v1/receipt/analyze`

- Content-Type options:
  - `multipart/form-data`: field `file` (image/jpeg|png)
  - `application/json`:

```json
{ "image_b64": "<base64>", "mime_type": "image/jpeg" }
```

- 202 Accepted → `ReceiptResponse`

```json
{
  "id": "<uuid>",
  "status": "queued",
  "suggestion": null,
  "error": null,
  "created_at": "<iso>",
  "updated_at": "<iso>"
}
```

- This enqueues an async analysis job. Use the returned `id` to poll or stream status.

### GET `/api/v1/receipt/:id`

- 200 → `ReceiptResponse` (current status; on success contains `suggestion`).

Example (succeeded):

```json
{
  "id": "<uuid>",
  "status": "succeeded",
  "suggestion": {
    "amount": "12.34",
    "description": "Dinner",
    "expense_date": "<iso>",
    "merchant": "Restaurant"
  },
  "error": null,
  "created_at": "<iso>",
  "updated_at": "<iso>"
}
```

Example (failed):

```json
{
  "id": "<uuid>",
  "status": "failed",
  "suggestion": null,
  "error": "<message>",
  "created_at": "<iso>",
  "updated_at": "<iso>"
}
```

### GET `/api/v1/receipt/:id/stream` (SSE)

- Content-Type: `text/event-stream`
- Emits `status` events with `ReceiptResponse` every ~2s until `succeeded` or `failed`.

---

## Health

### GET `/health`

- 200 → `{ "status": "UP", "message": "SplitUp service is healthy" }`

---

## Models

### UserResponse

```json
{
  "id": "<uuid>",
  "username": "...",
  "email": "...",
  "created_at": "<iso>",
  "updated_at": "<iso>"
}
```

### GroupResponse

```json
{
  "id": "<uuid>",
  "name": "...",
  "created_by": "<uuid>",
  "created_at": "<iso>",
  "updated_at": "<iso>"
}
```

### GroupDetailsResponse

```json
{ "group": GroupResponse, "members": [UserResponse], "expenses": [ExpenseListItemResponse] }
```

### ExpenseResponse

```json
{
  "id": "<uuid>",
  "group_id": "<uuid>",
  "paid_by_user_id": "<uuid>",
  "paid_by_username": "...",
  "amount": "12.34",
  "description": "...",
  "expense_date": "<iso>",
  "split_type": "EQUAL|EXACT_AMOUNTS|PERCENTAGE",
  "receipt_image_key": null,
  "created_at": "<iso>",
  "updated_at": "<iso>",
  "splits": [ExpenseSplitResponse]
}
```

### ExpenseSplitResponse

```json
{
  "id": "<uuid>",
  "expense_id": "<uuid>",
  "user_id": "<uuid>",
  "participant_username": "...",
  "share_amount": "4.11",
  "created_at": "<iso>"
}
```

### ExpenseListItemResponse

```json
{
  "id": "<uuid>",
  "group_id": "<uuid>",
  "paid_by_user_id": "<uuid>",
  "paid_by_username": "...",
  "description": "...",
  "amount": "12.34",
  "expense_date": "<iso>",
  "split_type": "EQUAL",
  "created_at": "<iso>"
}
```

### ReceiptResponse

```json
{
  "id": "<uuid>",
  "status": "queued|processing|succeeded|failed",
  "suggestion": {
    "amount": "12.34",
    "description": "Dinner",
    "expense_date": "<iso>",
    "merchant": "Restaurant"
  },
  "error": "<message>|null",
  "created_at": "<iso>",
  "updated_at": "<iso>"
}
```

---

## Auth header example

```
Authorization: Bearer <jwt>
```

## Common status codes

- 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict

---

## Typical flows

1. Register/Login → store `token`
2. Create Group → add members
3. (Optional) Analyze receipt to prefill fields → Create Expense
4. List Group Expenses or fetch Group Details → render
5. Delete Expense (creator only)
