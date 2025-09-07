import { useState } from "react"

const initialSongs = [
  { id: 1, title: "Song A", artist: "Artist X", album: "Album 1" },
  { id: 2, title: "Song B", artist: "Artist Y", album: "Album 2" }
]

export default function SongList({ role }) {
  const [songs, setSongs] = useState(initialSongs)

  const addSong = () => {
    const newSong = { id: Date.now(), title: "New Song", artist: "Unknown", album: "NA" }
    setSongs([...songs, newSong])
  }

  const deleteSong = (id) => {
    setSongs(songs.filter(s => s.id !== id))
  }

  return (
    <div>
      {role === "admin" && (
        <button className="px-3 py-1 bg-blue-500 text-white rounded mb-3"
          onClick={addSong}>+ Add Song</button>
      )}
      <ul className="space-y-2">
        {songs.map(song => (
          <li key={song.id} className="p-2 border rounded flex justify-between">
            <span>{song.title} - {song.artist} ({song.album})</span>
            {role === "admin" && (
              <button className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => deleteSong(song.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
