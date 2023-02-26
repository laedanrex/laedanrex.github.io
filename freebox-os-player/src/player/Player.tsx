import React, {Component} from 'react';
import './Player.css';

export default class Player extends Component<any, any> {

  render() {
    return (
      <div className="Player">
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
}
