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

# Get all lists

Fetch all lists from db based on users id

**URL** : `/api/lists/:boardId/`

**URL Parameters** : `boardId=[integer]` where `boardId` is the id of the board associated with the lists being fetched from the database

**Method** : `GET`

**Auth required** : YES

## Success Responses

**Condition** : User contains valid JWT, lists exist associated with the board id

**Code** : `200 OK`

**Content** : all lists are returned based on the board id

```json
{
  "id": "list.id",
  "list_title": "xss(list.list_title)",
  "date_created": "list.date_created",
  "user_id": "list.user_id",
  "board_id": "list.board_id"
}
```

# Create new list

Create a new list associated with a board based on the boards id as long as a list title is submitted with request

**URL** : `/api/lists/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

Provide title of the List to be created and the board id that the list will belong too

```json
{
  "list_title": "list title",
  "board_id": "boardId"
}
```

**Data example** Title and board id must be sent

```json
{
  "list_title": "To Do",
  "board_id": "2"
}
```

## Success Response

**Condition** : If everything is OK, list title and board id were sent and a new list is created.

**Code** : `201 CREATED`

**Content example**

```json
{
  newList
}
```

# Delete a list

Delete the list of the Authenticated User

**URL** : `/api/boards/delete/:listId/`

**URL Parameters** : `listId=integer` where `listId` is the ID of the list to be deleted.

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Condition** : If the list exists.

**Code** : `204 NO CONTENT`

# Get all tasks

Fetch all tasks from db based on the list id

**URL** : `/api/tasks/:listId/`

**URL Parameters** : `listId=[integer]` where `listId` is the id of the list associated with the tasks being fetched from the database

**Method** : `GET`

**Auth required** : YES

## Success Responses

**Condition** : User contains valid JWT, tasks exist associated with the list id

**Code** : `200 OK`

**Content** : all tasks are returned based on the list id

```json
{
  tasksAssociatedWithlistId
}
```

# Create new task

Create a new task associated with a list based on the lists id as long as a task title is submitted with request

**URL** : `/api/tasks/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

Provide title of the task to be created and the list id that the task will be associated with

```json
{
  task
}
```

**Data example** Title and list id must be sent

```json
{
  "title": "start project",
  "list_id": "2"
}
```

## Success Response

**Condition** : If everything is OK, task title and list id were sent and a new task is created.

**Code** : `201 CREATED`

**Content example**

```json
{
  task
}
```

# Delete a task

Delete the task of the Authenticated User

**URL** : `/api/boards/delete/:taskId/`

**URL Parameters** : `taskId=[integer]` where `taskId` is the ID of the task to be deleted.

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Condition** : If the task exists.

**Code** : `204 NO CONTENT`
