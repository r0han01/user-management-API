# Node.js Express MongoDB User Management API with Password Hashing
- A RESTful API for user management built with Node.js, Express, and MongoDB, featuring password hashing using bcrypt and dynamic web pages powered by EJS. This application enables user creation, retrieval, updates, and deletion.
###
![ScreenShot Tool -20250107031117](https://github.com/user-attachments/assets/30f912bd-cd2a-49ae-ad59-de0894b8b8f3)
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
###
![Screenshot from 2025-01-07 03-13-32](https://github.com/user-attachments/assets/bc701d12-2dbf-4f2a-bdea-3eec13d44530)

###

2. Retrieve All Users
- `GET /users`
- View all users in an EJS-rendered web page.
###
[screen-capture.webm](https://github.com/user-attachments/assets/d42773d5-ce93-4a5e-ab77-7cc190b16860)

###
3. Retrieve a Specific User
- `GET /users/r0han`
- Displays details for the user `r0han`.
###
[screen-capture (2).webm](https://github.com/user-attachments/assets/aa50e45e-ce22-4c91-9543-a3b6dce9c836)

###
4. Update User
- `PUT /users/r0han`
- Request Body (JSON):

```json
{
  "username": "r0han.k",
  "password": "RaNd0m@Pa$$123"
}
```
###
![Screenshot from 2025-01-07 03-30-21](https://github.com/user-attachments/assets/e49b4c56-cf45-45ee-b058-3fe638c88c4c)

###
![Screenshot from 2025-01-07 03-43-09](https://github.com/user-attachments/assets/1d4e3016-a6c1-4d77-86a5-b83dbe5be4ad)

###

5. Update Only Password
- `PATCH /users/r0han.k/password`
- Request Body (JSON):

```json
{
  "password": "An0th3r@Pa$$!"
}
```
###
![Screenshot from 2025-01-07 03-50-50](https://github.com/user-attachments/assets/caa3579d-b2ec-4ffd-9f37-60622f8e1723)

###
![ScreenShot Tool -20250107040343 (1)](https://github.com/user-attachments/assets/8c147365-b715-47b7-9980-fafb86773787)

###

6. Delete a User
`DELETE /users/r0han.k`
###
[screen-capture3-ezgif.com-video-cutter.webm](https://github.com/user-attachments/assets/61649427-ce7f-4cbf-9e74-e193c15d92fa)

###

### Example Screenshots

#### MongoDB Database: User Data
Add an image of your MongoDB database showing the user records.



##Contributing
- Feel free to submit issues and pull requests for improvements or feature suggestions.
