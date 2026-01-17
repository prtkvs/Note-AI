# Note-AI API Documentation

This README documents all the available backend API routes for the **Note-AI** application. The API is divided into two main modules:

* Notes
* Users

All routes are assumed to be prefixed with your base API URL, for example:

```
http://localhost:7000/
```

---

## Notes Routes

These routes handle all note-related operations. All routes are **protected** and require authentication unless stated otherwise.

### 1. Get All Notes

**GET** `/notes`

Fetch all notes created by the currently authenticated user.

**Headers**

```
Authorization: Bearer <token>
```

**Response (200)**

```json
[
  {
    "_id": "noteId",
    "title": "My Note",
    "content": "Some content",
    "createdAt": "2026-01-17T10:00:00Z"
  }
]
```

---

### 2. Create New Note

**POST** `/notes`

Create a new note for the authenticated user.

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "title": "Note title",
  "content": "Note content"
}
```

**Response (201)**

```json
{
  "_id": "noteId",
  "title": "Note title",
  "content": "Note content"
}
```

---

### 3. Get Particular Note

**GET** `/notes/:id`

Fetch a single note by its ID.

**Headers**

```
Authorization: Bearer <token>
```

**Params**

* `id` – Note ID

**Response (200)**

```json
{
  "_id": "noteId",
  "title": "My Note",
  "content": "Some content"
}
```

---

### 4. Update Note

**PATCH** `/notes/:id`

Update an existing note.

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "title": "Updated title",
  "content": "Updated content"
}
```

**Response (200)**

```json
{
  "message": "Note updated successfully"
}
```

---

### 5. Delete Note

**DELETE** `/notes/:id`

Delete a note by its ID.

**Headers**

```
Authorization: Bearer <token>
```

**Response (200)**

```json
{
  "message": "Note deleted successfully"
}
```

---

## Users Routes

These routes handle authentication, user data, and AI features.

### 1. Register User

**POST** `/users/register`

Register a new user.

**Body**

```json
{
  "name": "Prateek",
  "username": "prateek01",
  "email": "prateek@email.com",
  "password": "password123"
}
```

**Response (201)**

```json
{
  "message": "User registered successfully"
}
```

---

### 2. Login User

**POST** `/users/login`

Authenticate a user and return a JWT token.

**Body**

```json
{
  "identifier": "prateek@email.com / prateek01", // email or username
  "password": "password123"
}
```

**Response (200)**

```json
{
  "token": "jwt_token_here"
}
```

---

### 3. Get Current User Details

**GET** `/users/current`

Fetch details of the currently logged-in user.

**Headers**

```
Authorization: Bearer <token>
```

**Response (200)**

```json
{
  "_id": "userId",
  "name": "Prateek",
  "email": "prateek@email.com"
}
```

---

### 4. AI Enhance

**GET** `/users/ai-enhance`

Enhance or improve note content using AI.

**Headers**

```
Authorization: Bearer <token>
```

**Query Params (example)**

```
?text=your_note_text_here
```

**Response (200)**

```json
{
  "enhancedText": "Improved version of your text"
}
```

---

## Error Handling

The API follows standard HTTP status codes:

* `400` Validation Error
* `401` Unauthorized
* `403` Forbidden
* `404` Not Found
* `409` Conflict
* `500` Server Error

All error responses follow this format:

```json
{
  "message": "Error description"
}
```

---

## Authentication

Protected routes require a JWT token sent in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

---

## Notes

* All notes are user-specific
* Unauthorized access to another user's notes is blocked
* AI routes may depend on external AI services, that too for authorized users

---
