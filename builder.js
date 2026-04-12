// ─── State ────────────────────────────────────────────────────────────────────

var currentFilter = 'All';
var searchQuery   = '';

var SESSION_KEY  = 'knee-builder-session';
var NEXT_ID_KEY  = 'knee-builder-next-id';

var session = [];
var nextId  = parseInt(localStorage.getItem(NEXT_ID_KEY) || '1');

var TODAY            = new Date().toISOString().slice(0, 10);
var BUILDER_DONE_KEY = 'knee-builder-done-' + TODAY;
var doneState        = JSON.parse(localStorage.getItem(BUILDER_DONE_KEY) || '{}');

// ─── Muscle pill → actual muscle group mapping ────────────────────────────────

var PILL_MAP = {
  'All':       null,
  'Chest':     ['Chest'],
  'Back':      ['Back'],
  'Shoulders': ['Shoulders'],
  'Arms':      ['Biceps', 'Triceps', 'Forearms'],
  'Legs':      ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
  'Core':      ['Core'],
  'Other':     ['Full Body', 'Cardio', 'Rehab'],
};

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
  var muscles = PILL_MAP[currentFilter];
  var q       = searchQuery.toLowerCase().trim();
  return window.EXERCISES.filter(function(ex) {
    var muscleMatch = !muscles || muscles.indexOf(ex.muscle) !== -1;
    var nameMatch   = !q || ex.name.toLowerCase().indexOf(q) !== -1;
    return muscleMatch && nameMatch;
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
      + '<span class="result-name">' + ex.name + '</span>'
      + '<span class="result-muscle">' + ex.muscle.toUpperCase() + '</span>'
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
    equipment: ex.equipment,
    spec:      ex.spec,
  };
  session.push(item);
  saveSession();
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
    if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { input.removeEventListener('blur', commit); renderSession(); }
  });

  span.replaceWith(input);
  input.focus();
  input.select();
}

// ─── Done toggle ──────────────────────────────────────────────────────────────

function toggleDone(id) {
  var key  = 'builder-' + id;
  doneState[key] = !doneState[key];
  saveDoneState();
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
  session.forEach(function(s) { delete doneState['builder-' + s.id]; });
  saveDoneState();
  renderSession();
  updateBuilderProgress();
}

// ─── Session render ───────────────────────────────────────────────────────────

function renderSession() {
  var el = document.getElementById('session-list');
  if (session.length === 0) {
    el.innerHTML = '<div class="empty-session">no exercises yet — search above to add</div>';
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
      + '<span class="ex-name">' + item.name + '</span>'
      + '<span class="ex-spec" onclick="event.stopPropagation();editSpec(' + item.id + ')">' + item.spec + '</span>'
      + '<button class="ex-delete-btn" onclick="event.stopPropagation();deleteSessionItem(' + item.id + ')" aria-label="remove">×</button>'
      + '<button class="ex-done-btn" aria-label="mark done">✓</button>'
      + '</div>'
      + '</div>'
      + '</div>';
  });

  el.innerHTML = html;

  // Attach drag listeners
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

  // Sync session array order to DOM order
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
renderResults();
renderSession();
updateBuilderProgress();
updateClock();
setInterval(updateClock, 10000);

// Search input
document.getElementById('search-input').addEventListener('input', function(e) {
  searchQuery = e.target.value;
  renderResults();
});

// Filter pills
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
