import {MongoClient} from "mongodb"

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body

        const client = await MongoClient.connect("mongodb+srv://Sahil:sahil2000@cluster0.8iytytr.mongodb.net/meetups?retryWrites=true&w=majority")

        const db = client.db()
        const meetupsCollection = db.collection("meetups")
        const {title, image, address, description} = data

        const result = await meetupsCollection.insertOne({title, image, address, description})
        console.log(result);
        client.close();

        res.status(201).json({message: "Meetup inserted"})
    }
}

export default handler;