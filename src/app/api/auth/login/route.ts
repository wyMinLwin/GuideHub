import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(req: NextRequest) {
	try {
		const client: MongoClient = await clientPromise;
		const db = client.db(process.env.DB_NAME);
		const userDb = db.collection("users");

		const { email, password } = await req.json();

		const user = await userDb.findOne({ email });
		const passwordCorrect =
			user === null ? false : await bcrypt.compare(password, user.password);

		if (!(user && passwordCorrect)) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid username or password",
				},
				{ status: 400 }
			);
		}

		const userForToken = {
			username: user.username,
			id: user._id,
		};

		const jwtSecret = process.env.SECRET ?? "";
		const token = jwt.sign(userForToken, jwtSecret, {
			expiresIn: MAX_AGE,
		});
		const cookieStore = cookies();
		cookieStore.set("guide-hub-token", token);

		return NextResponse.json(
			{
				success: true,
				message: "Authenticated!",
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(null, { status: 500 });
	}
}
