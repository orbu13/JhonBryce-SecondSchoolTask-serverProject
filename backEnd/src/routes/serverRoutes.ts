import express, { Request, Response } from "express";
import { getDb } from "../db/mongoClient";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/servers", async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const servers = await db
      .collection("servers")
      .aggregate([
        {
          $lookup: {
            from: "companies", 
            localField: "companyId",
            foreignField: "_id",
            as: "company",
          },
        },
        {
          $unwind: "$company", 
        },
      ])
      .toArray();

    res.json(servers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching servers", error });
  }
});

router.post("/server/status/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id)

  try {
    const db = getDb();
    const server = await db.collection("servers").findOne({ _id: id });
    console.log(server)
    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }

    const updatedStatus = server.status === "active" ? "inactive" : "active";
    await db
      .collection("servers")
      .updateOne({ _id: id }, { $set: { status: updatedStatus } });

    res.json({ message: "Status updated", server: { ...server, status: updatedStatus } });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
});

export default router;