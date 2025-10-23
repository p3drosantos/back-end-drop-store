import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const s3 = new S3Client(
);

export async function generatePresignedUrl(fileName: string, fileType: string) {
  const fileKey = `FSW Store/${randomUUID()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileKey,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  const safeFileKey = fileKey.replace(/ /g, '+'); // ou '%20'
const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.sa-east-1.amazonaws.com/${safeFileKey}`;


  return { uploadUrl, fileUrl };
}

export { s3 };
