const CONFIG = {
  title: "Kinetic",
  bodyPart: "knee",
};

const SLOTS = {
  mon: {
    label: "Chest · Triceps",
    title: "Monday",
    tabLabel: "Mon",
    sections: [
      {
        name: "Warm-up",
        exercises: [
          { name: "Walking Lunges", spec: "3×10 / leg · 2×25 lb KB" },
          { name: "Bulgarian Split Squat", spec: "3×10 / leg · 2×25 lb KB" },
          { name: "Hanging Toes to Bar", spec: "3 sets" },
        ],
      },
      {
        name: "Chest",
        exercises: [
          { name: "Dips", spec: "5×20 · bodyweight" },
          { name: "Incline Bench Press", spec: "3 sets · 135 lb, then 2 sets · 185 lb" },
          { name: "Chest Fly", spec: "5×12 · 130 lb" },
          { name: "Chest Press (machine)", spec: "10×10 · 130 lb" },
        ],
      },
      {
        name: "Triceps",
        exercises: [
          { name: "Overhead Triceps Extension", spec: "5×10 · 30 lb" },
          { name: "Triceps Extension (machine)", spec: "3 sets · 100 lb" },
        ],
      },
      {
        name: "Arms",
        exercises: [
          { name: "Reverse Curls", spec: "3 sets · 40 lb" },
          { name: "Hammer Curl", spec: "3 sets · 25 lb" },
        ],
      },
    ],
    avoid: [],
  },
  tue: {
    label: "Back · Biceps",
    title: "Tuesday",
    tabLabel: "Tue",
    sections: [
      {
        name: "Warm-up",
        exercises: [
          { name: "Walking Lunges", spec: "3×10 / leg · 2×25 lb KB" },
          { name: "Bulgarian Split Squat", spec: "3×10 / leg · 2×25 lb KB" },
          { name: "Hanging Toes to Bar", spec: "3 sets" },
        ],
      },
      {
        name: "Back",
        exercises: [
          { name: "Seated Cable Row", spec: "3 sets · 130–190 lb" },
          { name: "Chest-Supported Row", spec: "3 sets · 90–145 lb" },
          { name: "Cable Crossover", spec: "3 sets · varied weight" },
          { name: "Reverse Fly (machine)", spec: "3 sets · 110–130 lb" },
          { name: "Face Pulls", spec: "3×15–20" },
          { name: "Shoulder Shrugs", spec: "3×8–12 · heavy" },
          { name: "Lateral Raises", spec: "3×8–12" },
        ],
      },
      {
        name: "Biceps",
        exercises: [
          { name: "Machine Bicep Curl", spec: "3 sets · 100 lb" },
        ],
      },
      {
        name: "Arms",
        exercises: [
          { name: "Reverse Curls", spec: "3 sets · 40 lb" },
          { name: "Hammer Curl", spec: "3 sets · 25 lb" },
        ],
      },
    ],
    avoid: [],
  },
  thu: {
    label: "Legs",
    title: "Thursday",
    tabLabel: "Thu",
    sections: [
      {
        name: "Warm-up",
        exercises: [
          { name: "Walking Lunges", spec: "3×10 / leg · 2×25 lb KB" },
          { name: "Bulgarian Split Squat", spec: "3×10 / leg · 2×25 lb KB" },
          { name: "Hanging Toes to Bar", spec: "3 sets" },
        ],
      },
      {
        name: "Legs",
        exercises: [
          { name: "Belt Squat", spec: "5 sets · 90–140 lb" },
          { name: "Leg Press", spec: "4 sets · 180–270 lb" },
          { name: "Leg Extension", spec: "5 sets · 110–160 lb" },
          { name: "Standing Calf Raise", spec: "5 sets · 150–190 lb" },
          { name: "Leg Press Calf Press", spec: "3 sets · 150 lb" },
          { name: "Seated Hip Adductor", spec: "3 sets · 130–150 lb" },
          { name: "Seated Hip Abductor", spec: "3 sets · 130–150 lb" },
        ],
      },
      {
        name: "Arms",
        exercises: [
          { name: "Reverse Curls", spec: "3 sets · 40 lb" },
          { name: "Hammer Curl", spec: "3 sets · 25 lb" },
        ],
      },
    ],
    avoid: [],
  },
  fri: {
    label: "Calves · Chest · Back",
    title: "Friday",
    tabLabel: "Fri",
    sections: [
      {
        name: "Warm-up",
        exercises: [
          { name: "Walking Lunges", spec: "3×10 / leg · 2×25 lb KB" },
          { name: "Bulgarian Split Squat", spec: "3×10 / leg · 2×25 lb KB" },
          { name: "Hanging Toes to Bar", spec: "3 sets" },
        ],
      },
      {
        name: "Calves",
        exercises: [
          { name: "Standing Calf Raise", spec: "5 sets · 150–190 lb" },
          { name: "Leg Press Calf Press", spec: "3 sets · 150 lb" },
        ],
      },
      {
        name: "Chest and back",
        exercises: [
          { name: "Dips", spec: "3 sets · bodyweight" },
          { name: "Incline Bench Press", spec: "3 sets · 135 lb" },
          { name: "Chest-Supported Row", spec: "3 sets · 90 lb" },
          { name: "Seated Cable Row", spec: "3 sets · 130–190 lb" },
        ],
      },
      {
        name: "Arms",
        exercises: [
          { name: "Reverse Curls", spec: "3 sets · 40 lb" },
          { name: "Hammer Curl", spec: "3 sets · 25 lb" },
        ],
      },
    ],
    avoid: [],
  },
};

