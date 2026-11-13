// ─── State ────────────────────────────────────────────────────────────────────

var currentFilter = 'All';
var searchQuery   = '';

var SESSION_KEY  = 'knee-stability-session';
var ROUTINE_KEY  = 'knee-stability-routine';
var NEXT_ID_KEY  = 'knee-stability-next-id';

var session = [];
var nextId  = parseInt(localStorage.getItem(NEXT_ID_KEY) || '1');

var TODAY            = new Date().toISOString().slice(0, 10);
var BUILDER_DONE_KEY = 'knee-stability-done-' + TODAY;
var doneState        = JSON.parse(localStorage.getItem(BUILDER_DONE_KEY) || '{}');

// Only stability exercises
var STABILITY_EXERCISES = window.EXERCISES.filter(function(ex) {
  return [].concat(ex.muscle).indexOf('Stability') !== -1;
});

// ─── Persistence ──────────────────────────────────────────────────────────────

function saveSession() {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem(NEXT_ID_KEY, String(nextId));
}

function loadSession() {
  var raw = localStorage.getItem(SESSION_KEY);
  session = raw ? JSON.parse(raw) : [];
  nextId  = parseInt(localStorage.getItem(NEXT_ID_KEY) || '1');
}

function saveDoneState() {
  localStorage.setItem(BUILDER_DONE_KEY, JSON.stringify(doneState));
}

// ─── Filter + Search ──────────────────────────────────────────────────────────

function getFilteredExercises() {
  var q = searchQuery.toLowerCase().trim();
  return STABILITY_EXERCISES.filter(function(ex) {
    var partMatch = currentFilter === 'All' || [].concat(ex.bodyPart).indexOf(currentFilter) !== -1;
    var nameMatch = !q || ex.name.toLowerCase().indexOf(q) !== -1;
    return partMatch && nameMatch;
  });
}

