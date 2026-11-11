const CONFIG = {
  title: "Kinetic",
  bodyPart: "knee",
};

const REHAB_A = {
  name: "Rehab A",
  isRehab: true,
  exercises: [
    {
      name: "Step-ups (low box)",
      spec: "3×10/leg",
      notes:
        "Drive through heel of working leg. Avoid pushing off back foot — it should barely touch the box.",
    },
    {
      name: "Split squats (short stride)",
      spec: "3×8/leg",
      notes:
        "Torso upright, front shin vertical, back heel raised with toes on the floor. Feet staggered on a diagonal — not inline. Lower straight down.",
    },
    {
      name: "Wall sits (60–70°)",
      spec: "3×30–45s",
      notes:
        "Thighs parallel or just above. Press entire back flat into wall. Keep weight in heels, not toes.",
    },
    {
      name: "TKE",
      spec: "3×15",
      notes:
        "Squeeze quad fully at end range. Stop just short of lockout snap — no hyperextension.",
    },
    {
      name: "Calf raises",
      spec: "3x15",
      notes:
        "Full range: drop heel below step level, rise all the way up. Slow and controlled on the way down.",
    },
  ],
  previousLabel: "Phase 1, before 5 May",
  previous: [
    { name: "Quad Sets", spec: "3×10 · 5–10s hold", notes: "Press back of knee into floor. No leg lift." },
    { name: "TKE (band)", spec: "3×12–15 · slow lockout", notes: "Slow, full lockout — avoid snapping into extension." },
    { name: "Straight Leg Raises", spec: "3×10–12 · 2s up/down", notes: "Lock knee fully before lifting. Toes pointed up." },
    { name: "Glute Bridge", spec: "3×12–15 · 2s squeeze", notes: "Drive through heels. Do not hyperextend lower back at top." },
    { name: "Side-Lying Hip Abduction", spec: "2–3×12–15", notes: "Keep pelvis stacked, do not rotate forward during lift." },
  ],
};

const REHAB_B = {
  name: "Rehab B",
  isRehab: true,
  exercises: [
    {
      name: "Single-leg RDL",
      spec: "3×8 / leg",
      notes:
        "Hinge at hip, not waist. Keep hips square — back leg floats as counterweight. Feel it in the hamstring, not the lower back.",
    },
    {
      name: "Single-leg glute bridge",
      spec: "3×10 / leg",
      notes:
        "Drive through heel. Keep hips level — don't let the free side drop. Squeeze at top, don't arch the lower back.",
    },
    {
      name: "Side-lying abduction (slow tempo)",
      spec: "3×12 / leg",
      notes:
        "Stack hips — don't let top hip roll back. 2s up, 3s down, no momentum.",
    },
    {
      name: "Banded lateral walks",
      spec: "3×12 steps each way",
      notes:
        "Band above knees. Stay in a quarter squat — don't stand between steps. Knees track out, don't cave.",
    },
    {
      name: "Single-leg balance (knee over toe)",
      spec: "3×30s",
      notes:
        "Soft knee bend tracking over second toe. Grip the floor with toes if wobbling.",
    },
  ],
  previousLabel: "Phase 1, before 5 May",
  previous: [
    { name: "Shallow Wall Sit", spec: "4×20–30s · 30–45° only", notes: "Back flat against wall. Stop at 45° — do not push past comfort." },
    { name: "Step-Ups (low)", spec: "3×8–10 / leg · no push-off", notes: "Lead leg only. No push-off from trailing foot." },
    { name: "Romanian Deadlift", spec: "3×8–10 · hip-dominant", notes: "Hinge at hips, soft knee bend. Bar stays close to legs." },
    { name: "Hamstring Curl", spec: "3×10–12" },
    { name: "Calf Raises", spec: "3×12–15" },
  ],
};

