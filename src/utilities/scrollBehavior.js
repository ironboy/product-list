// let us control where to scroll to on back/forward
// (instead of leaving i to the browser)
history.scrollRestoration = 'manual';

// decide if scroll should be instant or animated 
// auto = instant, smooth = animated
document.querySelector(':root').style.scrollBehavior = 'auto';

// register the current url as one to remember
// the y scroll position for (all others scroll to top)
export function scrollRestore() {
  restoreOnUrls.push(location.href);
}

// now make it work...

const restoreOnUrls = [], scrollMemory = {};
let lastLocation, lastY;

function beforeClick() {
  lastLocation = location.href;
  lastY = window.pageYOffset;
}

function onClick(popState) {
  if (!popState && location.href === lastLocation) {
    return;
  }
  if (!popState) {
    scrollMemory[lastLocation] = lastY;
  }
  setTimeout(() => {
    window.scrollTo(0,
      restoreOnUrls.includes(location.href) ?
        scrollMemory[location.href] : 0
    );
  }, 0);
}

document.addEventListener('mousedown', beforeClick);
document.addEventListener('touchstart', beforeClick)
document.addEventListener('click', () => onClick(false));
window.addEventListener('popstate', () => onClick(true));