function renderResults() {
  var results = getFilteredExercises();
  var el      = document.getElementById('search-results');

  if (results.length === 0) {
    el.innerHTML = '<div class="results-empty">no exercises found</div>';
    return;
  }

  var html = '<div class="results-count">' + results.length + ' exercises</div>';
  results.forEach(function(ex) {
    html += '<div class="result-item" onclick="addToSession(' + JSON.stringify(ex).replace(/"/g, '&quot;') + ')">'
      + '<span class="result-name">' + ex.name + videoLink(ex.name) + '</span>'
      + '<span class="result-muscle">' + (currentFilter !== 'All' && [].concat(ex.bodyPart).indexOf(currentFilter) !== -1 ? currentFilter : [].concat(ex.bodyPart)[0]).toUpperCase() + '</span>'
      + '<button class="result-add" aria-label="add">+</button>'
      + '</div>';
  });
  el.innerHTML = html;
}

// ─── Session add ──────────────────────────────────────────────────────────────

function addToSession(ex) {
  var item = {
    id:        nextId++,
    name:      ex.name,
    muscle:    ex.muscle,
    bodyPart:  ex.bodyPart,
    equipment: ex.equipment,
    spec:      ex.spec,
  };
  session.push(item);
  saveSession();
  renderSession();
  updateBuilderProgress();
}

var LAST_KEY = 'kinetic-routine-last';

function localDay(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function readLastDone() {
  try { return JSON.parse(localStorage.getItem(LAST_KEY) || '{}'); } catch (e) { return {}; }
}

function lastDoneLabel(day) {
  if (!day) return '';
  var parts = day.split('-').map(Number);
  var then = new Date(parts[0], parts[1] - 1, parts[2]);
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var days = Math.round((today - then) / 86400000);
  if (days <= 0) return 'done today';
  if (days === 1) return 'done yesterday';
  return 'done ' + days + ' days ago';
}

function markRoutineDone() {
  var name = null;
  try { name = localStorage.getItem(ROUTINE_KEY); } catch (e) {}
  if (!name || !(window.ROUTINES || []).some(function(r) { return r.name === name; })) return;
  var last = readLastDone();
  var today = localDay(new Date());
  if (last[name] === today) return;
  last[name] = today;
  try { localStorage.setItem(LAST_KEY, JSON.stringify(last)); } catch (e) {}
  renderRoutines();
}

var PIN_KEY = 'kinetic-routine-pins';
var PIN_VERSION_KEY = 'kinetic-routine-pins-version';
var PIN_VERSION = 2;
var showAllRoutines = false;

function readJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null');
  } catch (e) {
    return null;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

function defaultPins() {
  return (window.ROUTINES || [])
    .filter(function(r) { return r.pinned; })
    .map(function(r) { return r.name; });
}

// Pins start as the routines marked pinned in routines.js. Raising
// PIN_VERSION resets every device to that set once.
function readPins() {
  var saved = readJson(PIN_KEY);
  if (saved && readJson(PIN_VERSION_KEY) === PIN_VERSION) return saved;
  var pins = defaultPins();
  writeJson(PIN_KEY, pins);
  writeJson(PIN_VERSION_KEY, PIN_VERSION);
  return pins;
}

function togglePin(i) {
  var name = window.ROUTINES[i].name;
  var pins = readPins();
  var at = pins.indexOf(name);
  if (at === -1) pins.push(name); else pins.splice(at, 1);
  writeJson(PIN_KEY, pins);
  renderRoutines();
}

function toggleShowAll() {
  showAllRoutines = !showAllRoutines;
  renderRoutines();
}

function renderRoutines() {
  var el = document.getElementById('routines');
  var routines = window.ROUTINES || [];
  var last = readLastDone();
  var pins = readPins();
  var shown = showAllRoutines
    ? routines
    : routines.filter(function(r) { return pins.indexOf(r.name) !== -1; });
  if (!shown.length) shown = routines;

  el.innerHTML = shown.map(function(r) {
    var i = routines.indexOf(r);
    var when = lastDoneLabel(last[r.name]);
    var isPinned = pins.indexOf(r.name) !== -1;
    return '<div class="routine-cell">'
      + '<button type="button" class="routine-card" onclick="loadRoutine(' + i + ')">'
      + '<span class="routine-name">' + r.name + '</span>'
      + '<span class="routine-count">' + r.exercises.length + ' exercises'
      + (when ? '<span class="routine-last">' + when + '</span>' : '')
      + '</span>'
      + '</button>'
      + (showAllRoutines
          ? '<button type="button" class="routine-pin' + (isPinned ? ' pinned' : '') + '"'
            + ' onclick="togglePin(' + i + ')" aria-pressed="' + (isPinned ? 'true' : 'false') + '"'
            + ' aria-label="' + (isPinned ? 'Unpin ' : 'Pin ') + r.name + '">'
            + (isPinned ? '\u2605' : '\u2606') + '</button>'
          : '')
      + '</div>';
  }).join('');

  var toggle = document.getElementById('routines-toggle');
  if (toggle) {
    toggle.textContent = showAllRoutines
      ? 'Show less'
      : 'Show all routines (' + routines.length + ')';
  }
}

function loadRoutine(i) {
  var routine = window.ROUTINES[i];
  session.forEach(function(s) { delete doneState['builder-' + s.id]; });
  saveDoneState();
  session = [];
  routine.exercises.forEach(function(entry) {
    var name = typeof entry === 'string' ? entry : entry.name;
    var ex = STABILITY_EXERCISES.find(function(e) { return e.name === name; })
      || { name: name, muscle: 'Stability', bodyPart: '', equipment: '', spec: '' };
    if (typeof entry !== 'string' && entry.spec) ex = Object.assign({}, ex, { spec: entry.spec });
    var notes = typeof entry === 'string' ? '' : (entry.notes || '');
    session.push({
      id:        nextId++,
      name:      ex.name,
      muscle:    ex.muscle,
      bodyPart:  ex.bodyPart,
      equipment: ex.equipment,
      spec:      ex.spec,
      notes:     notes,
    });
  });
  saveSession();
  try { localStorage.setItem(ROUTINE_KEY, routine.name); } catch (e) {}
  renderSession();
  updateBuilderProgress();
}

// ─── Spec editing ─────────────────────────────────────────────────────────────

function editSpec(id) {
  var item = session.find(function(s) { return s.id === id; });
  if (!item) return;

  var span = document.querySelector('.block[data-id="' + id + '"] .ex-spec');
  if (!span) return;

  var input = document.createElement('input');
  input.className = 'spec-edit-input';
  input.value     = item.spec;

  function commit() {
    var val = input.value.trim();
    if (val) item.spec = val;
    saveSession();
    renderSession();
    updateBuilderProgress();
  }

  input.addEventListener('blur',    commit);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter')  { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { input.removeEventListener('blur', commit); renderSession(); }
  });

  span.replaceWith(input);
  input.focus();
  input.select();
}

