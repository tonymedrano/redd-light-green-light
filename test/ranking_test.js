import {RankingScreen} from '../src/screens/ranking/Ranking.js';
import {fixture, html, expect, oneEvent} from '@open-wc/testing';

const assert = chai.assert;
const score = [
  {
    user: 'no player',
    score: 0,
  },
];

suite('ranking-screen', () => {
  test('Ranking is defined', () => {
    const el = document.createElement('ranking-screen');
    assert.instanceOf(el, RankingScreen);
  });

  test('Ranking if the score list an array', async () => {
    const el = await fixture(html`<ranking-screen></ranking-screen>`);
    await el.updateComplete;
    expect(el.ranking).to.eql([]);
  });

  test('Ranking if the score list has received correct properties', async () => {
    const el = await fixture(html`<ranking-screen></ranking-screen>`);
    el.ranking = score;
    await el.updateComplete;
    expect(el.ranking[0].name).to.eql(score[0].name);
    expect(el.ranking[0].score).to.eql(score[0].score);
  });

  test('Ranking closing modal event close to be true', async () => {
    const el = await fixture(html`<ranking-screen></ranking-screen>`);
    const button = () => el.shadowRoot.querySelector('.close-btn').click();
    setTimeout(button);
    const {detail} = await oneEvent(el, 'close-ranking-event');
    expect(detail.close).to.equal(true);
  });
});
