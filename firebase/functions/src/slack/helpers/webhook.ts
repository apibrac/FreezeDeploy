import express from "express";
import cors from "cors";
import * as functions from "firebase-functions";

export function slackWebhook(action: (id: string, text: string) => any) {
  const app = express();

  app.use(cors({ origin: true }));
  app.use(express.urlencoded({ extended: true }));

  app.post("/:id", async (req, res) => {
    const message = await action(req.params.id, req.body.text);
    return res.status(200).send(message);
  });

  return functions.https.onRequest(app);
}