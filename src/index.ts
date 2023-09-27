import "dotenv/config";
import express from "express";
import userRouter from "./routers/users.routes";
import { userMiddleware } from "./middlewares/user.middlewares";
import { db } from "./services/database.services";

db.connect();
const app = express();
const port = 3000;

app.use(express.json());
app.use("/user", userMiddleware, userRouter);

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