// ─── Done toggle ──────────────────────────────────────────────────────────────

function toggleDone(id) {
  var key = 'builder-' + id;
  doneState[key] = !doneState[key];
  saveDoneState();
  if (doneState[key]) markRoutineDone();
  var exEl = document.getElementById('ex-builder-' + id);
  if (exEl) exEl.classList.toggle('done', doneState[key]);
  updateBuilderProgress();
}

// ─── Delete from session ──────────────────────────────────────────────────────

function deleteSessionItem(id) {
  session = session.filter(function(s) { return s.id !== id; });
  delete doneState['builder-' + id];
  saveDoneState();
  saveSession();
  renderSession();
  updateBuilderProgress();
}

// ─── Progress ─────────────────────────────────────────────────────────────────

function updateBuilderProgress() {
  var total = session.length;
  var done  = session.filter(function(s) { return doneState['builder-' + s.id]; }).length;
  var pct   = total ? (done / total) * 100 : 0;
  document.getElementById('builder-prog-fill').style.width = pct + '%';
  document.getElementById('builder-prog-text').textContent = done + ' / ' + total + ' done';
}

// ─── Reset done ───────────────────────────────────────────────────────────────

function resetBuilderDone() {
  var name = null;
  try { name = localStorage.getItem(ROUTINE_KEY); } catch (e) {}
  var idx = (window.ROUTINES || []).findIndex(function(r) { return r.name === name; });
  if (idx !== -1) {
    loadRoutine(idx);
    return;
  }
  session.forEach(function(s) { delete doneState['builder-' + s.id]; });
  saveDoneState();
  session = [];
  saveSession();
  renderSession();
  updateBuilderProgress();
}

// ─── Session render ───────────────────────────────────────────────────────────

function previousHtml() {
  var name = null;
  try { name = localStorage.getItem(ROUTINE_KEY); } catch (e) {}
  var routine = (window.ROUTINES || []).find(function(r) { return r.name === name; });
  if (!routine || !routine.previous || !routine.previous.length) return '';
  var items = routine.previous.map(function(ex) {
    return '<div class="ex ex-previous">'
      + '<div class="ex-head">'
      + '<span class="ex-name">' + ex.name + '</span>'
      + '<span class="ex-spec">' + ex.spec + '</span>'
      + '</div>'
      + (ex.notes ? '<div class="ex-notes">' + ex.notes + '</div>' : '')
      + '</div>';
  }).join('');
  return '<div class="previous-divider">' + (routine.previousLabel || 'Before') + '</div>' + items;
}

function renderSession() {
  var el = document.getElementById('session-list');
  if (session.length === 0) {
    el.innerHTML = '<div class="empty-session">no exercises yet — search below to add</div>';
    return;
  }

  var html = '';
  session.forEach(function(item, idx) {
    var key    = 'builder-' + item.id;
    var isDone = !!doneState[key];
    var num    = String(idx + 1).padStart(2, '0');
    var classes = ['ex', isDone ? 'done' : ''].filter(Boolean).join(' ');

    html += '<div class="block" data-id="' + item.id + '" draggable="true">'
      + '<div class="' + classes + '" id="ex-builder-' + item.id + '">'
      + '<div class="ex-head" onclick="toggleDone(' + item.id + ')">'
      + '<span class="drag-handle" aria-label="drag">⠿</span>'
      + '<span class="ex-num">' + num + '</span>'
      + '<span class="ex-name">' + item.name + videoLink(item.name) + '</span>'
      + '<span class="ex-spec" onclick="event.stopPropagation();editSpec(' + item.id + ')">' + item.spec + '</span>'
      + '<button class="ex-delete-btn" onclick="event.stopPropagation();deleteSessionItem(' + item.id + ')" aria-label="remove">×</button>'
      + '<button class="ex-done-btn" aria-label="mark done">✓</button>'
      + '</div>'
      + (cueFor(item.name, item.notes) ? '<div class="ex-notes">' + cueFor(item.name, item.notes) + '</div>' : '')
      + '</div>'
      + '</div>';
  });

  el.innerHTML = html + previousHtml();

  document.querySelectorAll('#session-list .block[data-id]').forEach(function(block) {
    block.addEventListener('dragstart', onDragStart);
    block.addEventListener('dragend',   onDragEnd);
    block.addEventListener('dragover',  onDragOver);
    block.addEventListener('dragleave', onDragLeave);
    block.addEventListener('drop',      onDrop);
  });

  document.querySelectorAll('#session-list .drag-handle').forEach(function(handle) {
    handle.addEventListener('touchstart', onHandleTouchStart, { passive: false });
    handle.addEventListener('touchmove',  onHandleTouchMove,  { passive: false });
    handle.addEventListener('touchend',   onHandleTouchEnd);
  });
}

