
const connect= require("./configs/db")
const app = require ("./index");
app.listen(2345, async function(){
    try {
        await connect()
        console.log("listening on port 2345");
    } catch(err) {

    console.log(err,"error");
    }
   
})


// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
  });
  