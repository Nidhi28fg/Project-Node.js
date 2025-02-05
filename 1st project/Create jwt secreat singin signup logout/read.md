# **Week 06 - 6.2 | Auth and Connecting FE to BE**

## Assignment #1 - Conditionally render the `logout` or the `signin`/ `signup` pages based on if the user is already logged in or not

Writing the frontend for it

Until now, we’ve been using POSTMAN to send out all of our requests.

Now, lets create a `full stack` application. Lets write the frontend that lets you

1. Signup
2. Signin
3. Get your information
4. Logout

### Writing the frontend

<details> 
<summary>Create a `public/index.html` file</summary>

```sh
mkdir public
cd public
touch index.html
```

</details>

 <details> 
<summary>Create a `signup section` </summary>

```html
<div>
    Signup
    <input type="text" name="username" placeholder="Username" />
    <input type="password" name="password" placeholder="Password" />
    <button onclick="signup()">Submit</button>
</div>
```

</details>

<details> 
<summary>Create a `signin section`</summary>

```html
<div>
    Signin
    <input type="text" name="username" placeholder="Username">
    <input type="password" name="password" placeholder="Password">
    <button onclick="signin()">Submit</button>
</div>
```
</details>

<details>
<summary>Create a `User information` section</summary>

```html
<div>
    User information:
    <div id="information"></div>
</div>
```
</details>

<details> 
<summary>Create a logout button</summary>

```html
<div>
    <button onclick="logout()">Logout</button>
</div>
```
</details>

### Writing the onclick handlers

<details> 
<summary>Add the axios external library</summary>

```jsx
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.7/axios.min.js"></script>
```
</details>

<details> 
<summary>Write the signup function</summary>

```jsx
async function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    const response = await axios.post("http://localhost:3000/signup", {
        username: username,
        password: password,
    });
    alert("Signed up successfully");
}
```
</details>

<details> 
<summary>Write the signin function</summary>

```jsx
async function signin() {
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    const response = await axios.post("http://localhost:3000/signin", {
        username: username,
        password: password,
    });

    localStorage.setItem("token", response.data.token);

    alert("Signed in successfully");
}
```
</details>
    
<details> 
<summary>Write the logout function</summary>

```jsx
async function logout() {
    localStorage.removeItem("token");
}
```
</details>

<details> 
<summary>Write the `getUserInformation` function</summary>

```jsx
async function getUserInformation() {
    const token = localStorage.getItem("token");

    if (token) {
        const response = await axios.get("http://localhost:3000/me", {
            headers: {
                Authorization: token,
            },
        });
        document.getElementById("information").innerHTML = response.data.username;
    }
}
```
</details>

### Updating the backend

Lets serve the `index.html` file directly from the backend

<details> 
<summary>Approach #1</summary>

```jsx
app.get("/", function (req, res) {
    res.sendFile("./public/index.html");
});
```
</details>

<details> 
<summary>Approach #2</summary>

```jsx
app.use(express.static("./public"));
```
</details>   


![Screenshot](https://petal-estimate-4e9.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd5363587-94b4-404e-b1a6-0649d256ca05%2FScreenshot_2024-09-08_at_7.44.28_PM.png?table=block&id=44fa4fba-c15a-4dae-8867-54a35c4ba996&spaceId=085e8ad8-528e-47d7-8922-a23dc4016453&width=2000&userId=&cache=v2)

## Firing the `getUserInformation` call

<details> 
<summary>Call the `getUserInformation` function when the page loads</summary>

```jsx
getUserInformation();
```
</details>

### Assignment
Conditionally render the `logout` or the `signin`/ `signup` pages based on if the user is already logged in or not


## Assignment #2 - Creating a TODO app

Try to create a TODO application where

1. User can signup/signin
2. User can create/delete/update TODOs
3. User can see their existing todos and mark them as done





# **Week 06 - 6.2 | Auth and Connecting FE to BE**


## [Notes / Slides Link](https://petal-estimate-4e9.notion.site/Authentincation-a4b43c7cc1d14535a7b5b366080095fa?pvs=74)


## Article/Blogs Link:
- [**Express Explained with Examples - Installation, Routing, Middleware, and More**](https://www.freecodecamp.org/news/express-explained-with-examples-installation-routing-middleware-and-more/) - **Recommended - Must Read**
- [**Authentication and Authorization in Node.js**](https://codewithpawan.medium.com/authentication-and-authorization-in-node-js-a-comprehensive-guide-2755b57dce27)
- [**How to Authenticate Users and Implement CORS in Node.js Apps**](https://www.freecodecamp.org/news/how-to-authenticate-users-and-implement-cors-in-nodejs-applications/)
- [**How To Implement JWT Authentication On Node**](https://adevait.com/nodejs/how-to-implement-jwt-authentication-on-node)
- [**JWT Authentication in Node.js**](https://dvmhn07.medium.com/jwt-authentication-in-node-js-a-practical-guide-c8ab1b432a49)
- [**Token-Based Authentication In Node.js Using JWT**](https://www.scholarhat.com/tutorial/nodejs/token-based-authentication-using-json-web-token)
- [**Window: localStorage property**](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [**How to Use LocalStorage in JavaScript**](https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/)
- [**What are cookies?**](https://www.cloudflare.com/learning/privacy/what-are-cookies/)
- [**What are cookies in website ? Why we use Cookies ?**](https://medium.com/@vinciabhinav7/what-are-cookies-in-website-why-we-use-cookies-18ca67339e43)

## Official Website
- [**Node.js**](https://nodejs.org/en)
- [**Express**](https://expressjs.com/)
- [**Express Middleware**](https://expressjs.com/en/guide/using-middleware.html)
- [**NPM**](https://www.npmjs.com/)
- [**JWT**](https://jwt.io/)

install-----
npm install express jsonwebtoken

run------
node index.js