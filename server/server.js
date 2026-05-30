import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/config/db.js";
connectToDB();
const port = process.env.SERVER_PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at port:${port} `);
});
