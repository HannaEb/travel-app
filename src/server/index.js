// Require app
const app = require("./server");

// Set up server
const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});
