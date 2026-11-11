(function () {
  function escapeAttr(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  window.videoUrl = function (name) {
    var pinned = window.VIDEOS && window.VIDEOS[name];
    if (pinned) return pinned;
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(name + " exercise form");
  };

  window.videoLink = function (name) {
    return (
      '<a class="ex-video" href="' + escapeAttr(window.videoUrl(name)) + '" target="_blank" rel="noopener"' +
      ' onclick="event.stopPropagation()" aria-label="Watch ' + escapeAttr(name) + ' on YouTube" title="Watch on YouTube">▶</a>'
    );
  };

  window.cueFor = function (name, own) {
    if (own) return own;
    return (window.CUES && window.CUES[name]) || "";
  };

  var TIMER_KEY = "kinetic-timer";
  var timer = { running: false, startedAt: 0, banked: 0 };
  var tickHandle = null;

  function loadTimer() {
    try {
      var t = JSON.parse(localStorage.getItem(TIMER_KEY) || "null");
      if (t && typeof t.banked === "number") timer = t;
    } catch (e) {}
  }

  function saveTimer() {
    try {
      localStorage.setItem(TIMER_KEY, JSON.stringify(timer));
    } catch (e) {}
  }

  function elapsed() {
    return timer.banked + (timer.running ? Date.now() - timer.startedAt : 0);
  }

  function format(ms) {
    var total = Math.floor(ms / 1000);
    var m = Math.floor(total / 60);
    var s = total % 60;
    return m + ":" + String(s).padStart(2, "0");
  }

  function paint() {
    var time = document.getElementById("timer-time");
    var toggle = document.getElementById("timer-toggle");
    if (!time || !toggle) return;
    time.textContent = format(elapsed());
    toggle.textContent = timer.running ? "Pause" : elapsed() > 0 ? "Resume" : "Start";
    toggle.setAttribute("aria-pressed", timer.running ? "true" : "false");
  }

  function run() {
    clearInterval(tickHandle);
    tickHandle = timer.running ? setInterval(paint, 250) : null;
    paint();
  }

  function toggleTimer() {
    if (timer.running) {
      timer.banked = elapsed();
      timer.running = false;
    } else {
      timer.startedAt = Date.now();
      timer.running = true;
    }
    saveTimer();
    run();
  }

  function resetTimer() {
    timer = { running: false, startedAt: 0, banked: 0 };
    saveTimer();
    run();
  }

  function mountTimer() {
    var bar = document.createElement("div");
    bar.className = "timer-bar";
    bar.setAttribute("role", "timer");
    bar.innerHTML =
      '<span class="timer-time" id="timer-time">0:00</span>' +
      '<button type="button" class="timer-btn timer-main" id="timer-toggle">Start</button>' +
      '<button type="button" class="timer-btn" id="timer-reset">Reset</button>';
    document.body.appendChild(bar);
    document.body.classList.add("has-timer");
    document.getElementById("timer-toggle").addEventListener("click", toggleTimer);
    document.getElementById("timer-reset").addEventListener("click", resetTimer);
    loadTimer();
    run();
  }

  window.addEventListener("storage", function (e) {
    if (e.key !== TIMER_KEY) return;
    loadTimer();
    run();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountTimer);
  } else {
    mountTimer();
  }
})();
