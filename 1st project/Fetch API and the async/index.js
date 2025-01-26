//different between fetch and axios
//Both are tools used to get data from the internet, like retrieving information from a website.  
// fetch is a built-in browser feature, meaning it's already available in your web browser without needing extra code. 
// Axios is a JavaScript library, so you need to add it to your project.  npm install axios
// While both get data, Axios often offers more features and easier ways to handle things like errors.  
// Think of fetch as a basic tool, and Axios as a more advanced, feature-rich version.
// Normally, when you get data from the internet, you might need to take extra steps to turn it into a usable JSON format. 
//Axios handles this automatically, making it easier to work with the data you receive.  It simplifies the process, saving you time and effort.


// Using Fetch API with.then
function main() {
    fetch("https://sum-server.100xdevs.com/todos")
    .then(async (response) => {
        const json = await response.json();
        console.log(json.todos.length);
        // await response.text();
    });
}

main();


// Using Fetch API with async/await
async function main() {
    try {
        const response = await fetch("https://sum-server.100xdevs.com/todos");
        const json = await response.json();
        console.log(json.todos.length);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

main();

// Fetch API:

// The first part (commented out) uses the Fetch API to request data from a URL.
// It waits for the response and processes it using .then(), an older way of handling promises.
// fetch take defaulte mothode get 


//Async/Await:

//The second part defines an async function called main.
// It uses await to handle the Fetch call, simplifying the syntax and making it easier to read.
// It fetches data, then converts the response to JSON and logs the length of the  todos array



async function main() {
  const response = await axios.get("https://sum-server.100xdevs.com/todos");
  console.log(response.data.todos.length);
}

main();
//Fetch is like a basic, built-in ordering system – simple to use but not as fancy. 
//Axios is like a more advanced app with extra features, making things easier for more complex orders. 



//How to use other method of Node.js 
const axios = require("axios");

// Incorrect PUT request - missing request body
async function main() {
  const response = await axios.put("https://sum-server.100xdevs.com/todos", {
    method: "PUT"
  });
  const json = await response.json();
  console.log(json.todos.length);
}


// DELETE request
async function main() {
  const response = await axios.delete("https://sum-server.100xdevs.com/todos");
  console.log(response.data.todos.length);
}

main(); // Calls the second main function.
