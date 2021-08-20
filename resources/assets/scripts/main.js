// Polyfills if needed
// require('intersection-observer');

// import external dependencies
import './util/polyfills'
import 'jquery'
import 'bootstrap'

// Import everything from autoload
import './autoload/**/*'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import Detection from './util/Detection';
import index from './routes/index';
import about from './routes/about';
import contact from './routes/contact';
import onlinePrograms from './routes/online-programs';
import centers from './routes/centers';

window._detector = new Detection({
 detect: ['ie11'],
});
window._detector.init();

// /** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  'homePage': index,
  'aboutPage': about,
  'contact-page': contact,
  'online-programs-page': onlinePrograms,
  'centers': centers,
});



// // Load Events
jQuery(document).ready(() => routes.loadEvents());