// ─── Storage ───────────────────────────────────────────────────────────────────

const TODAY = new Date().toISOString().slice(0, 10);
const STORAGE_KEY = `${CONFIG.bodyPart}-done-${TODAY}`;
let currentSlot = null;
let doneState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

function saveDoneState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(doneState));
}

function loadCustom(slug) {
  return JSON.parse(
    localStorage.getItem(`${CONFIG.bodyPart}-custom-${slug}`) || "[]",
  );
}
function saveCustom(slug, arr) {
  localStorage.setItem(
    `${CONFIG.bodyPart}-custom-${slug}`,
    JSON.stringify(arr),
  );
}

function loadRemoved(slug) {
  return new Set(
    JSON.parse(
      localStorage.getItem(`${CONFIG.bodyPart}-removed-${slug}`) || "[]",
    ),
  );
}
function saveRemoved(slug, set) {
  localStorage.setItem(
    `${CONFIG.bodyPart}-removed-${slug}`,
    JSON.stringify([...set]),
  );
}

function loadOrder(slug) {
  return JSON.parse(
    localStorage.getItem(`${CONFIG.bodyPart}-order-${slug}`) || "null",
  );
}
function saveOrder(slug, arr) {
  localStorage.setItem(`${CONFIG.bodyPart}-order-${slug}`, JSON.stringify(arr));
}

// ─── Exercise lookup helpers ───────────────────────────────────────────────────

function flatBuiltin(slug) {
  const s = SLOTS[slug];
  if (s.exercises) return s.exercises;
  return s.sections.flatMap((sec) => sec.exercises);
}

// Keys for all currently visible (non-removed) exercises in default order
function getCurrentKeys(slug) {
  const removed = loadRemoved(slug);
  const custom = loadCustom(slug);
  const keys = [];
  flatBuiltin(slug).forEach((_, i) => {
    if (!removed.has(i)) keys.push(`${slug}-${i}`);
  });
  custom.forEach((_, i) => keys.push(`${slug}-c${i}`));
  return keys;
}

function isRehabExercise(slug, flatIdx) {
  const s = SLOTS[slug];
  if (!s.sections) return false;
  let idx = 0;
  for (const sec of s.sections) {
    for (let i = 0; i < sec.exercises.length; i++) {
      if (idx === flatIdx) return !!sec.isRehab;
      idx++;
    }
  }
  return false;
}

