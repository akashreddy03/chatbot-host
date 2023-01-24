import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstname, lastname, email, password } = req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !email.includes("@") ||
      !password
    ) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }

    const client = await MongoClient.connect(process.env.MONGO_URI!);

    const db = client.db();

    const checkExisting = await db
      .collection("users")
      .findOne({ email: email });

    if (checkExisting) {
      res.status(422).json({ message: "User already exists" });
      client.close();
      return;
    }

    const status = await db.collection("users").insertOne({
      firstname,
      lastname,
      email,
      password: await hash(password, 12),
    });

    res.status(201).json({ message: "User created successfully", ...status });

    client.close();
  } else {
    res.status(500).json({ message: "Route not valid" });
  }
}
