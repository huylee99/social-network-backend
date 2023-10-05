import "dotenv/config";
import express, { Response, Request } from "express";
import userRouter from "./routers/users.routes";
import { userMiddleware } from "./middlewares/user.middlewares";
import { db } from "./services/database.services";

db.connect();
const app = express();
const port = 3000;

app.use(express.json());

app.use("/user", userMiddleware, userRouter);
app.use((err: Error, req: Request, res: Response) => {
	res.status(400).json({
		message: err.message,
	});
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
