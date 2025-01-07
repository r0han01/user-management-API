# Node.js Express MongoDB User Management API with Password Hashing
- A RESTful API for user management built with Node.js, Express, and MongoDB, featuring password hashing using bcrypt and dynamic web pages powered by EJS. This application enables user creation, retrieval, updates, and deletion.

### Features
- Create users with hashed passwords.
- Retrieve all users or a specific user by username.
- Update username and/or password.
- Delete users from the database.
- Dynamic web pages to display user data.
### Installation
- Clone the repository:

```bash
git clone git@github.com:r0han01/user-management-API.git
cd user-management-API
```
#### Install dependencies:

```bash
npm install
```
#### Configure MongoDB:

- Set up a MongoDB database and add the URI to a config.js file:
```javascript
module.exports = {
  mongodb: { uri: 'mongodb://localhost:27017/Credentials' }, // most cases it would be 
};
```
- Start the server:

```bash
node app.js
```
- The server will run at http://localhost:8081.
### Usage
1. Create a User
- `POST /users`
- Request Body (JSON):

```json
{
  "username": "r0han",
  "password": "vk3A^zEI!vu^HdC"
}
```
2. Retrieve All Users
- `GET /users`

- View all users in an EJS-rendered web page.
3. Retrieve a Specific User
- `GET /users/r0han`

- Displays details for the user `r0han`.
4. Update User
- `PUT /users/r0han`
- Request Body (JSON):

```json
{
  "username": "r0han.k",
  "password": "RaNd0m@Pa$$123"
}
```
5. Update Only Password
- `PATCH /users/r0han.k/password`
- Request Body (JSON):

```json
{
  "password": "An0th3r@Pa$$!"
}
```
6. Delete a User
`DELETE /users/r0han.k`

### Example Screenshots
1. Postman Request: Create User
Add an example image of the POST request in Postman here.

2. MongoDB Database: User Data
Add an image of your MongoDB database showing the user records.

3. User List Web Page
Add a screenshot of the /users web page showing the list of users.

4. User Detail Web Page
Add a screenshot of the /users/r0han web page showing specific user details.

##Contributing
- Feel free to submit issues and pull requests for improvements or feature suggestions.
