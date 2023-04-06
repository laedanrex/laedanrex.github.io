import React from 'react';
import './VideoPlayer.css';

interface Props {
}

interface State {
}

export default function VideoPlayer(props: Props) {


  return (
    <div className="VideoPlayer">
      <video controls>
        <source src="demo.mp4" type="video/mp4"/>
        <p>
          Votre navigateur ne prend pas en charge les vidéos HTML5.
          Voici <a href="demo.mp4">un lien pour télécharger la vidéo</a>.
        </p>
      </video>
    </div>
  );
}
