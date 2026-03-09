export async function uploadFile(file: Buffer, filename: string): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const bucket = process.env.S3_BUCKET_NAME || 'redline-bucket'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const region = process.env.AWS_REGION || 'eu-west-3'

  return 'https://example.com/' + filename
}

