import { useEffect, useRef, useState } from 'react'

interface Track {
  title: string
  artist: string
  src: string
  cover?: string
}

const TRACKS: Track[] = [
  { title: 'Track 01', artist: 'Artist Name', src: '/music/track1.mp3', cover: '/music/cover1.jpg' },
  { title: 'Track 02', artist: 'Artist Name', src: '/music/track2.mp3', cover: '/music/cover2.jpg' },
  { title: 'Track 03', artist: 'Artist Name', src: '/music/track3.mp3', cover: '/music/cover3.jpg' },
]

export default function MusicPlayer() {
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [bars, setBars] = useState<number[]>(Array(28).fill(2))

  const audioRef = useRef<HTMLAudioElement>(null)
  const animRef  = useRef<number>(0)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef   = useRef<MediaElementAudioSourceNode | null>(null)
  const ctxRef      = useRef<AudioContext | null>(null)

  const track = TRACKS[trackIndex]

  // setup web audio analyser
  const setupAnalyser = () => {
    if (!audioRef.current || ctxRef.current) return
    const ctx = new AudioContext()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 64
    const source = ctx.createMediaElementSource(audioRef.current)
    source.connect(analyser)
    analyser.connect(ctx.destination)
    ctxRef.current    = ctx
    analyserRef.current = analyser
    sourceRef.current   = source
  }

  const drawBars = () => {
    if (!analyserRef.current) return
    const data = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(data)
    const count = 28
    const step  = Math.floor(data.length / count)
    setBars(Array.from({ length: count }, (_, i) => {
      const val = data[i * step] / 255
      return Math.max(2, val * 52)
    }))
    animRef.current = requestAnimationFrame(drawBars)
  }

  const stopBars = () => {
    cancelAnimationFrame(animRef.current)
    setBars(Array(28).fill(2))
  }

  const togglePlay = async () => {
    if (!audioRef.current) return
    setupAnalyser()
    if (ctxRef.current?.state === 'suspended') await ctxRef.current.resume()
    if (playing) {
      audioRef.current.pause()
      stopBars()
    } else {
      await audioRef.current.play()
      drawBars()
    }
    setPlaying(!playing)
  }

  const prevTrack = () => {
    setTrackIndex(i => (i - 1 + TRACKS.length) % TRACKS.length)
    setPlaying(false)
    stopBars()
  }

  const nextTrack = () => {
    setTrackIndex(i => (i + 1) % TRACKS.length)
    setPlaying(false)
    stopBars()
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = ratio * duration
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      setCurrentTime(audio.currentTime)
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    }
    const onLoad = () => setDuration(audio.duration)
    const onEnd  = () => nextTrack()
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoad)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoad)
      audio.removeEventListener('ended', onEnd)
    }
  }, [trackIndex])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // auto play next track
  useEffect(() => {
    if (playing && audioRef.current) {
      audioRef.current.load()
      audioRef.current.play().then(() => drawBars()).catch(() => {})
    }
  }, [trackIndex])

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

        @keyframes mp-in  { from{opacity:0;transform:translateY(20px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes mp-out { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(20px) scale(.96)} }
        @keyframes spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse  { 0%,100%{opacity:.4} 50%{opacity:1} }

        .mp-wrap {
          position: fixed;
          bottom: 2rem; right: 2rem;
          z-index: 999;
          font-family: 'Outfit', sans-serif;
        }

        /* collapsed pill */
        .mp-pill {
          display: flex; align-items: center; gap: 10px;
          background: rgba(10,10,10,0.92);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          padding: 8px 16px 8px 8px;
          cursor: pointer;
          backdrop-filter: blur(20px);
          transition: border-color .2s, transform .2s;
          box-shadow: 0 8px 32px rgba(0,0,0,.6);
        }
        .mp-pill:hover { border-color: rgba(255,255,255,.25); transform: translateY(-2px); }

        .mp-pill-art {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,.06);
          overflow: hidden; flex-shrink: 0;
          animation: ${playing ? 'spin 8s linear infinite' : 'none'};
        }
        .mp-pill-art img { width:100%; height:100%; object-fit:cover; }
        .mp-pill-art-placeholder {
          width:100%; height:100%;
          display:flex; align-items:center; justify-content:center;
          font-size:.7rem; color:rgba(255,255,255,.3);
        }
        .mp-pill-info { flex:1; min-width:0; }
        .mp-pill-title { font-size:.72rem; font-weight:500; color:rgba(255,255,255,.85); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .mp-pill-artist { font-size:.62rem; color:rgba(255,255,255,.3); }
        .mp-pill-btn {
          width:28px; height:28px; border-radius:50%;
          background:rgba(255,255,255,.08); border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          color:#fff; transition:background .2s; flex-shrink:0;
        }
        .mp-pill-btn:hover { background:rgba(255,255,255,.15); }

        /* expanded card */
        .mp-card {
          width: 300px;
          background: #0c0c0c;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.04);
          animation: mp-in .3s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* album art header */
        .mp-art {
          position: relative;
          height: 160px;
          background: #111;
          overflow: hidden;
        }
        .mp-art img { width:100%; height:100%; object-fit:cover; }
        .mp-art-placeholder {
          width:100%; height:100%;
          display:flex; align-items:center; justify-content:center;
          background: linear-gradient(135deg, #111 0%, #1a1a1a 100%);
          font-size: 3rem;
        }
        .mp-art-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to bottom, transparent 40%, rgba(12,12,12,1) 100%);
        }
        .mp-art-close {
          position:absolute; top:10px; right:10px;
          width:26px; height:26px; border-radius:50%;
          background:rgba(0,0,0,.5); border:1px solid rgba(255,255,255,.1);
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; color:rgba(255,255,255,.6); transition:all .2s;
        }
        .mp-art-close:hover { background:rgba(0,0,0,.8); color:#fff; }

        /* body */
        .mp-body { padding: 0 1.2rem 1.2rem; }

        .mp-info { margin-bottom: 1rem; }
        .mp-title  { font-size:.95rem; font-weight:600; color:rgba(255,255,255,.9); margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .mp-artist { font-size:.75rem; color:rgba(255,255,255,.3); font-family:'JetBrains Mono',monospace; }

        /* VISUALIZER */
        .mp-viz {
          display:flex; align-items:flex-end; gap:2px;
          height:56px; margin-bottom:1rem;
          padding: 0 2px;
        }
        .mp-bar {
          flex:1; border-radius:2px 2px 0 0;
          background: rgba(255,255,255,.18);
          transition: height .08s ease;
          min-height:2px;
        }
        .mp-bar.active { background: rgba(255,255,255,.55); }

        /* progress */
        .mp-progress-wrap {
          cursor:pointer; margin-bottom:.5rem;
          padding: 6px 0;
        }
        .mp-progress-track {
          height:2px; background:rgba(255,255,255,.1); border-radius:2px; position:relative;
        }
        .mp-progress-fill {
          height:100%; border-radius:2px;
          background:rgba(255,255,255,.7);
          transition:width .1s linear;
          position:relative;
        }
        .mp-progress-fill::after {
          content:''; position:absolute; right:-4px; top:50%;
          transform:translateY(-50%);
          width:8px; height:8px; border-radius:50%;
          background:#fff;
          opacity:0; transition:opacity .2s;
        }
        .mp-progress-wrap:hover .mp-progress-fill::after { opacity:1; }

        .mp-times {
          display:flex; justify-content:space-between;
          font-family:'JetBrains Mono',monospace;
          font-size:.6rem; color:rgba(255,255,255,.2);
        }

        /* controls */
        .mp-controls {
          display:flex; align-items:center; justify-content:center;
          gap:.8rem; margin: .8rem 0;
        }
        .mp-ctrl {
          background:none; border:none; cursor:pointer;
          color:rgba(255,255,255,.4); transition:color .2s, transform .2s;
          display:flex; align-items:center; justify-content:center;
          padding:4px;
        }
        .mp-ctrl:hover { color:rgba(255,255,255,.9); transform:scale(1.1); }
        .mp-ctrl.play {
          width:44px; height:44px; border-radius:50%;
          background:#fff; color:#0c0c0c;
          transition:transform .2s, box-shadow .2s;
        }
        .mp-ctrl.play:hover { transform:scale(1.08); box-shadow:0 8px 24px rgba(255,255,255,.2); }

        /* volume */
        .mp-vol {
          display:flex; align-items:center; gap:8px;
          margin-top:.4rem;
        }
        .mp-vol-icon { color:rgba(255,255,255,.25); flex-shrink:0; }
        .mp-vol-slider {
          flex:1; -webkit-appearance:none; appearance:none;
          height:2px; background:rgba(255,255,255,.1); border-radius:2px; outline:none; cursor:pointer;
        }
        .mp-vol-slider::-webkit-slider-thumb {
          -webkit-appearance:none; width:10px; height:10px;
          border-radius:50%; background:#fff; cursor:pointer;
        }

        /* track list */
        .mp-tracks { border-top:1px solid rgba(255,255,255,.05); margin-top:.8rem; padding-top:.8rem; }
        .mp-track-row {
          display:flex; align-items:center; gap:10px;
          padding:6px 0; cursor:pointer; transition:opacity .2s;
          border-radius:6px;
        }
        .mp-track-row:hover { opacity:.8; }
        .mp-track-num { font-family:'JetBrains Mono',monospace; font-size:.6rem; color:rgba(255,255,255,.2); width:14px; text-align:center; flex-shrink:0; }
        .mp-track-info { flex:1; min-width:0; }
        .mp-track-name { font-size:.75rem; color:rgba(255,255,255,.65); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .mp-track-name.active { color:#fff; }
        .mp-track-artist { font-size:.62rem; color:rgba(255,255,255,.25); }
        .mp-track-playing { animation:pulse 1.5s infinite; }
      `}</style>

      <audio ref={audioRef} src={track.src} preload="metadata"/>

      <div className="mp-wrap">
        {!expanded ? (
          /* PILL */
          <div className="mp-pill" onClick={() => setExpanded(true)}>
            <div className="mp-pill-art">
              {track.cover
                ? <img src={track.cover} alt={track.title}/>
                : <div className="mp-pill-art-placeholder">♪</div>
              }
            </div>
            <div className="mp-pill-info">
              <div className="mp-pill-title">{track.title}</div>
              <div className="mp-pill-artist">{track.artist}</div>
            </div>
            <button className="mp-pill-btn" onClick={e => { e.stopPropagation(); togglePlay(); }}>
              {playing
                ? <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                : <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
              }
            </button>
          </div>
        ) : (
          /* EXPANDED CARD */
          <div className="mp-card">
            {/* album art */}
            <div className="mp-art">
              {track.cover
                ? <img src={track.cover} alt={track.title}/>
                : <div className="mp-art-placeholder">🎵</div>
              }
              <div className="mp-art-overlay"/>
              <div className="mp-art-close" onClick={() => setExpanded(false)}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
            </div>

            <div className="mp-body">
              {/* info */}
              <div className="mp-info">
                <div className="mp-title">{track.title}</div>
                <div className="mp-artist">{track.artist}</div>
              </div>

              {/* visualizer */}
              <div className="mp-viz">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className={`mp-bar${playing ? ' active' : ''}`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>

              {/* progress */}
              <div className="mp-progress-wrap" onClick={seek}>
                <div className="mp-progress-track">
                  <div className="mp-progress-fill" style={{ width: `${progress}%` }}/>
                </div>
              </div>
              <div className="mp-times">
                <span>{fmt(currentTime)}</span>
                <span>{fmt(duration)}</span>
              </div>

              {/* controls */}
              <div className="mp-controls">
                <button className="mp-ctrl" onClick={prevTrack}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="19,20 9,12 19,4"/><rect x="5" y="4" width="2" height="16"/>
                  </svg>
                </button>
                <button className="mp-ctrl play" onClick={togglePlay}>
                  {playing
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                  }
                </button>
                <button className="mp-ctrl" onClick={nextTrack}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,4 15,12 5,20"/><rect x="17" y="4" width="2" height="16"/>
                  </svg>
                </button>
              </div>

              {/* volume */}
              <div className="mp-vol">
                <svg className="mp-vol-icon" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                  {volume > 0.5 && <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>}
                  {volume > 0 && volume <= 0.5 && <path d="M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>}
                </svg>
                <input
                  type="range" min="0" max="1" step="0.01"
                  value={volume}
                  className="mp-vol-slider"
                  onChange={e => setVolume(parseFloat(e.target.value))}
                />
              </div>

              {/* track list */}
              <div className="mp-tracks">
                {TRACKS.map((t, i) => (
                  <div key={i} className="mp-track-row" onClick={() => { setTrackIndex(i); setPlaying(false); stopBars(); }}>
                    <span className="mp-track-num">
                      {i === trackIndex && playing
                        ? <span className="mp-track-playing">▶</span>
                        : i + 1
                      }
                    </span>
                    <div className="mp-track-info">
                      <div className={`mp-track-name${i === trackIndex ? ' active' : ''}`}>{t.title}</div>
                      <div className="mp-track-artist">{t.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
