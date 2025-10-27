export default function generateURL(): string
{  
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let url = "";

  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * chars.length);
    url += chars[index];
  }

  return url;
}
