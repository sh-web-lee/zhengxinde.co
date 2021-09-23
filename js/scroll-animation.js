const scrollElements = document.querySelectorAll(".scroll-animation");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  // console.log(elementTop)
  return (
    // elementTop <=
    // (window.innerHeight || document.documentElement.clientHeight) / dividend
    elementTop < window.innerHeight * 0.8
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    // elementTop > (window.innerHeight || document.documentElement.clientHeight)
    elementTop > window.innerHeight * 0.66
  );
};

const displayScrollElement = (element) => {
  element.classList.add("on");
};

const hideScrollElement = (element) => {
  element.classList.remove("on");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el);
    }
  });
};

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

window.onload = () => {
  handleScrollAnimation();
};
