/*
 * Filename: /Users/tonymedrano/Desktop/PROGRAMMING/LITELEMENT/red_light_green_light_game/src/screens/game/Game.js
 * Path: /Users/tonymedrano/Desktop/PROGRAMMING/LITELEMENT/red_light_green_light_game
 * Created Date: Monday, March 21st 2022, 5:38:26 pm
 * Author: Tony Medrano
 *
 * Copyright (c) 2022 Your Company
 */

import {LitElement, html, css} from 'lit-element';

const close = './assets/close.png';

/**
 * Ranking Screen.
 */
export class RankingScreen extends LitElement {
  static get styles() {
    return css`
      :host {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: #cccccc;
        color: #000000;
      }
      .ranking-table {
        border-collapse: collapse;
        width: 100%;
        color: #000000;
        background-color: #ddd;
      }

      .ranking-table td,
      .ranking-table th {
        border: 1px solid #ddd;
        padding: 8px;
      }

      .ranking-table tr:nth-child(even) {
        background-color: #f2f2f2;
      }

      .ranking-table tr:hover {
        background-color: #ddd;
      }

      .ranking-table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #93aee4;
        color: white;
      }

      .ranking-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem 0 2rem;
      }

      .ranking-header img {
        cursor: pointer;
        width: 2.5rem;
        height: 2.5rem;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * players list
       */
      ranking: {type: Array},
    };
  }

  constructor() {
    super();
    this.ranking = [];
  }

  render() {
    return html`
      <div class="ranking">
        <div class="ranking-header">
          <h1>Ranking screen</h1>
          <img class="close-btn" src=${close} alt="close"
          @click=${this._closeRanking}"/>
        </div>
        <table class="ranking-table">
          <tr>
            <th>Nº</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
          ${this._rankingList()}
        </table>
      </div>
    `;
  }

  _rankingList() {
    if (this.ranking.length > 0) {
      return this.ranking.map((player, index) => {
        return html`
          <tr>
            <td>${index}</td>
            <td>${player.user}</td>
            <td>${player.score}</td>
          </tr>
        `;
      });
    }
  }

  _closeRanking() {
    let close = new CustomEvent('close-ranking-event', {
      detail: {
        close: true,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(close);
  }
}

window.customElements.define('ranking-screen', RankingScreen);