const SLOTS = {
  day1: {
    label: "Chest · Triceps · Rehab A",
    title: "Day 1",
    tabLabel: "Day 1",
    sections: [
      {
        name: "Chest",
        exercises: [
          { name: "Bench Press", spec: "4×6–8" },
          { name: "Incline Bench Press", spec: "3×8–10" },
          { name: "Incline Dumbbell Press", spec: "3×10–12" },
          { name: "Cable Chest Fly", spec: "3×12–15" },
          { name: "Push-ups", spec: "100" },
        ],
      },
      {
        name: "Arms",
        exercises: [
          { name: "Dips", spec: "3×8–12" },
          { name: "Triceps Pushdown (cable)", spec: "3×12–15" },
          { name: "Overhead Triceps Extension (DB)", spec: "3×10–12" },
          { name: "EZ-Bar Reverse Curls", spec: "3×10–12" },
          { name: "Hammer Curls", spec: "3×10–12" },
        ],
      },
      REHAB_A,
    ],
    avoid: [],
  },
  day2: {
    label: "Back · Biceps · Rehab A",
    title: "Day 2",
    tabLabel: "Day 2",
    sections: [
      {
        name: "Back",
        exercises: [
          { name: "Pull-ups", spec: "4 × max" },
          { name: "Deadlift", spec: "4×4–6" },
          { name: "Dumbbell Rows", spec: "3×8–10 / arm" },
          { name: "Seated Cable Rows", spec: "3×10–12" },
          { name: "Machine Rows", spec: "3×12–15" },
          { name: "Face Pulls", spec: "3×15–20" },
          { name: "Shoulder Shrugs", spec: "3×8–12 · heavy" },
          { name: "Lateral Raises", spec: "3×8–12" },
        ],
      },
      {
        name: "Arms",
        exercises: [
          { name: "Machine Bicep Curls", spec: "3×10–12" },
          { name: "EZ-Bar Reverse Curls", spec: "3×10–12" },
          { name: "Hammer Curls", spec: "3×10–12" },
        ],
      },
      REHAB_B,
    ],
    avoid: [],
  },
  day3: {
    label: "Legs · Abs · Rehab B",
    title: "Day 3",
    tabLabel: "Day 3",
    sections: [
      {
        name: "Legs",
        exercises: [
          { name: "Squat", spec: "4×6–8" },
          { name: "Seated Leg Press", spec: "3×10–12 · moderate depth" },
          { name: "Incline Leg Press (45°)", spec: "3×10–12" },
          {
            name: "Leg Extension",
            spec: "3×12–15 · light · partial",
            notes:
              "Light weight only. Stop short of full extension — protect fat pad.",
          },
          { name: "Calf Raises", spec: "4×15–20" },
          { name: "Leg Press Calf Press", spec: "3×15–20" },
        ],
      },
      {
        name: "Arms",
        exercises: [
          { name: "EZ-Bar Reverse Curls", spec: "3×10–12" },
          { name: "Hammer Curls", spec: "3×10–12" },
        ],
      },
      {
        name: "Abs",
        exercises: [{ name: "Hanging Toes to Bar", spec: "3×10–15" }],
      },
      REHAB_A,
    ],
    avoid: [
      "Deep squats past parallel",
      "Lunges past ~60°",
      "Heavy / full-range leg extensions",
      "Slant board / knees-over-toes",
    ],
  },
  day4: {
    label: "Full Body · Rehab A",
    title: "Day 4",
    tabLabel: "Day 4",
    sections: [
      {
        name: "Chest",
        exercises: [
          { name: "Chest Press (machine)", spec: "3×10–12" },
          { name: "Cable Chest Fly", spec: "3×12–15" },
        ],
      },
      {
        name: "Back",
        exercises: [
          { name: "Machine Rows", spec: "3×10–12" },
          { name: "Lat Pulldown", spec: "3×10–12" },
        ],
      },
      {
        name: "Arms",
        exercises: [
          { name: "EZ-Bar Reverse Curls", spec: "3×10–12" },
          { name: "Hammer Curls", spec: "3×10–12" },
          { name: "Wrist Curls (forearm)", spec: "3×15–20" },
        ],
      },
      {
        name: "Abs",
        exercises: [
          { name: "Abs Circuit", spec: "5 min" },
          { name: "Hanging Toes to Bar", spec: "3×10–15" },
        ],
      },
      REHAB_B,
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

function previousBlock(sec) {
  if (!sec.previous || !sec.previous.length) return "";
  const items = sec.previous
    .map(
      (ex) => `
    <div class="ex ex-previous">
      <div class="ex-head">
        <span class="ex-name">${ex.name}</span>
        <span class="ex-spec">${ex.spec}</span>
      </div>
      ${ex.notes ? `<div class="ex-notes">${ex.notes}</div>` : ""}
    </div>`,
    )
    .join("");
  return `<div class="previous-divider">${sec.previousLabel || "Before"}</div>${items}`;
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
          html += previousBlock(sec);
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
      html += `<div class="section-header${firstSection ? " first" : ""}">CUSTOM</div>`;
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

function showAddForm(slug) {
  document.getElementById("add-ex-wrap").innerHTML = `
    <div class="add-ex-form">
      <input id="add-ex-name" class="add-ex-input" placeholder="exercise name" autocomplete="off"
        onkeydown="if(event.key==='Enter')document.getElementById('add-ex-spec').focus()" />
      <input id="add-ex-spec" class="add-ex-input" placeholder="sets × reps" autocomplete="off"
        onkeydown="if(event.key==='Enter')confirmAddEx('${slug}')" />
      <div class="add-ex-actions">
        <button class="add-ex-cancel" onclick="renderExercises('${slug}')">cancel</button>
        <button class="add-ex-confirm" onclick="confirmAddEx('${slug}')">add</button>
      </div>
    </div>`;
  document.getElementById("add-ex-name").focus();
}

function confirmAddEx(slug) {
  const name = document.getElementById("add-ex-name").value.trim();
  const spec = document.getElementById("add-ex-spec").value.trim();
  if (!name) return;
  const custom = loadCustom(slug);
  custom.push({ name, spec: spec || "—" });
  saveCustom(slug, custom);
  // append to saved order if one exists
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
setSlot("day1");
