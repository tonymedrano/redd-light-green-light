import {GameScreen} from '../src/screens/game/Game.js';
import {fixture, html, oneEvent, expect} from '@open-wc/testing';

const assert = chai.assert;
const userName = 'testUser';

suite('game-screen', () => {
  test('Game is defined', () => {
    const el = document.createElement('game-screen');
    assert.instanceOf(el, GameScreen);
  });

  test('Game header handles a user name', async () => {
    const el = await fixture(html`<game-screen></game-screen>`);
    el.username = userName;
    await el.updateComplete;
    assert.equal(el.username, userName);
  });

  test('Game check traffic color', async () => {
    const el = await fixture(html`<game-screen></game-screen>`);
    await el.updateComplete;
    assert.equal(el.trafficLightColor, '#6BBE7E');
  });

  test('Game increase left to be true', async () => {
    const el = await fixture(html`<game-screen></game-screen>`);
    const button = () =>
      el.shadowRoot.querySelector('.controllers-left-btn').click();
    setTimeout(button);
    assert.equal(el.isLeftBtn, true);
  });

  test('Game increase right to be true', async () => {
    const el = await fixture(html`<game-screen></game-screen>`);
    const button = () =>
      el.shadowRoot.querySelector('.controllers-right-btn').click();
    setTimeout(button);
    assert.equal(el.isRightBtn, true);
  });

  test('Game increase the score', async () => {
    const el = await fixture(html`<game-screen></game-screen>`);
    el.score++;
    await el.updateComplete;
    assert.equal(el.score, 1);
  });

  test('Game decrease the score', async () => {
    const el = await fixture(html`<game-screen></game-screen>`);
    el.score--;
    await el.updateComplete;
    assert.equal(el.score, -1);
  });

  test('Game check traffic status', async () => {
    const el = await fixture(html`<game-screen></game-screen>`);
    el.isTrafficChanged = true;
    el._checkTrafficStatus();
    await el.updateComplete;
    assert.equal(el.isGame, false);
  });

  test('Game lapse default time', async () => {
    const el = await fixture(html`<game-screen></game-screen>`);
    assert.equal(el.lapse, 3000);
  });

  test('Game logout event to be true', async () => {
    const el = await fixture(html`<game-screen></game-screen>`);
    const button = () => el.shadowRoot.querySelector('.logout-btn').click();
    setTimeout(button);
    const {detail} = await oneEvent(el, 'user-logout-event');
    expect(detail.logout).to.equal(true);
  });
});
