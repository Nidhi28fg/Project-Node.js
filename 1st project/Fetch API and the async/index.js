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


//Async/Await:

//The second part defines an async function called main.
// It uses await to handle the Fetch call, simplifying the syntax and making it easier to read.
// It fetches data, then converts the response to JSON and logs the length of the  todos array
