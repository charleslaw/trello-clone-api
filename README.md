# Trello Clone API

## Run the app

npm run dev

# REST API

The REST API for Trello-Clone is described below.

# Create User's Account

Create an account for a new user if that user does not already exist. Each user can only have one account associated with an email address.

**URL** : `/api/users/`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data constraints**

Provide email address, password, and comfirmation password.

```json
{
  "email": "newacc@newacc.com",
  "password": "newpassword",
  "confirmPassword": "newpassword"
}
```

## Success Response

**Condition** : If everything is OK and an Account didn't exist for this email address.

**Code** : `201 CREATED`

## Error Responses

**Condition** : If email, password or confirm password fields are missing in request body

**Code** : `400`

```json
{
  "error": "Missing '${field}' in request body"
}
```

**Condition** : If email is already taken

**Code** : `400`

```json
{
  "error": "Email already taken"
}
```

# Get all boards

Fetch all boards from db based on users id

**URL** : `/api/boards/`

**Method** : `GET`

**Auth required** : YES

## Success Responses

**Condition** : User contains valid JWT

**Code** : `200 OK`

**Content** : all boards are returned based on users id

```json
{
  "id": "board.id",
  "title": "xss(board.title)",
  "date_created": "board.date_created",
  "user_id": "board.user_id"
}
```

# Create new board

Create a new board with a board title based on users input

**URL** : `/api/boards/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

Provide title of Board to be created.

```json
{
  "title": "board title"
}
```

**Data example** Title must be sent.

```json
{
  "title": "New Project"
}
```

## Success Response

**Condition** : If everything is OK, board title was sent and a new board is created.

**Code** : `201 CREATED`

**Content example**

```json
{
  "id": "board.id",
  "title": "xss(board.title)",
  "date_created": "board.date_created",
  "user_id": "board.user_id"
}
```

# Delete a users board

Delete the board of the Authenticated User

**URL** : `/api/boards/delete/:boardId/`

**URL Parameters** : `boardId=integer` where `boardId` is the ID of the board in the
database.

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Condition** : If the board exists.

**Code** : `204 NO CONTENT`
