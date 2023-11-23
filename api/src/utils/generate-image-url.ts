export function generateImageUrl(fileName: string) {
  const API_BASE_URL = process.env.API_BASE_URL

  return `${API_BASE_URL}/images/${fileName}`
}
