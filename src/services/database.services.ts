import { Db, MongoClient } from "mongodb";

if (!process.env.MONGO_USERNAME || !process.env.MONGO_PASSWORD) {
	throw new Error("Please specify MONGO_USERNAME and MONGO_PASSWORD in .env file");
}

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@social.tswgkqi.mongodb.net/?retryWrites=true&w=majority`;

class DatabaseService {
	private client: MongoClient;
	private db: Db;

	constructor() {
		this.client = new MongoClient(uri);
		this.db = this.client.db("social");
	}

	async connect() {
		try {
			await this.client.connect();
			await this.client.db("social").command({ ping: 1 });

			console.log("Pinged your deployment. You successfully connected to MongoDB!");
		} catch (error) {
			console.log(error);
		} finally {
			// Ensures that the client will close when you finish/error
			// await this.client.close();
		}
	}

	get users() {
		return this.db.collection("users");
	}
	get refreshToken() {
		return this.db.collection("refreshToken");
	}
}

const db = new DatabaseService();

export { db };
