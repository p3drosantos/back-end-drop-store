import { Router } from "express";
import { generatePresignedUrl } from "../services/s3Service";

const uploadsRoutes = Router();

uploadsRoutes.post("/presigned-url", async (req, res) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    return res.status(400).json({ error: "fileName e fileType são obrigatórios" });
  }

  const { uploadUrl, fileUrl } = await generatePresignedUrl(fileName, fileType);

  return res.json({ uploadUrl, fileUrl });
});

export { uploadsRoutes };