import {AppRoot} from '../src/app.js';
import {fixture, html, expect} from '@open-wc/testing';

const assert = chai.assert;
const userName = 'testUser';
const score = [
  {
    user: 'no player',
    score: 0,
  },
];

suite('app-root', () => {
  test('App is defined', () => {
    const el = document.createElement('app-root');
    assert.instanceOf(el, AppRoot);
  });

  test('App renders with default values', async () => {
    const el = await fixture(html`<app-root></app-root>`);
    el.isGame = false;
    assert.shadowDom.equal(
      el,
      `<div class="app">
        <home-screen></home-screen>
        <button class="ranking-btn">Ranking</button>
      </div>
      `
    );
  });

  test('App starts with a user name', async () => {
    const el = await fixture(html`<app-root></app-root>`);
    el.isGame = true;
    el.username = userName;
    assert.equal(el.username, 'testUser');
  });

  test('App check if logout game ends', async () => {
    const el = await fixture(html`<app-root></app-root>`);
    el.logout = true;
    el._logoutHandler({
      detail: {
        logout: true,
      },
    });
    assert.equal(el.isGame, false);
  });

  test('App check if login game starts', async () => {
    const el = await fixture(html`<app-root></app-root>`);
    el._startGameHandler({
      detail: {
        login: true,
      },
    });
    assert.equal(el.isGame, true);
  });

  test('App handles a click to start a game with default', async () => {
    const el = await fixture(html`<app-root></app-root>`);
    const button = el.shadowRoot.querySelector('.ranking-btn');
    button.click();
    await el.updateComplete;
    expect(el.scoresList).to.eql(score);
  });
});
