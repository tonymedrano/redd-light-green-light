/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html, css } from 'lit-element';

import '../src/screens/home/Home';
import '../src/screens/game/Game';
import '../src/screens/ranking/Ranking';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class AppRoot extends LitElement {
  static get styles() {
    return css`
      .aapp{
        position: relative;
      }
      .join-btn {
            cursor: pointer;
            appearance: none;
            border: none;
            font-family: inherit;
            font-size: inherit;
            font-weight: 500;
            padding-block: 1.25ch;
            padding-inline: 2.5ch;
            color: #000000;
            background: #eeaf26;
            outline-color: #ecea48;
            width: 50%;
            margin: 5rem 25% 0px;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * username
       */
      name: { type: String },
      /**
       * check if game or not
       */
      isGame: { type: Boolean },
      /**
       * latest players list
       */
      ranking: { type: Array },
      /**
       * latest players list
       */
      scoresList: { type: Array },
      /**
       * show ranking sccoores
       */
      isRanking: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.isGame = false;
    this.ranking = [];
    this.scoresList = [];
    this.isRanking = false;
    this.addEventListener('user-logout-event', this._logoutHandler);
    this.addEventListener('start-game-event', this._startGameHandler);
    this.addEventListener('close-ranking-event', this._showRankingHandler);
  }

  render() {
    return html`
       <div class="app">
        ${this.isGame
        ? html`
        <game-screen username="${this.name}"></game-screen>`
        : html`
          <home-screen></home-screen>
          <button class="join-btn" @click=${this._showRankingHandler}>Ranking</button>
        `} 
        ${this.isRanking
        ? html`<ranking-screen .ranking="${this.scoresList}"></ranking-screen>`
        : null}
       </div>
      `;
  }

  _logoutHandler(evt) {
    const { username, score, logout } = evt.detail;
    if (logout) {
      this.ranking.push({
        user: username,
        score: score
      });
      const rankingStorage = window.localStorage;
      rankingStorage.setItem('ranking', JSON.stringify(this.ranking));
      this.isGame = !logout;
    }
  }

  _startGameHandler(evt) {
    const { username, login } = evt.detail;
    if (login) {
      this.name = username;
      this.isGame = login;
    }
  }

  _showRankingHandler() {
    this.scoresList = JSON.parse(localStorage.getItem('ranking'));
    this.isRanking = !this.isRanking;
  }
}

window.customElements.define('app-root', AppRoot);