function getExByKey(slug, key) {
  if (key.includes("-c")) {
    const i = parseInt(key.split("-c")[1]);
    return {
      ex: loadCustom(slug)[i],
      isCustom: true,
      isRehab: false,
      builtinIdx: undefined,
    };
  }
  const i = parseInt(key.replace(`${slug}-`, ""));
  return {
    ex: flatBuiltin(slug)[i],
    isCustom: false,
    isRehab: isRehabExercise(slug, i),
    builtinIdx: i,
  };
}

// ─── Auto-slot ─────────────────────────────────────────────────────────────────

// ─── Render ────────────────────────────────────────────────────────────────────

function renderTabs() {
  document.getElementById("tab-container").innerHTML = Object.entries(SLOTS)
    .map(
      ([slug, s]) =>
        `<button type="button" class="tab" data-slot="${slug}" onclick="setSlot('${slug}')">${s.tabLabel}</button>`,
    )
    .join("");
}

function exBlock(slug, key, displayNum, ex, isCustom, isRehab, builtinIdx) {
  const isDone = !!doneState[key];
  const deleteBtn = isCustom
    ? `<button class="ex-delete-btn" onclick="event.stopPropagation();deleteCustom('${slug}',${parseInt(key.split("-c")[1])})" aria-label="remove">×</button>`
    : `<button class="ex-delete-btn" onclick="event.stopPropagation();removeBuiltin('${slug}',${builtinIdx})" aria-label="remove">×</button>`;
  const classes = [
    "ex",
    isDone ? "done" : "",
    isCustom ? "ex-custom" : "",
    isRehab ? "ex-rehab" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `
  <div class="block" data-key="${key}" draggable="true">
    <div class="${classes}" id="ex-${key}">
      <div class="ex-head" onclick="toggleDone('${key}')">
        <span class="drag-handle" aria-label="drag">⠿</span>
        <span class="ex-num">${String(displayNum).padStart(2, "0")}</span>
        <span class="ex-name">${ex.name}${videoLink(ex.name)}</span>
        <span class="ex-spec">${ex.spec}</span>
        ${deleteBtn}
        <button class="ex-done-btn" aria-label="mark done">✓</button>
      </div>
      ${cueFor(ex.name, ex.notes) ? `<div class="ex-notes">${cueFor(ex.name, ex.notes)}</div>` : ""}
    </div>
  </div>`;
}

function renderExercises(slug) {
  const s = SLOTS[slug];
  const custom = loadCustom(slug);
  const removed = loadRemoved(slug);
  const savedOrder = loadOrder(slug);
  const currentKeys = getCurrentKeys(slug);
  let html = "";
  let displayNum = 1;

  if (savedOrder) {
    // Custom order — flat list, no section headers
    const order = [
      ...savedOrder.filter((k) => currentKeys.includes(k)),
      ...currentKeys.filter((k) => !savedOrder.includes(k)),
    ];
    order.forEach((key) => {
      const { ex, isCustom, isRehab, builtinIdx } = getExByKey(slug, key);
      if (ex)
        html += exBlock(
          slug,
          key,
          displayNum++,
          ex,
          isCustom,
          isRehab,
          builtinIdx,
        );
    });
  } else {
    // Default order — section headers visible
    let flatIdx = 0;
    let firstSection = true;

    if (s.sections) {
      s.sections.forEach((sec) => {
        let secHtml = "";
        sec.exercises.forEach((ex) => {
          if (!removed.has(flatIdx)) {
            secHtml += exBlock(
              slug,
              `${slug}-${flatIdx}`,
              displayNum++,
              ex,
              false,
              !!sec.isRehab,
              flatIdx,
            );
          }
          flatIdx++;
        });
        if (secHtml) {
          html += `<div class="section-header${firstSection ? " first" : ""}">${sec.name}</div>`;
          html += secHtml;
          firstSection = false;
        }
      });
    } else {
      s.exercises.forEach((ex) => {
        if (!removed.has(flatIdx)) {
          html += exBlock(
            slug,
            `${slug}-${flatIdx}`,
            displayNum++,
            ex,
            false,
            false,
            flatIdx,
          );
        }
        flatIdx++;
      });
    }

    if (custom.length) {
      html += `<div class="section-header${firstSection ? " first" : ""}">Added</div>`;
      custom.forEach((ex, i) => {
        html += exBlock(slug, `${slug}-c${i}`, displayNum++, ex, true, false);
      });
    }
  }

  if (removed.size > 0)
    html += `<div class="hidden-note" onclick="restoreBuiltin('${slug}')">${removed.size} hidden · restore all</div>`;
  if (savedOrder)
    html += `<div class="hidden-note" onclick="resetOrder('${slug}')">reordered · reset order</div>`;

  html += `<div id="add-ex-wrap"><button class="add-ex-btn" onclick="showAddForm('${slug}')">+ Add exercise</button></div>`;
  document.getElementById("exercise-list").innerHTML = html;

  // Attach drag listeners after render
  document
    .querySelectorAll("#exercise-list .block[data-key]")
    .forEach((block) => {
      block.addEventListener("dragstart", onDragStart);
      block.addEventListener("dragend", onDragEnd);
      block.addEventListener("dragover", onDragOver);
      block.addEventListener("dragleave", onDragLeave);
      block.addEventListener("drop", onDrop);
    });
  document.querySelectorAll("#exercise-list .drag-handle").forEach((handle) => {
    handle.addEventListener("touchstart", onHandleTouchStart, {
      passive: false,
    });
    handle.addEventListener("touchmove", onHandleTouchMove, { passive: false });
    handle.addEventListener("touchend", onHandleTouchEnd);
  });
}

function renderAvoid(slug) {
  const s = SLOTS[slug];
  const el = document.getElementById("avoid-section");
  if (!s.avoid || !s.avoid.length) {
    el.innerHTML = "";
    return;
  }
  el.innerHTML = `<div class="avoid-block">
    <div class="avoid-label">avoid today</div>
    ${s.avoid.map((a) => `<div class="avoid-item">${a}</div>`).join("")}
  </div>`;
}

function setSlot(slug) {
  currentSlot = slug;
  const s = SLOTS[slug];
  document.getElementById("slot-label").textContent = s.label;
  document.getElementById("slot-title").textContent = s.title;
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.toggle("active", t.dataset.slot === slug));
  renderExercises(slug);
  renderAvoid(slug);
  updateProgress(slug);
}

