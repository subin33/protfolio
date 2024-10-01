// Define DOM elements
const toggleButton = document.querySelector("#toggle-button");
const root = document.querySelector(":root");
const gnbLinks = document.querySelectorAll(".gnb a"); // gnb 내의 모든 링크 선택
const storageKey = "color-mode";
const defaultMode = "light-mode";

const triggerCheckbox = document.querySelector("#trigger");
const labelSpans = document.querySelectorAll("label[for='trigger'] span");

console.clear();

const $cursor = $(".cursor");
const $cursorSahdow = $(".cursor-shadow");

$(window).mousemove(function (e) {
  $cursor.css({
    top: e.clientY,
    left: e.clientX,
  });

  $cursorSahdow.css({
    top: e.clientY,
    left: e.clientX,
  });
});

triggerCheckbox.addEventListener("change", () => {
  if (root.classList.contains("dark-mode")) {
    // dark-mode일 때는 무조건 흰색으로 설정
    labelSpans.forEach((span) => {
      span.style.backgroundColor = "#fff";
    });
  } else {
    // light-mode일 때는 체크 여부에 따라 색상 변경
    if (triggerCheckbox.checked) {
      labelSpans.forEach((span) => {
        span.style.backgroundColor = "#fff"; // 체크되었을 때 흰색으로 변경
      });
    } else {
      labelSpans.forEach((span) => {
        span.style.backgroundColor = "#000"; // 체크 해제되었을 때 검은색으로 변경
      });
    }
  }
});

// Load the user's preferred color mode from local storage.
function loadColorMode() {
  const colorMode = localStorage.getItem(storageKey);
  console.log("colorMode", colorMode);
  root.classList.add(colorMode || defaultMode);
  updateToggleButton();
}

loadColorMode();

// Toggle the color mode when the toggle button is clicked
toggleButton.addEventListener("click", () => {
  saveColorMode();
});

// Toggle the color mode to light-mode when any gnb link except Home is clicked
gnbLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // 'Home' 링크를 제외하고 'light-mode'로 전환
    setLightMode();
  });
});

// Save the user's preferred color mode to local storage.
function saveColorMode() {
  const currentMode = root.classList.contains("dark-mode")
    ? "light-mode"
    : "dark-mode";
  root.classList.remove("light-mode", "dark-mode");
  root.classList.add(currentMode);
  localStorage.setItem(storageKey, currentMode);
  updateToggleButton();
}

// Update the toggle button appearance based on the color mode
function updateToggleButton() {
  if (root.classList.contains("dark-mode")) {
    toggleButton.style.backgroundImage = "var(--moon)";

    // toggle container의 색상 변경
    document.querySelector(".toggle span:nth-child(1)").style.backgroundColor =
      "#fff";
    document.querySelector(".toggle span:nth-child(2)").style.backgroundColor =
      "#fff";
    document.querySelector(".toggle span:nth-child(3)").style.backgroundColor =
      "#fff";
  } else {
    toggleButton.style.backgroundImage = "var(--sun)";

    // toggle container의 색상 변경
    document.querySelector(".toggle span:nth-child(1)").style.backgroundColor =
      "#000";
    document.querySelector(".toggle span:nth-child(2)").style.backgroundColor =
      "#000";
    document.querySelector(".toggle span:nth-child(3)").style.backgroundColor =
      "#000";
  }
}

// Set the color mode to light-mode
function setLightMode() {
  root.classList.remove("dark-mode");
  root.classList.add("light-mode");
  localStorage.setItem(storageKey, "light-mode");
  updateToggleButton();
}

// jQuery ready function을 함수로 변환
function initializeMenuToggle() {
  $("#trigger").change(function () {
    $(".toggle, .overlay, .gnb").toggleClass("active");
  });

  $(".gnb a").click(function () {
    $(".toggle, .overlay, .gnb").removeClass("active");
    $("#trigger").prop("checked", false); // 메뉴 클릭 후 체크박스 상태 초기화

    // 클릭한 후 trigger의 배경색을 다시 검정색으로 초기화
    labelSpans.forEach((span) => {
      span.style.backgroundColor = "#000";
    });
  });
}

initializeMenuToggle();

const typeit = new TypeIt("#typeit", {
  speed: 50,
  startDelay: 700,
  waitUntilVisible: true,
});

typeit
  .type('<span class="font-50">Hello I\'m</span>')
  .pause(300)
  .break()
  .type('<span class="font-60">Garfield</span>', { delay: 300 })
  .pause(300)
  .delete(8)
  .type('<span class="font-60">Noh Su Bin</span>')
  .pause(300)
  .break()
  .type('<span class="font-50">Frontend Developer</span>')
  .go();

// 모든 섹션을 선택
// const sections = document.querySelectorAll("section");

// window.addEventListener("scroll", function () {
//   sections.forEach((section, index) => {
//     // 첫 번째 섹션을 제외
//     if (index === 0) return;

//     const sectionTop = section.getBoundingClientRect().top;
//     const windowHeight = window.innerHeight;

//     // 섹션의 상단이 윈도우 화면에 들어왔을 때 visible 클래스 추가
//     if (sectionTop < windowHeight * 0.75) {
//       section.classList.add("visible");
//     } else {
//       section.classList.remove("visible");
//     }
//   });
// });
