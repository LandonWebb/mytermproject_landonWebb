import React, { useEffect, useState } from 'react';
import { getAlbums } from '../api';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAlbums()
      .then(res => setAlbums(res.data))
      .catch(err => console.error('Failed to load albums:', err));
  }, []);

  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            {album.name} by {album.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumList;