// ─── Add / remove / reorder ────────────────────────────────────────────────────

let addPick = null;

function showAddForm(slug) {
  addPick = null;
  document.getElementById("add-ex-wrap").innerHTML = `
    <div class="add-ex-form">
      <input id="add-ex-search" class="add-ex-input" placeholder="search the library" autocomplete="off"
        oninput="renderAddResults()" />
      <div id="add-ex-results" class="add-ex-results"></div>
      <div class="add-ex-row">
        <label class="add-ex-field">Sets
          <input id="add-ex-sets" class="add-ex-input add-ex-num" inputmode="numeric" placeholder="3" autocomplete="off" />
        </label>
        <span class="add-ex-times">×</span>
        <label class="add-ex-field">Reps
          <input id="add-ex-reps" class="add-ex-input add-ex-num" inputmode="numeric" placeholder="10" autocomplete="off"
            onkeydown="if(event.key==='Enter')confirmAddEx('${slug}')" />
        </label>
      </div>
      <div class="add-ex-actions">
        <button class="add-ex-cancel" onclick="renderExercises('${slug}')">Cancel</button>
        <button class="add-ex-confirm" onclick="confirmAddEx('${slug}')">Add</button>
      </div>
    </div>`;
  renderAddResults();
  document.getElementById("add-ex-search").focus();
}

