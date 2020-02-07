# roster-editor API Docs v1.0.0

Documentation for the API endpoints:

- [User](#User)
	- [Register](#Register)
	- [Login] (#Login)
    - [Logout]
	- [Me]
	
- [Post](#Post)
	- [List all post](#Get-all-post)
	- [Find all post by user](#Get-post-by-user)
    - [Find post by id](#Get-post-by-id)
	- [Create a post](#Create-a-post)

	


# User 

## Register

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| string			|  <p>User Email</p>							|
| password			| string			|  <p>User Password</p>							|

mutation {
  register(email: "c@ccc.com", password:"test")
}

### Success Response

Success

```
HTTP/1.1 200 OK
{
  "data": {
    "register": true
  }
}
```
### Error Response

{
  "data": {
    "register": false
  }
}

## Login

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| string			|  <p>User Email</p>							|
| password			| string			|  <p>User Password</p>							|

Ex: mutation {
  login(email: "c@ccc.com", password:"test"){
    _id
    email
  }
}

### Success Response

Success

```
HTTP/1.1 200 OK
{
  "data": {
    "login": {
      "_id": "5e288ed1871a0b6a59459c89",
      "email": "c@cc.com"
    }
  }
}
```
### Error Response

{
  "data": {
    "login": null
  }
}

# Post

## Create a post

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| postType			| string			|  <p>not null</p>							|
| url			| string			|  <p>null | not null</p>							|
| title			| string			|  <p>not null</p>							|
| description			| string			|  <p>null | not null</p>							|

Ex: mutation {
  publishPost(postType: "text", title:"test2", description:"test", url:"") {
    _id
    postType
    title
    description
    url
    _user {
      _id
      email
    }
  	created
  }
}

### Success Response

Success

```
HTTP/1.1 200 OK
{
  "data": {
    "publishPost": {
      "_id": "5e352794abfd82172f1f90ec",
      "postType": "text",
      "title": "test2",
      "description": "test",
      "url": "",
      "_user": {
        "_id": "5e288ed1871a0b6a59459c89",
        "email": "c@cc.com"
      },
      "created": "1580541844430"
    }
  }
}
```
### Error Response

{
  "error": {
      "errors": [
          "message": ....
      ]
  }
}

## Get all post

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|

Ex: {
  getAllPosts {
            _id
            postType
            title
            description
            url
            _user {
              _id
              email
            }
            created
        }
}

### Success Response

Success

```
HTTP/1.1 200 OK

  "data": {
    "getAllPosts": [
      {
        "_id": "5e35278babfd82172f1f90eb",
        "postType": "text",
        "title": "test2",
        "description": "test",
        "url": "",
        "_user": {
          "_id": "5e288ed1871a0b6a59459c89",
          "email": "c@cc.com"
        },
        "created": "1580541835691"
      },
      ...
      ]
}
```
### Error Response

{
  "error": {
      "errors": [
          "message": ....
      ]
  }
}

## Get post by user

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|

Ex: {
  postsByUser {
            _id
            postType
            title
            description
            url
            _user {
              _id
              email
            }
            created
        }
}

### Success Response

Success

```
HTTP/1.1 200 OK

  "data": {
    "getAllPosts": [
      {
        "_id": "5e35278babfd82172f1f90eb",
        "postType": "text",
        "title": "test2",
        "description": "test",
        "url": "",
        "_user": {
          "_id": "5e288ed1871a0b6a59459c89",
          "email": "c@cc.com"
        },
        "created": "1580541835691"
      },
      ...
      ]
}
```
### Error Response

{
  "error": {
      "errors": [
          "message": ....
      ]
  }
}

## Get post by id

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| string			|  <p>not null</p>						

Ex: query PostById{
  postById(id: "5e35278babfd82172f1f90eb") {
    _id
    postType
    title
    description
    url
    _user {
        _id
        email
    }
  	created
  }
}

### Success Response

Success

```
HTTP/1.1 200 OK

  "data": {
    "postById":
      {
        "_id": "5e35278babfd82172f1f90eb",
        "postType": "text",
        "title": "test2",
        "description": "test",
        "url": "",
        "_user": {
          "_id": "5e288ed1871a0b6a59459c89",
          "email": "c@cc.com"
        },
        "created": "1580541835691"
      }
}
```
### Error Response

{
  "error": {
      "errors": [
          "message": ....
      ]
  }
}



