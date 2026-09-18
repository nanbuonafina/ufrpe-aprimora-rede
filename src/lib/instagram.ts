export interface InstagramPost {
  id: string
  caption: string
  mediaUrl?: string
  permalink: string
  timestamp: string
}

const GRAPH_FIELDS = 'id,caption,media_type,media_url,permalink,timestamp'

const GRAPH_API_VERSION = 'v21.0'

/**
 * Fetches the latest posts from the Instagram API with Instagram Login
 * (the successor to the deprecated Instagram Basic Display API).
 *
 * To go live:
 * 1. Create a Meta app, add the "Instagram" product and generate a
 *    long-lived Instagram access token for a Business/Creator account
 *    (https://developers.facebook.com/docs/instagram-platform).
 * 2. Set VITE_INSTAGRAM_ACCESS_TOKEN in your .env (see .env.example).
 * 3. For production, proxy this call through a small server/serverless
 *    function instead of calling graph.instagram.com from the browser, so
 *    the token isn't exposed in client-side bundles.
 */
export async function fetchInstagramPosts(accessToken: string, limit = 6): Promise<InstagramPost[]> {
  const url = `https://graph.instagram.com/${GRAPH_API_VERSION}/me/media?fields=${GRAPH_FIELDS}&access_token=${accessToken}&limit=${limit}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Instagram API respondeu com status ${response.status}`)
  }
  const data = (await response.json()) as { data: Array<Record<string, string>> }
  return data.data.map((item) => ({
    id: item.id,
    caption: item.caption ?? '',
    mediaUrl: item.media_url,
    permalink: item.permalink,
    timestamp: item.timestamp,
  }))
}
