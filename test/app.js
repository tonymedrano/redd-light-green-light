import { AppRoot } from '../src/app.js';
import { fixture, html } from '@open-wc/testing';

const assert = chai.assert;

suite('app-root', () => {
  test('is defined', () => {
    const el = document.createElement('app-root');
    assert.instanceOf(el, AppRoot);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<app-root></app-root>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<app-root name="Test"></app-root>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('handles a click', async () => {
    const el = await fixture(html`<app-root></app-root>`);
    const button = el.shadowRoot.querySelector('button');
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });
});
