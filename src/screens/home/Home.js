/*
 * Filename: /Users/tonymedrano/Desktop/PROGRAMMING/LITELEMENT/red_light_green_light_game/src/screens/home/Home.js
 * Path: /Users/tonymedrano/Desktop/PROGRAMMING/LITELEMENT/red_light_green_light_game
 * Created Date: Monday, March 21st 2022, 5:38:10 pm
 * Author: Tony Medrano
 * 
 * Copyright (c) 2022 Your Company
 */


import { LitElement, html, css } from '../../../node_modules/lit-element/lit-element';

const mouse = "./assets/mouse.png";

/**
 * Home Screen.
 */
export class HomeScreen extends LitElement {
    static get styles() {
        return css`
        .home {
            display: flex;
            flex-direction: column;
            text-align: center;
            padding: 0 2.5rem 0 2.5rem;
            margin-top: 8rem;
        }
        .inp {
            position: relative;
            margin: auto;
            width: 100%;
            border-radius: 3px;
            overflow: hidden; 
            margin-top: 2rem;
        }

        .inp .label {
            position: absolute;
            top: 20px;
            left: 12px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.5);
            font-weight: 500;
            transform-origin: 0 0;
            transform: translate3d(0, 0, 0);
            transition: all .2s ease;
            pointer-events: none; 
        }

        .inp .focus-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            transform: scaleX(0);
            transform-origin: left; 
        }

        .inp input {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            border: 0;
            font-family: inherit;
            padding: 16px 12px 0 12px;
            height: 56px;
            font-size: 16px;
            font-weight: 400;
            box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.3);
            color: #000;
            transition: all .15s ease; 
        }
    
        .inp input:hover {
            box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5); 
        }

        .inp input:not(:placeholder-shown) + .label {
            transform: translate3d(0, -12px, 0) scale(0.75); 
        }

        .inp input:focus {
            background: #cccccc;
            outline: none;
            box-shadow: inset 0 -2px 0 #0077FF; 
        }

        .inp input:focus + .label {
            color: #0077FF;
            transform: translate3d(0, -12px, 0) scale(0.75); 
        }

        .inp input:focus + .label + .focus-bg {
            transform: scaleX(1);
            transition: all .1s ease; 
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
            background: #7997D2;
            outline-color: #7997D2;
            width: 100%;
            margin-top: 3rem;
      }

      .mouse  {
          width: 6rem;
          margin: 0 auto;
      }
    `;
    }

    static get properties() {
        return {};
    }

    constructor() {
        super();
    }

    render() {
        return html`
        <div class="home">
            <img class="mouse" src=${mouse} alt="" />
            <h1>Create new player</h1>
            <label for="inp" class="inp">
                <input type="text" id="user" placeholder="&nbsp;">
                <span class="label">Name</span>
                <span class="focus-bg"></span>
            </label>
            <button class="join-btn" @click=${this._joinGame}>
            JOIN
            </button>
        </div>
      `;
    }

    _joinGame() {
        let user = this.shadowRoot.querySelector('#user').value;
        let login = new CustomEvent('start-game-event', {
            detail: {
                username: user,
                score: 0,
                login: true
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(login);
    }
}

window.customElements.define('home-screen', HomeScreen);
