interface Env {
  SPOTIFY_CLIENT_ID?: string
  SPOTIFY_CLIENT_SECRET?: string
  SPOTIFY_REFRESH_TOKEN?: string
}

type SpotifyTokenResponse = {
  access_token: string
}

type SpotifyImage = {
  url: string
}

type SpotifyArtist = {
  name: string
}

type SpotifyAlbum = {
  name: string
  images?: SpotifyImage[]
}

type SpotifyTrack = {
  name: string
  duration_ms?: number
  artists: SpotifyArtist[]
  album: SpotifyAlbum
  external_urls?: {
    spotify?: string
  }
}

type SpotifyCurrentlyPlayingResponse = {
  is_playing: boolean
  progress_ms?: number
  item?: SpotifyTrack | null
}

type SpotifyRecentlyPlayedResponse = {
  items?: Array<{
    played_at: string
    track: SpotifyTrack
  }>
}

const spotifyTokenUrl = 'https://accounts.spotify.com/api/token'
const spotifyCurrentlyPlayingUrl = 'https://api.spotify.com/v1/me/player/currently-playing'
const spotifyRecentlyPlayedUrl = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'cache-control': 'public, max-age=0, s-maxage=30',
    },
  })

const encodeBasicAuth = (clientId: string, clientSecret: string) => btoa(`${clientId}:${clientSecret}`)

type SpotifyState =
  | { status: 'playing'; title: string; artist: string; album: string; albumArt?: string; songUrl?: string; progressMs: number; durationMs: number }
  | { status: 'recent'; title: string; artist: string; album: string; albumArt?: string; songUrl?: string; playedAt: string }
  | { status: 'misconfigured'; message: string }
  | { status: 'error'; message: string }
  | { status: 'offline'; message?: string }

async function getAccessToken(env: Env) {
  const clientId = env.SPOTIFY_CLIENT_ID
  const clientSecret = env.SPOTIFY_CLIENT_SECRET
  const refreshToken = env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    return {
      error: json({
        status: 'misconfigured',
        message: 'Missing Spotify secrets in Cloudflare Pages. Add SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN to the active environment.',
      } satisfies SpotifyState),
    }
  }

  const response = await fetch(spotifyTokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodeBasicAuth(clientId, clientSecret)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    return {
      error: json({
        status: 'error',
        message: `Spotify token refresh failed (${response.status}). Regenerate the refresh token with the scopes user-read-currently-playing and user-read-recently-played. ${details}`.trim(),
      } satisfies SpotifyState),
      logMessage: `Spotify token refresh failed (${response.status}): ${details}`,
    }
  }

  return { token: (await response.json()) as SpotifyTokenResponse }
}

const formatTrack = (track: SpotifyTrack) => ({
  title: track.name,
  artist: track.artists.map((artist) => artist.name).join(', '),
  album: track.album.name,
  albumArt: track.album.images?.[0]?.url,
  songUrl: track.external_urls?.spotify,
})

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const token = await getAccessToken(env)

    if ('error' in token) {
      if (token.logMessage) {
        console.error(token.logMessage)
      }
      return token.error
    }

    const headers = {
      Authorization: `Bearer ${token.token.access_token}`,
    }

    const currentResponse = await fetch(spotifyCurrentlyPlayingUrl, { headers })

    if (currentResponse.ok && currentResponse.status !== 204) {
      const current = (await currentResponse.json()) as SpotifyCurrentlyPlayingResponse

      if (current.is_playing && current.item) {
        return json({
          status: 'playing',
          ...formatTrack(current.item),
          progressMs: current.progress_ms ?? 0,
          durationMs: current.item.duration_ms ?? 0,
        })
      }
    }

    const recentResponse = await fetch(spotifyRecentlyPlayedUrl, { headers })

    if (!recentResponse.ok) {
      const details = await recentResponse.text()
      console.error(`Spotify recently played request failed (${recentResponse.status}): ${details}`)
      return json({
        status: 'error',
        message: `Spotify recently played request failed (${recentResponse.status}). Your refresh token likely does not have the user-read-recently-played scope yet.`,
      } satisfies SpotifyState)
    }

    const recent = (await recentResponse.json()) as SpotifyRecentlyPlayedResponse
    const latest = recent.items?.[0]

    if (!latest) {
      return json({
        status: 'offline',
        message: 'No recently played Spotify tracks were returned for this account yet.',
      } satisfies SpotifyState)
    }

    return json({
      status: 'recent',
      ...formatTrack(latest.track),
      playedAt: latest.played_at,
    })
  } catch (error) {
    console.error('Unexpected Spotify API error:', error)
    return json({
      status: 'error',
      message: 'Unexpected Spotify error while loading playback data. Check the Cloudflare Functions logs for the exact failure.',
    } satisfies SpotifyState)
  }
}