function renderAddResults() {
  const q = document.getElementById("add-ex-search").value.toLowerCase().trim();
  const el = document.getElementById("add-ex-results");
  if (addPick && addPick.name.toLowerCase() !== q) addPick = null;
  if (addPick) {
    el.innerHTML = "";
    return;
  }
  const lib = window.EXERCISES || [];
  const hits = q ? lib.filter((ex) => ex.name.toLowerCase().includes(q)).slice(0, 8) : [];
  let html = hits
    .map(
      (ex) =>
        `<button type="button" class="add-ex-option" onclick="pickAddEx(${lib.indexOf(ex)})">
          <span>${ex.name}</span><span class="add-ex-option-spec">${ex.spec}</span>
        </button>`,
    )
    .join("");
  if (q && !hits.length) html = `<div class="add-ex-empty">Not in the library. Try another name.</div>`;
  el.innerHTML = html;
}

function pickAddEx(i) {
  addPick = window.EXERCISES[i];
  document.getElementById("add-ex-search").value = addPick.name;
  document.getElementById("add-ex-results").innerHTML = "";
  document.getElementById("add-ex-sets").focus();
}

function confirmAddEx(slug) {
  if (!addPick) {
    document.getElementById("add-ex-search").focus();
    return;
  }
  const sets = document.getElementById("add-ex-sets").value.trim();
  const reps = document.getElementById("add-ex-reps").value.trim();
  const spec = sets && reps ? `${sets} × ${reps}` : addPick.spec;
  const custom = loadCustom(slug);
  custom.push({ name: addPick.name, spec });
  saveCustom(slug, custom);
  const saved = loadOrder(slug);
  if (saved) {
    saved.push(`${slug}-c${custom.length - 1}`);
    saveOrder(slug, saved);
  }
  renderExercises(slug);
  updateProgress(slug);
}

function deleteCustom(slug, i) {
  const custom = loadCustom(slug);
  const saved = loadOrder(slug);
  if (saved) {
    const newOrder = saved
      .filter((k) => k !== `${slug}-c${i}`)
      .map((k) => {
        const m = k.match(new RegExp(`^${slug}-c(\\d+)$`));
        return m && parseInt(m[1]) > i ? `${slug}-c${parseInt(m[1]) - 1}` : k;
      });
    saveOrder(slug, newOrder);
  }
  custom.forEach((_, idx) => {
    if (idx > i)
      doneState[`${slug}-c${idx - 1}`] = !!doneState[`${slug}-c${idx}`];
    if (idx === custom.length - 1) delete doneState[`${slug}-c${idx}`];
  });
  custom.splice(i, 1);
  saveCustom(slug, custom);
  saveDoneState();
  renderExercises(slug);
  updateProgress(slug);
}

function removeBuiltin(slug, flatIdx) {
  const removed = loadRemoved(slug);
  removed.add(flatIdx);
  delete doneState[`${slug}-${flatIdx}`];
  saveDoneState();
  saveRemoved(slug, removed);
  renderExercises(slug);
  updateProgress(slug);
}

function restoreBuiltin(slug) {
  // Also reset order so restored exercises return to their original positions
  localStorage.removeItem(`${CONFIG.bodyPart}-order-${slug}`);
  saveRemoved(slug, new Set());
  renderExercises(slug);
  updateProgress(slug);
}

function resetOrder(slug) {
  localStorage.removeItem(`${CONFIG.bodyPart}-order-${slug}`);
  renderExercises(slug);
}

// ─── Desktop drag ──────────────────────────────────────────────────────────────

let dragKey = null;

function onDragStart(e) {
  dragKey = e.currentTarget.dataset.key;
  e.dataTransfer.effectAllowed = "move";
  setTimeout(() => e.currentTarget.classList.add("dragging"), 0);
}

function onDragEnd(e) {
  e.currentTarget.classList.remove("dragging");
  document
    .querySelectorAll("#exercise-list .block")
    .forEach((b) => b.classList.remove("drag-over"));
  dragKey = null;
}

function onDragOver(e) {
  e.preventDefault();
  if (e.currentTarget.dataset.key === dragKey) return;
  document
    .querySelectorAll("#exercise-list .block")
    .forEach((b) => b.classList.remove("drag-over"));
  e.currentTarget.classList.add("drag-over");
}

function onDragLeave(e) {
  e.currentTarget.classList.remove("drag-over");
}

