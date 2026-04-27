interface Env {
  LASTFM_API_KEY?: string
  LASTFM_USERNAME?: string
}

type LastFmImage = {
  '#text'?: string
  size?: string
}

type LastFmArtist = {
  '#text'?: string
  name?: string
}

type LastFmAlbum = {
  '#text'?: string
}

type LastFmDate = {
  uts?: string
  '#text'?: string
}

type LastFmTrack = {
  name?: string
  artist?: LastFmArtist
  album?: LastFmAlbum
  image?: LastFmImage[]
  url?: string
  date?: LastFmDate
  '@attr'?: {
    nowplaying?: string
  }
}

type LastFmRecentTracksResponse = {
  recenttracks?: {
    track?: LastFmTrack | LastFmTrack[]
  }
  error?: number
  message?: string
}

type MusicState =
  | { status: 'playing'; title: string; artist: string; album: string; albumArt?: string; songUrl?: string; source: 'lastfm' }
  | { status: 'recent'; title: string; artist: string; album: string; albumArt?: string; songUrl?: string; playedAt?: string; source: 'lastfm' }
  | { status: 'misconfigured'; message: string }
  | { status: 'error'; message: string }
  | { status: 'offline'; message?: string }

const lastFmApiRoot = 'https://ws.audioscrobbler.com/2.0/'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'cache-control': 'public, max-age=0, s-maxage=30',
    },
  })

const asArray = <T>(value: T | T[] | undefined): T[] => {
  if (!value) {
    return []
  }
  return Array.isArray(value) ? value : [value]
}

const getAlbumArt = (images?: LastFmImage[]) => {
  const ordered = ['extralarge', 'large', 'medium', 'small']
  for (const size of ordered) {
    const url = images?.find((image) => image.size === size)?.['#text']
    if (url) {
      return url
    }
  }
  return images?.find((image) => image['#text'])?.['#text']
}

const buildSpotifySearchUrl = (artist: string, title: string) =>
  `https://open.spotify.com/search/${encodeURIComponent(`${artist} ${title}`)}`

const formatTrack = (track: LastFmTrack) => {
  const artist = track.artist?.['#text'] || track.artist?.name || 'Unknown artist'
  const title = track.name || 'Unknown track'

  return {
    title,
    artist,
    album: track.album?.['#text'] || '',
    albumArt: getAlbumArt(track.image),
    songUrl: track.url || buildSpotifySearchUrl(artist, title),
    playedAt: track.date?.uts ? new Date(Number(track.date.uts) * 1000).toISOString() : undefined,
  }
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const apiKey = env.LASTFM_API_KEY
  const username = env.LASTFM_USERNAME

  if (!apiKey || !username) {
    return json({
      status: 'misconfigured',
      message: 'Missing Last.fm config in Cloudflare Pages. Add LASTFM_API_KEY and LASTFM_USERNAME to the active environment.',
    } satisfies MusicState)
  }

  try {
    const url = new URL(lastFmApiRoot)
    url.searchParams.set('method', 'user.getrecenttracks')
    url.searchParams.set('user', username)
    url.searchParams.set('api_key', apiKey)
    url.searchParams.set('format', 'json')
    url.searchParams.set('limit', '1')
    url.searchParams.set('extended', '1')

    const response = await fetch(url.toString())

    if (!response.ok) {
      const details = await response.text()
      console.error(`Last.fm request failed (${response.status}): ${details}`)
      return json({
        status: 'error',
        message: `Last.fm request failed (${response.status}). Check your API key and username.`,
      } satisfies MusicState)
    }

    const payload = (await response.json()) as LastFmRecentTracksResponse

    if (payload.error) {
      console.error(`Last.fm API error (${payload.error}): ${payload.message}`)
      return json({
        status: 'error',
        message: `Last.fm API error (${payload.error}): ${payload.message ?? 'Unable to load music activity.'}`,
      } satisfies MusicState)
    }

    const latest = asArray(payload.recenttracks?.track)[0]

    if (!latest) {
      return json({
        status: 'offline',
        message: 'No Last.fm listening activity was returned for this account yet.',
      } satisfies MusicState)
    }

    const formatted = formatTrack(latest)
    const isNowPlaying = latest['@attr']?.nowplaying === 'true'

    return json({
      status: isNowPlaying ? 'playing' : 'recent',
      ...formatted,
      source: 'lastfm',
    } satisfies MusicState)
  } catch (error) {
    console.error('Unexpected Last.fm API error:', error)
    return json({
      status: 'error',
      message: 'Unexpected Last.fm error while loading music activity. Check the Cloudflare Functions logs for the exact failure.',
    } satisfies MusicState)
  }
}
