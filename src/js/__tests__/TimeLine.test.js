import Timeline from '../Timeline';
import TimelineMarkups from '../TimelineMarkups';

beforeAll(() => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector('.container');
  const timeline = new Timeline(new TimelineMarkups(container));
  timeline.init();
});

test.each([
  { value: '51.50851, -0.12572', expected: { latitude: '51.50851', longitude: '-0.12572' } },
  { value: '51.50851,-0.12572', expected: { latitude: '51.50851', longitude: '-0.12572' } },
  { value: '[51.50851, -0.12572]', expected: { latitude: '51.50851', longitude: '-0.12572' } },
])('manual coords', ({ value, expected }) => {
  expect(Timeline.getManualPosition(value)).toEqual(expected);
});
