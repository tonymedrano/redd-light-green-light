/*
 * Filename: /Users/tonymedrano/Desktop/PROGRAMMING/LITELEMENT/red_light_green_light_game/src/app.js
 * Path: /Users/tonymedrano/Desktop/PROGRAMMING/LITELEMENT/red_light_green_light_game
 * Created Date: Monday, March 21st 2022, 5:32:19 pm
 * Author: Tony Medrano
 *
 * Copyright (c) 2022 Your Company
 */

import {LitElement, html, css} from 'lit-element';

import './screens/home/Home';
import './screens/game/Game';
import './screens/ranking/Ranking';

/**
 * AppRoot element.
 *
 * @username - holds username after is set
 * @isGame  - check if game or not
 * @ranking  - holds the total score
 * @scoresList  - holds score list
 * @isRanking  - helps to show/hide ranking screen
 * @_logoutHandler - internal logout function help by a custom event
 * @_startGameHandler - internal start a game function including username
 * @_showRankingHandler - internal function that show the score list from localstorage in a modal
 */
export class AppRoot extends LitElement {
  static get styles() {
    return css`
      .app {
        position: relative;
      }
      .ranking-btn {
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
      name: {type: String},
      /**
       * check if game or not
       */
      isGame: {type: Boolean},
      /**
       * latest players list
       */
      ranking: {type: Array},
      /**
       * latest players list
       */
      scoresList: {type: Array},
      /**
       * show ranking sccores
       */
      isRanking: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.user = '';
    this.isGame = false;
    this.ranking = [];
    this.scoresList = [
      {
        user: 'no player',
        score: 0,
      },
    ];
    this.isRanking = false;
    this.addEventListener('user-logout-event', this._logoutHandler);
    this.addEventListener('start-game-event', this._startGameHandler);
    this.addEventListener('close-ranking-event', this._showRankingHandler);
  }

  render() {
    return html`
      <div class="app">
        ${this.isGame
          ? html` <game-screen username="${this.username}"></game-screen>`
          : html`
              <home-screen></home-screen>
              <button class="ranking-btn" @click=${this._showRankingHandler}>
                Ranking
              </button>
            `}
        ${this.isRanking
          ? html`<ranking-screen
              .ranking="${this.scoresList}"
            ></ranking-screen>`
          : null}
      </div>
    `;
  }

  _logoutHandler(evt) {
    const {username, score, logout} = evt.detail;
    if (logout) {
      this.ranking.push({
        user: username,
        score: score,
      });
      const rankingStorage = window.localStorage;
      rankingStorage.setItem('ranking', JSON.stringify(this.ranking));
      this.isGame = !logout;
    }
  }

  _startGameHandler(evt) {
    const {username, login} = evt.detail;
    if (login) {
      this.username = username;
      this.isGame = login;
    }
  }

  _showRankingHandler() {
    //, Get score list from storage
    const storage = JSON.parse(localStorage.getItem('ranking'));
    if (storage != null && storage[0].score > 0) {
      this.scoresList = storage;
    }
    this.isRanking = !this.isRanking;
  }
}

window.customElements.define('app-root', AppRoot);