// ─── Desktop drag ─────────────────────────────────────────────────────────────

var dragId = null;

function onDragStart(e) {
  dragId = parseInt(e.currentTarget.dataset.id);
  e.dataTransfer.effectAllowed = 'move';
  setTimeout(function() { e.currentTarget.classList.add('dragging'); }, 0);
}

function onDragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  document.querySelectorAll('#session-list .block').forEach(function(b) {
    b.classList.remove('drag-over');
  });
  dragId = null;
}

function onDragOver(e) {
  e.preventDefault();
  var targetId = parseInt(e.currentTarget.dataset.id);
  if (targetId === dragId) return;
  document.querySelectorAll('#session-list .block').forEach(function(b) {
    b.classList.remove('drag-over');
  });
  e.currentTarget.classList.add('drag-over');
}

function onDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

function onDrop(e) {
  e.preventDefault();
  var targetId = parseInt(e.currentTarget.dataset.id);
  if (!dragId || dragId === targetId) return;

  document.querySelectorAll('#session-list .block').forEach(function(b) {
    b.classList.remove('drag-over');
  });

  var fromIdx = session.findIndex(function(s) { return s.id === dragId; });
  var toIdx   = session.findIndex(function(s) { return s.id === targetId; });
  if (fromIdx === -1 || toIdx === -1) return;

  session.splice(toIdx, 0, session.splice(fromIdx, 1)[0]);
  saveSession();
  renderSession();
  updateBuilderProgress();
}

// ─── Touch drag ───────────────────────────────────────────────────────────────

var touchDragEl = null;

function onHandleTouchStart(e) {
  e.preventDefault();
  touchDragEl = e.currentTarget.closest('.block[data-id]');
  touchDragEl.classList.add('dragging');
}

function onHandleTouchMove(e) {
  e.preventDefault();
  if (!touchDragEl) return;
  var touch = e.touches[0];

  touchDragEl.style.pointerEvents = 'none';
  var elBelow = document.elementFromPoint(touch.clientX, touch.clientY);
  touchDragEl.style.pointerEvents = '';

  var target = elBelow && elBelow.closest('#session-list .block[data-id]');
  if (!target || target === touchDragEl) return;

  var parent = touchDragEl.parentNode;
  var blocks = Array.prototype.slice.call(parent.querySelectorAll(':scope > .block[data-id]'));
  var from   = blocks.indexOf(touchDragEl);
  var to     = blocks.indexOf(target);
  if (from === -1 || to === -1) return;

  parent.insertBefore(touchDragEl, from < to ? target.nextSibling : target);
}

function onHandleTouchEnd() {
  if (!touchDragEl) return;
  touchDragEl.classList.remove('dragging');

  var ids = Array.prototype.slice.call(
    document.querySelectorAll('#session-list .block[data-id]')
  ).map(function(b) { return parseInt(b.dataset.id); });

  session.sort(function(a, b) {
    return ids.indexOf(a.id) - ids.indexOf(b.id);
  });

  touchDragEl = null;
  saveSession();
  renderSession();
  updateBuilderProgress();
}

// ─── Clock ────────────────────────────────────────────────────────────────────

function updateClock() {
  var now = new Date();
  document.getElementById('clock').textContent =
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0');
}

// ─── Init ─────────────────────────────────────────────────────────────────────

loadSession();
renderRoutines();
renderResults();
renderSession();
updateBuilderProgress();
updateClock();
setInterval(updateClock, 10000);

document.getElementById('search-input').addEventListener('input', function(e) {
  searchQuery = e.target.value;
  renderResults();
});

document.querySelectorAll('#filter-pills .filter-pill').forEach(function(pill) {
  pill.addEventListener('click', function() {
    currentFilter = pill.dataset.filter;
    document.querySelectorAll('#filter-pills .filter-pill').forEach(function(p) {
      p.classList.remove('active');
    });
    pill.classList.add('active');
    renderResults();
  });
});
