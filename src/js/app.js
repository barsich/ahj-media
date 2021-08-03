import Timeline from './Timeline';
import TimelineMarkups from './TimelineMarkups';

const container = document.querySelector('.container');
const timeline = new Timeline(new TimelineMarkups(container));
timeline.init();
