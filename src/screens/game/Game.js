/*
 * Filename: /Users/tonymedrano/Desktop/PROGRAMMING/LITELEMENT/red_light_green_light_game/src/screens/game/Game.js
 * Path: /Users/tonymedrano/Desktop/PROGRAMMING/LITELEMENT/red_light_green_light_game
 * Created Date: Monday, March 21st 2022, 5:38:26 pm
 * Author: Tony Medrano
 * 
 * Copyright (c) 2022 Your Company
 */

import { LitElement, html, css } from '../../../node_modules/lit-element/lit-element.js';

const trafficLight = "./assets/traffic-light.png";
const steps = "./assets/steps.png";
const logout = "./assets/logout.png";

/**
 * Game Screen.
 */
export class GameScreen extends LitElement {
  static get styles() {
    return css`
      .game {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4.2rem;
      }

      .traffic-light {
        margin-top: 2rem;
      }

      .traffic-light img{
        width: 100px;
        height: 100px;
      }

      .controllers {
        width: 100%;
        display: flex;
        margin-top:4rem;
      }

      .controllers button {
        cursor: pointer;
        appearance: none;
        border: none;
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        padding-block: 1.25ch;
        padding-inline: 2.5ch;
        color: #000000;
        background: #7997D2;
        outline-color: #7997D2;
        width: 100%;
        display: flex;
      }

      .controllers button img {
        width: 1rem;
        padding-right: 0.8rem;
      }

      .controllers button:active {
          background: #93aee4;
      }

      .controllers-left-btn {
        border-end-start-radius: 6px;
        border-start-start-radius: 6px;
        margin-right: 1px;
      }

      .controllers-right-btn {
        border-start-end-radius: 6px;
        border-end-end-radius: 6px;
      }

      .header {
        overflow: hidden;
        background-color: #272627;
        display: flex;
        justify-content: space-between;
      }

      .header .username {
        padding: 12px;
        line-height: 1.5rem;
        font-size: 1.5rem;
        font-weight: bold;
        color: #ffffff;
      }

      .header-right {
        cursor: pointer;
      }

      .header-right img {
        width:  1.5rem;
        margin: 0.8rem 0.8rem 0 0.8rem;
      }

    `;
  }

  static get properties() {
    return {
      /**
       * traffic color
       */
      trafficLightColor: { type: String },
      /**
       * colors
       */
      colors: { type: Object },
      /**
       * ttotal points
       */
      score: { type: Number },
      /**
       * ttotal points
       */
      lapse: { type: Number },
      /**
       * interval controller time
       */
      timer: { type: Object },
      /**
       * color has changed.
       */
      isTrafficChanged: { type: Boolean },
      isLeftBtn: { type: Boolean },
      isRightBtn: { type: Boolean },
      trafficColor: { type: Object },
      isGame: { type: Boolean },
      /**
       * username
       */
      username: { type: String },
    };
  }

  constructor() {
    super();
    this.colors = {
      active: "#6BBE7E", //. green
      inactive: "#E67475" //. red
    };
    this.trafficLightColor = this.colors.inactive; //. inactive default
    this.score = 0;
    this.isTrafficChanged = false;
    this.isLeftBtn = true;
    this.isRightBtn = true;
    this.timer = {};
    this.lapse = 3000; //. 3 seconds break default
    this._trafficLightTimeHandler();
    this.isGame = true;
    this.username = "Toony"
  }

  render() {
    return html`
       ${this._header()}
        <div class="game">
          <h1>High Score: ${this.score}</h1>
          <div class="traffic-light" style="background-color: ${this.trafficLightColor}">
            <img src=${trafficLight} alt="Traffic Light"/>
          </div>
          <h1>${this.isGame ? "Score: " + this.score : "Game Over!"}</h1>
          <div class="controllers">
            <button class="controllers-left-btn" @click=${this._increaseScoreLeft}>
            <img src=${steps} alt="Traffic Light"/>
            LEFT
            </button>
            <button class="controllers-right-btn" @click=${this._increaseScoreRight}>
            <img src=${steps} alt="Traffic Light"/>
            RIGHT
            </button>
          </div>
        </div>
      `;
  }

  _header() {
    return html`
        <div class="header">
          <div class="username">Hi, ${this.username}!</div>
          <div class="header-right">
            <img src=${logout} alt="logout" @click=${this._logout}/>
          </div>
        </div>
    `;
  }

  _increaseScoreLeft() {
    this.isLeftBtn
      ? this._increaseScore()
      : this._decreaseScore();
    this.isLeftBtn = false;
    this.isRightBtn = true;
  }

  _increaseScoreRight() {
    this.isRightBtn
      ? this._increaseScore()
      : this._decreaseScore();
    this.isRightBtn = false;
    this.isLeftBtn = true;
  }

  _increaseScore() {
    if (this.isGame) this.score++;
    this._checkTrafficStatus();
  }

  _decreaseScore() {
    if (this.isGame) this.score--;
    this._checkTrafficStatus();
  }

  _checkTrafficStatus() {
    if (this.isTrafficChanged) {
      this.isGame = false;
      window.clearTimeout(this.timer);
    }
  }

  _trafficLightTimeHandler() {
    this.trafficLightColor = this.colors.active;
    let greenLight = Math.max(10000 - this.score * 100, 2000) + Math.random(-1500, 1500);
    this.timer = setTimeout(() => {
      this.trafficLightColor = this.colors.inactive;
      this.isTrafficChanged = true;
      this._restartTraffic();
    }, greenLight);

  }

  _restartTraffic() {
    if (this.isGame) {
      this.timer = setTimeout(() => {
        this.isTrafficChanged = false;
        this._trafficLightTimeHandler();
      }, this.lapse);
    }
  }

  _logout() {
    let logout = new CustomEvent('user-logout-event', {
      detail: {
        username: this.username,
        score: this.score,
        logout: true
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(logout);
  }
}

window.customElements.define('game-screen', GameScreen);