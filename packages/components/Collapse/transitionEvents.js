const setHeightZero = (el) => {
  el.style.height = "0px";
};

const setHeightScroll = (el) => {
  el.style.height = `${el.scrollHeight}px`;
};

const setHeightEmpty = (el) => {
  el.style.height = "";
};

const setOverflowHidden = (el) => {
  el.style.overflow = "hidden";
};

const setOverflowEmpty = (el) => {
  el.style.overflow = "";
};

const transitionEvents = {
  beforeEnter(el) {
    setHeightZero(el);
    setOverflowHidden(el);
  },
  enter(el) {
    setHeightScroll(el);
  },
  afterEnter(el) {
    setHeightEmpty(el);
    setOverflowEmpty(el);
  },
  beforeLeave(el) {
    setHeightScroll(el);
    setOverflowHidden(el);
  },
  leave(el) {
    setHeightZero(el);
  },
  afterLeave(el) {
    setHeightEmpty(el);
    setOverflowEmpty(el);
  },
};

export default transitionEvents;
