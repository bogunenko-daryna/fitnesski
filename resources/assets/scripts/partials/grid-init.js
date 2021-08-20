import PerfectScrollbar from 'perfect-scrollbar';
import Isotope from 'isotope-layout';
require('isotope-packery');

export default function initGrid () {

    let grid = document.querySelector('[data-grid]');
    let gridContainer = document.querySelector('[data-grid-container]')

    // eslint-disable-next-line no-unused-vars
    const ps = new PerfectScrollbar(gridContainer);
    gridContainer.scrollLeft = 160;

    calcWidth(grid, document.querySelectorAll('[data-grid-item]'));

    // eslint-disable-next-line no-unused-vars
    var iso = new Isotope(grid, {
        layoutMode: 'packery',
        itemSelector: '[data-grid-item]',
        packery: {
            gutter: 16,
        },
    });
}

function calcWidth (grid, children) {
    var childrenArea = 0,
        gridWidth = 0;

    children.forEach((item) => {
        let x = item.offsetWidth + 16,
            y = item.offsetHeight + 16;
        childrenArea += (x * y);
    });
    //16 is a packery gutters

    gridWidth = childrenArea / grid.offsetHeight + 30;
    //30 is a container paddings

    grid.style.width = gridWidth + 'px';
}