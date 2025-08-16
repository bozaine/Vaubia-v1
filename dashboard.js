
import {generateDailySeries, securityScore, drawSeries} from './mocks.js';

function qs(sel){ return document.querySelector(sel); }

function render(){
  const series = generateDailySeries(30, 123);
  const score = securityScore(series);
  qs('#kpi-score').textContent = score + '/100';
  const attempts = series.at(-1).attempts;
  const blocked = series.at(-1).blocked;
  qs('#kpi-attempts').textContent = attempts;
  qs('#kpi-blocked').textContent = blocked;
  qs('#kpi-rate').textContent = Math.round(blocked/attempts*100) + '%';
  drawSeries(qs('#chart'), series);
}
document.addEventListener('DOMContentLoaded', render);
