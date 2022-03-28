import {HomeScreen} from '../src/screens/home/Home.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;
const userName = 'testUser';

suite('home-screen', () => {
  test('Home is defined', () => {
    const el = document.createElement('home-screen');
    assert.instanceOf(el, HomeScreen);
  });

  test('Home handles a user name', async () => {
    const el = await fixture(html`<home-screen></home-screen>`);
    el.shadowRoot.querySelector('#user').value = userName;
    const button = el.shadowRoot.querySelector('.join-btn');
    button.click();
    await el.updateComplete;
    assert.equal(el.user, userName);
  });
});