function onDrop(e) {
  e.preventDefault();
  const targetKey = e.currentTarget.dataset.key;
  if (!dragKey || dragKey === targetKey) return;
  document
    .querySelectorAll("#exercise-list .block")
    .forEach((b) => b.classList.remove("drag-over"));

  const keys = getCurrentKeys(currentSlot);
  const saved = loadOrder(currentSlot);
  const order = saved
    ? [
        ...saved.filter((k) => keys.includes(k)),
        ...keys.filter((k) => !saved.includes(k)),
      ]
    : [...keys];

  const from = order.indexOf(dragKey);
  const to = order.indexOf(targetKey);
  if (from === -1 || to === -1) return;

  order.splice(to, 0, order.splice(from, 1)[0]);
  saveOrder(currentSlot, order);
  renderExercises(currentSlot);
  updateProgress(currentSlot);
}

// ─── Touch drag (via handle) ───────────────────────────────────────────────────

let touchDragEl = null;

function onHandleTouchStart(e) {
  e.preventDefault();
  touchDragEl = e.currentTarget.closest(".block[data-key]");
  touchDragEl.classList.add("dragging");
}

function onHandleTouchMove(e) {
  e.preventDefault();
  if (!touchDragEl) return;
  const touch = e.touches[0];

  // Make drag source invisible to hit-testing to find what's underneath
  touchDragEl.style.pointerEvents = "none";
  const elBelow = document.elementFromPoint(touch.clientX, touch.clientY);
  touchDragEl.style.pointerEvents = "";

  const target = elBelow?.closest("#exercise-list .block[data-key]");
  if (!target || target === touchDragEl) return;

  const parent = touchDragEl.parentNode;
  const blocks = [...parent.querySelectorAll(":scope > .block[data-key]")];
  const from = blocks.indexOf(touchDragEl);
  const to = blocks.indexOf(target);
  if (from === -1 || to === -1) return;

  parent.insertBefore(touchDragEl, from < to ? target.nextSibling : target);
}

function onHandleTouchEnd() {
  if (!touchDragEl) return;
  touchDragEl.classList.remove("dragging");

  const keys = [
    ...document.querySelectorAll("#exercise-list .block[data-key]"),
  ].map((b) => b.dataset.key);
  saveOrder(currentSlot, keys);

  touchDragEl = null;
  renderExercises(currentSlot);
  updateProgress(currentSlot);
}

// ─── Progress / done ───────────────────────────────────────────────────────────

function toggleDone(key) {
  doneState[key] = !doneState[key];
  saveDoneState();
  document.getElementById("ex-" + key).classList.toggle("done", doneState[key]);
  updateProgress(currentSlot);
}

function updateProgress(slug) {
  const builtin = flatBuiltin(slug);
  const custom = loadCustom(slug);
  const removed = loadRemoved(slug);
  const total =
    builtin.filter((_, i) => !removed.has(i)).length + custom.length;
  const done =
    builtin.filter((_, i) => !removed.has(i) && doneState[`${slug}-${i}`])
      .length + custom.filter((_, i) => doneState[`${slug}-c${i}`]).length;
  const pct = total ? (done / total) * 100 : 0;
  document.getElementById("prog-fill").style.width = pct + "%";
  document.getElementById("prog-text").textContent = `${done} / ${total} done`;
}

function resetDone() {
  if (!currentSlot) return;
  Object.keys(doneState).forEach((k) => {
    if (k.startsWith(`${currentSlot}-`)) delete doneState[k];
  });
  saveDoneState();
  localStorage.removeItem(`${CONFIG.bodyPart}-custom-${currentSlot}`);
  localStorage.removeItem(`${CONFIG.bodyPart}-removed-${currentSlot}`);
  localStorage.removeItem(`${CONFIG.bodyPart}-order-${currentSlot}`);
  renderExercises(currentSlot);
  updateProgress(currentSlot);
}

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent =
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0");
}

// ─── Init ──────────────────────────────────────────────────────────────────────
document.getElementById("app-title").textContent = CONFIG.title;
document.title = CONFIG.title;
renderTabs();
updateClock();
setInterval(updateClock, 10000);
setSlot("mon");
