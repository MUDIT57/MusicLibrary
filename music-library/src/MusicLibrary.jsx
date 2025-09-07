import React, { useState } from "react";
import { Music, Plus, Trash2, Play } from "lucide-react";
import '/src/styles/musicLibrary.css'; 

export default function MusicLibrary({ role = "user" }) {
  const [songs] = useState([
    { id: 1, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", duration: "5:55" },
    { id: 2, title: "Hotel California", artist: "Eagles", album: "Hotel California", duration: "6:30" },
    { id: 3, title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV", duration: "8:02" },
    { id: 4, title: "Imagine", artist: "John Lennon", album: "Imagine", duration: "3:07" },
  ]);

  const handleAddSong = () => alert("Add song functionality here");
  const handleRemoveSong = (id) => alert(`Remove song ${id} functionality here`);
  const handlePlaySong = (song) => alert(`Playing ${song.title}`);

  return (
    <div className="container">
      <div className="wrapper">
        {/* Header */}
        <div className="header">
          <div className="headerIcon">
            <Music size={20} />
          </div>
          <div>
            <h1 className="headerTitle">Music Library</h1>
            <p className="headerRole">Role: {role}</p>
          </div>
        </div>

        {/* Add Song */}
        {role === "admin" && (
          <button className="addSongBtn" onClick={handleAddSong}>
            <Plus size={16} /> Add Song
          </button>
        )}

        {/* Song List */}
        <div className="songGroup">
          {songs.map((song, index) => (
            <div key={song.id} className="songItem">
              <div className="songIndex">{index + 1}</div>
              <div className="songInfo">
                <h4>{song.title}</h4>
                <p>{song.artist} • {song.album} • {song.duration}</p>
              </div>
              <div className="songActions">
                <button className="actionBtn playBtn" onClick={() => handlePlaySong(song)}>
                  <Play size={16} />
                </button>
                {role === "admin" && (
                  <button className="actionBtn removeBtn" onClick={() => handleRemoveSong(song.id)}>
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="footer">
          Total: {songs.length} songs | Showing: {songs.length} songs
        </div>
      </div>
    </div>
  );
}
