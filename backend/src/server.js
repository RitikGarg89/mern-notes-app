import connectDB from "./config/db.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️  Server is running at PORT: ${process.env.PORT}`)
    })
  }
  ).catch((error) =>
    console.error(`${error}`)
  )
