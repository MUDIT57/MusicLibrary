import React, { useState, useMemo } from "react";
import { Music, Plus, Trash2, Play, Search } from "lucide-react";
import "./styles/musicLibrary.css";

export default function MusicLibrary({ role = "user" }) {
  const [songs, setSongs] = useState([
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: "5:55",
    },
    {
      id: 2,
      title: "Hotel California",
      artist: "Eagles",
      album: "Hotel California",
      duration: "6:30",
    },
    {
      id: 3,
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      duration: "8:02",
    },
    {
      id: 4,
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      duration: "3:07",
    },
    {
      id: 5,
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      album: "Appetite for Destruction",
      duration: "5:03",
    },
    {
      id: 6,
      title: "Comfortably Numb",
      artist: "Pink Floyd",
      album: "The Wall",
      duration: "6:23",
    },
  ]);

  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState("");
  const [groupField, setGroupField] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [newSongData, setNewSongData] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "",
  });

  const handleRemoveSong = (id) =>
    setSongs(songs.filter((song) => song.id !== id));

  const filteredSongs = useMemo(() => {
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(filterText.toLowerCase()) ||
        song.artist.toLowerCase().includes(filterText.toLowerCase()) ||
        song.album.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [songs, filterText]);

  const sortedSongs = useMemo(() => {
    if (!sortField) return filteredSongs;
    return [...filteredSongs].sort((a, b) =>
      a[sortField].localeCompare(b[sortField])
    );
  }, [filteredSongs, sortField]);

  const groupedSongs = useMemo(() => {
    if (!groupField) return { All: sortedSongs };
    return sortedSongs.reduce((groups, song) => {
      const key = song[groupField];
      if (!groups[key]) groups[key] = [];
      groups[key].push(song);
      return groups;
    }, {});
  }, [sortedSongs, groupField]);

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="header">
            <div className="headerIcon">
              <Music size={20} />
            </div>
            <div>
              <h1 className="headerTitle">Music Library</h1>
            </div>
          </div>

          <div className="controls">
            <div className="controlsGrid">
              <div className="searchContainer">
                <div className="searchIcon">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  className="searchInput"
                  placeholder="Search by title, artist, or album..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </div>

              <div className="filtersRow">
                <div className="selectContainer">
                  <label className="selectLabel">Sort By</label>
                  <select
                    className="select"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                  >
                    <option value="">None</option>
                    <option value="title">Title</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                  </select>
                </div>

                <div className="selectContainer">
                  <label className="selectLabel">Group By</label>
                  <select
                    className="select"
                    value={groupField}
                    onChange={(e) => setGroupField(e.target.value)}
                  >
                    <option value="">None</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                  </select>
                </div>

                {role === "admin" && (
                  <button
                    className="addSongBtn"
                    onClick={() => setShowAddForm(true)}
                  >
                    <Plus size={16} /> Add Song
                  </button>
                )}
              </div>
            </div>
          </div>

          {Object.keys(groupedSongs).length === 0 ||
          filteredSongs.length === 0 ? (
            <div className="noSongs">
              <h3>No songs found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            Object.keys(groupedSongs).map((group, idx) => (
              <div key={idx} className="songGroup">
                {groupField && <div className="groupHeader">{group}</div>}
                {groupedSongs[group].map((song, index) => (
                  <div key={song.id} className="songItem">
                    <div className="songIndex">{index + 1}</div>
                    <div className="songInfo">
                      <h4>{song.title}</h4>
                      <p>
                        {song.artist} • {song.album} • {song.duration}
                      </p>
                    </div>
                    <div className="songActions">
                      {role === "admin" && (
                        <button
                          className="actionBtn removeBtn"
                          onClick={() => handleRemoveSong(song.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="addSongFormOverlay">
          <div className="addSongForm">
            <h3>Add New Song</h3>
            <input
              type="text"
              placeholder="Title"
              value={newSongData.title}
              onChange={(e) =>
                setNewSongData({ ...newSongData, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Artist"
              value={newSongData.artist}
              onChange={(e) =>
                setNewSongData({ ...newSongData, artist: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Album"
              value={newSongData.album}
              onChange={(e) =>
                setNewSongData({ ...newSongData, album: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Duration (e.g., 3:45)"
              value={newSongData.duration}
              onChange={(e) =>
                setNewSongData({ ...newSongData, duration: e.target.value })
              }
            />

            <div className="formButtons">
              <button
                onClick={() => {
                  const newSong = {
                    id: songs.length
                      ? Math.max(...songs.map((s) => s.id)) + 1
                      : 1,
                    ...newSongData,
                  };
                  setSongs((prev) => [...prev, newSong]);
                  setNewSongData({
                    title: "",
                    artist: "",
                    album: "",
                    duration: "",
                  });
                  setShowAddForm(false);
                }}
              >
                Add Song
              </button>
              <button onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
