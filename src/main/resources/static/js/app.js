/* =============================================================
   Smart Task Scheduler — app.js
   Member 4 | Frontend JS Foundation
   =============================================================
   INTEGRATION POINTS:
   - Member 2: Validation & error handling  → search "M2"
   - Member 3: Algorithm endpoints          → search "M3"
   ============================================================= */

'use strict';

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const BASE = 'http://localhost:8080/api';

/* ─────────────────────────────────────────────
   UI HELPERS
───────────────────────────────────────────── */

/** Show the full-screen loading spinner */
function showLoader() {
  const el = document.getElementById('global-loader');
  if (el) el.classList.remove('hidden');
}

/** Hide the loading spinner */
function hideLoader() {
  const el = document.getElementById('global-loader');
  if (el) el.classList.add('hidden');
}

/**
 * Display a toast alert notification.
 * @param {string} message - Text to show
 * @param {'success'|'danger'|'warning'|'info'} type
 * @param {number} duration - Auto-dismiss ms (default 3500)
 */
function showAlert(message, type = 'info', duration = 3500) {
  const container = document.getElementById('alert-container');
  if (!container) return;

  const icons = {
    success: '✅', danger: '❌', warning: '⚠️', info: 'ℹ️'
  };

  const div = document.createElement('div');
  div.className = `alert alert-${type} alert-dismissible toast-alert d-flex align-items-center gap-2 mb-0`;
  div.setAttribute('role', 'alert');
  div.innerHTML = `
    <span>${icons[type] || 'ℹ️'}</span>
    <span class="flex-grow-1">${message}</span>
    <button type="button" class="btn-close" aria-label="Close"></button>
  `;

  div.querySelector('.btn-close').addEventListener('click', () => div.remove());
  container.appendChild(div);
  setTimeout(() => { if (div.parentNode) div.remove(); }, duration);
}

/**
 * Render an empty-state block into a container element.
 * @param {HTMLElement} container
 * @param {string} icon - Emoji icon
 * @param {string} title
 * @param {string} subtitle
 */
function renderEmptyState(container, icon = '📋', title = 'No data yet', subtitle = 'Nothing to display.') {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">${icon}</div>
      <h5>${title}</h5>
      <p class="text-muted">${subtitle}</p>
    </div>`;
}

/**
 * Returns a priority badge HTML string.
 * @param {string} priority - HIGH | MEDIUM | LOW
 */
function priorityBadge(priority) {
  const map = { HIGH: 'badge-high', MEDIUM: 'badge-medium', LOW: 'badge-low' };
  const cls = map[priority] || 'badge-low';
  return `<span class="badge-priority ${cls}">${priority || '—'}</span>`;
}

/**
 * Returns a status badge HTML string.
 * @param {boolean} completed
 */
function statusBadge(completed) {
  return completed
    ? `<span class="badge-status badge-done">✅ Done</span>`
    : `<span class="badge-status badge-pending">⏳ Pending</span>`;
}

/** Format ISO date string to readable form */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  } catch { return dateStr; }
}

/** Mark the current page's nav link as active */
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
}

/** Populate the current date in elements with id="currentDate" */
function renderCurrentDate() {
  const el = document.getElementById('currentDate');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

/* ─────────────────────────────────────────────
   API — Generic Fetch Wrapper
───────────────────────────────────────────── */

/**
 * Centralized fetch with error handling.
 * M2 integration point: structured error responses are parsed here.
 */
async function apiFetch(url, options = {}) {
  const defaults = {
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  };
  const config = { ...defaults, ...options };
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const res = await fetch(url, config);

  // ── M2 integration point ──────────────────────────────────
  // Member 2's GlobalExceptionHandler returns structured JSON errors.
  // Example: { "status": "error", "message": "..." }
  //          { "fieldname": "error message", ... }   (validation errors)
  // TODO: When Member 2's exception handler is ready, parse field errors here
  //       and surface them in forms via showFieldErrors().
  // ─────────────────────────────────────────────────────────

  if (!res.ok) {
    let errMsg = `Server error (${res.status})`;
    try {
      const errBody = await res.json();
      // Handle Member 2's GlobalExceptionHandler format
      errMsg = errBody.message || errBody.error || JSON.stringify(errBody);
    } catch { /* non-JSON error body */ }
    throw new Error(errMsg);
  }

  // 204 No Content — nothing to parse
  if (res.status === 204) return null;

  return res.json();
}

/* ─────────────────────────────────────────────
   TASK FUNCTIONS
───────────────────────────────────────────── */

/**
 * GET /api/tasks/sorted
 * Returns tasks sorted by priority using Member 3's HeapScheduler.
 * M3 integration point: endpoint must return priority-sorted array.
 * Falls back to GET /api/tasks if /sorted is not yet available.
 */
async function loadSortedTasks() {
  showLoader();
  try {
    let tasks;
    try {
      // M3 heap scheduler endpoint
      // TODO: Member 3 — connect HeapScheduler result here
      tasks = await apiFetch(`${BASE}/tasks/sorted`);
    } catch {
      // Graceful fallback while Member 3's endpoint is being built
      console.warn('[app.js] /tasks/sorted not ready — falling back to /tasks');
      tasks = await apiFetch(`${BASE}/tasks`);
    }
    return tasks || [];
  } catch (err) {
    console.error('[loadSortedTasks]', err);
    showAlert('Could not load tasks. Is the backend running?', 'danger');
    return [];
  } finally {
    hideLoader();
  }
}

/**
 * GET /api/tasks
 * Returns all tasks (unsorted).
 */
async function loadAllTasks() {
  showLoader();
  try {
    const tasks = await apiFetch(`${BASE}/tasks`);
    return tasks || [];
  } catch (err) {
    console.error('[loadAllTasks]', err);
    showAlert('Could not load tasks.', 'danger');
    return [];
  } finally {
    hideLoader();
  }
}

/**
 * GET /api/tasks/{id}
 */
async function getTaskById(id) {
  try {
    return await apiFetch(`${BASE}/tasks/${id}`);
  } catch (err) {
    console.error('[getTaskById]', err);
    showAlert(err.message, 'danger');
    return null;
  }
}

/**
 * POST /api/tasks
 * M2 integration point: validation errors returned by Member 2's
 * GlobalExceptionHandler will be caught and shown via showAlert().
 * @param {Object} formData - { title, description, priority, deadline, taskListId }
 */
async function createTask(formData) {
  showLoader();
  try {
    // TODO: M2 — handle field-level validation error response here
    //       e.g. { "title": "Title is required", "priority": "Must be HIGH/MEDIUM/LOW" }
    const created = await apiFetch(`${BASE}/tasks`, {
      method: 'POST',
      body: formData,
    });
    showAlert('Task created successfully!', 'success');
    return created;
  } catch (err) {
    console.error('[createTask]', err);
    // M2 validation integration point
    showAlert(err.message || 'Failed to create task.', 'danger');
    return null;
  } finally {
    hideLoader();
  }
}

/**
 * PUT /api/tasks/{id}
 * M2 integration point: same validation error handling as createTask.
 * @param {number} id
 * @param {Object} formData
 */
async function updateTask(id, formData) {
  showLoader();
  try {
    // TODO: M2 — handle field-level validation error response here
    const updated = await apiFetch(`${BASE}/tasks/${id}`, {
      method: 'PUT',
      body: formData,
    });
    showAlert('Task updated successfully!', 'success');
    return updated;
  } catch (err) {
    console.error('[updateTask]', err);
    showAlert(err.message || 'Failed to update task.', 'danger');
    return null;
  } finally {
    hideLoader();
  }
}

/**
 * DELETE /api/tasks/{id}
 * @param {number} id
 */
async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return false;
  showLoader();
  try {
    await apiFetch(`${BASE}/tasks/${id}`, { method: 'DELETE' });
    showAlert('Task deleted.', 'success');
    return true;
  } catch (err) {
    console.error('[deleteTask]', err);
    showAlert(err.message || 'Failed to delete task.', 'danger');
    return false;
  } finally {
    hideLoader();
  }
}

/**
 * PATCH /api/tasks/{id}/complete
 * Toggle task completion status.
 * @param {number} id
 */
async function markComplete(id) {
  showLoader();
  try {
    const updated = await apiFetch(`${BASE}/tasks/${id}/complete`, { method: 'PATCH' });
    showAlert('Task status updated!', 'success');
    return updated;
  } catch (err) {
    console.error('[markComplete]', err);
    showAlert(err.message || 'Failed to update status.', 'danger');
    return null;
  } finally {
    hideLoader();
  }
}

/* ─────────────────────────────────────────────
   SCHEDULE FUNCTIONS
───────────────────────────────────────────── */

/**
 * GET /api/tasks/schedule
 * Returns tasks in topological/dependency-aware order.
 *
 * M3 integration point:
 * TODO: Member 3 — connect topological sort result to this endpoint.
 *       Expected response: ordered array of TaskResponseDTO.
 * Falls back to sorted tasks if /schedule not yet available.
 */
async function loadSchedule() {
  showLoader();
  try {
    let scheduled;
    try {
      // M3 topological sort endpoint
      // TODO: Member 3 — /api/tasks/schedule returns dependency-ordered tasks
      scheduled = await apiFetch(`${BASE}/tasks/schedule`);
    } catch {
      // Graceful fallback
      console.warn('[app.js] /tasks/schedule not ready — falling back to /tasks/sorted');
      try {
        scheduled = await apiFetch(`${BASE}/tasks/sorted`);
      } catch {
        scheduled = await apiFetch(`${BASE}/tasks`);
      }
    }
    return scheduled || [];
  } catch (err) {
    console.error('[loadSchedule]', err);
    showAlert('Could not load schedule.', 'danger');
    return [];
  } finally {
    hideLoader();
  }
}

/* ─────────────────────────────────────────────
   DEPENDENCY FUNCTIONS
───────────────────────────────────────────── */

/**
 * GET /api/dependencies
 * Returns all task dependencies.
 * M3 integration point: DAG edges loaded here.
 */
async function loadDependencies() {
  showLoader();
  try {
    const deps = await apiFetch(`${BASE}/dependencies`);
    return deps || [];
  } catch (err) {
    console.error('[loadDependencies]', err);
    showAlert('Could not load dependencies.', 'danger');
    return [];
  } finally {
    hideLoader();
  }
}

/**
 * POST /api/dependencies
 * M3 integration point: cycle detection happens on the backend.
 * If Member 3's service detects a cycle, Member 2's handler returns 400
 * which is caught here and shown as an alert.
 * @param {Object} dep - { taskId, dependsOnTaskId }
 */
async function createDependency(dep) {
  showLoader();
  try {
    // TODO: M3 — backend checks for DAG cycle before saving
    // TODO: M2 — validation error ("Cycle detected") is returned as 400 JSON
    const created = await apiFetch(`${BASE}/dependencies`, {
      method: 'POST',
      body: dep,
    });
    showAlert('Dependency added!', 'success');
    return created;
  } catch (err) {
    console.error('[createDependency]', err);
    // If cycle detected: err.message = "This dependency creates a cycle"
    showAlert(err.message || 'Failed to add dependency.', 'danger');
    return null;
  } finally {
    hideLoader();
  }
}

/**
 * DELETE /api/dependencies/{id}
 * @param {number} id
 */
async function deleteDependency(id) {
  if (!confirm('Remove this dependency?')) return false;
  showLoader();
  try {
    await apiFetch(`${BASE}/dependencies/${id}`, { method: 'DELETE' });
    showAlert('Dependency removed.', 'success');
    return true;
  } catch (err) {
    console.error('[deleteDependency]', err);
    showAlert(err.message || 'Failed to delete dependency.', 'danger');
    return false;
  } finally {
    hideLoader();
  }
}

/* ─────────────────────────────────────────────
   LIST FUNCTIONS
───────────────────────────────────────────── */

/**
 * GET /api/lists
 * Populate task list dropdowns in forms.
 */
async function loadLists() {
  try {
    const lists = await apiFetch(`${BASE}/lists`);
    return lists || [];
  } catch {
    console.warn('[app.js] /api/lists not yet available — using fallback');
    return [];
  }
}

/**
 * Populate a <select> element with task lists.
 * @param {string} selectId - Element ID of the <select>
 */
async function populateListDropdown(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;
  const lists = await loadLists();
  select.innerHTML = '<option value="">— Select List —</option>';
  lists.forEach(l => {
    select.innerHTML += `<option value="${l.id}">${l.name}</option>`;
  });
}

/* ─────────────────────────────────────────────
   DASHBOARD STATS
───────────────────────────────────────────── */

/** Compute and render stat card counts from a task array */
function renderStats(tasks) {
  const total     = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending   = total - completed;
  const highPrio  = tasks.filter(t => t.priority === 'HIGH').length;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('statTotal',     total);
  set('statCompleted', completed);
  set('statPending',   pending);
  set('statHigh',      highPrio);
}

/* ─────────────────────────────────────────────
   TASK TABLE RENDERER
───────────────────────────────────────────── */

/**
 * Render a task array into a <tbody> element.
 * @param {string} tbodyId
 * @param {Array}  tasks
 * @param {Object} opts - { showActions: true }
 */
function renderTaskTable(tbodyId, tasks, opts = {}) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  const { showActions = true } = opts;

  if (!tasks || tasks.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="7">
        <div class="empty-state py-4">
          <div class="empty-icon">📋</div>
          <h5>No tasks found</h5>
          <p class="text-muted">Add your first task to get started.</p>
        </div>
      </td></tr>`;
    return;
  }

  tbody.innerHTML = tasks.map((t, i) => `
    <tr>
      <td class="text-muted-sm">${t.id || i + 1}</td>
      <td class="fw-600">${t.title || '—'}</td>
      <td>${priorityBadge(t.priority)}</td>
      <td class="text-muted-sm">${formatDate(t.deadline)}</td>
      <td>${statusBadge(t.completed)}</td>
      ${showActions ? `
      <td>
        <div class="action-btns">
          <button class="btn btn-sm btn-outline-primary" onclick="openEditModal(${t.id})" title="Edit">✏️</button>
          <button class="btn btn-sm btn-outline-danger"  onclick="handleDelete(${t.id})"  title="Delete">🗑️</button>
          ${!t.completed
            ? `<button class="btn btn-sm btn-outline-success" onclick="handleComplete(${t.id})" title="Mark Done">✅</button>`
            : ''}
        </div>
      </td>` : ''}
    </tr>`).join('');
}

/* ─────────────────────────────────────────────
   CLIENT-SIDE SEARCH & FILTER
───────────────────────────────────────────── */

/** Filter a task array by search text and priority */
function filterTasks(tasks, searchText = '', priority = '') {
  return tasks.filter(t => {
    const matchText = !searchText
      || (t.title || '').toLowerCase().includes(searchText.toLowerCase())
      || (t.description || '').toLowerCase().includes(searchText.toLowerCase());
    const matchPrio = !priority || t.priority === priority;
    return matchText && matchPrio;
  });
}

/* ─────────────────────────────────────────────
   FORM HELPERS
───────────────────────────────────────────── */

/** Read values from the task form modal fields */
function readTaskForm() {
  return {
    title:       document.getElementById('fTitle')?.value?.trim(),
    description: document.getElementById('fDescription')?.value?.trim(),
    priority:    document.getElementById('fPriority')?.value,
    deadline:    document.getElementById('fDeadline')?.value || null,
    taskListId:  document.getElementById('fTaskListId')?.value || null,
  };
}

/** Populate the task form modal fields (for editing) */
function fillTaskForm(task) {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  set('fTitle',       task.title);
  set('fDescription', task.description);
  set('fPriority',    task.priority);
  set('fDeadline',    task.deadline);
  set('fTaskListId',  task.taskListId);
}

/**
 * Show field-level validation errors in the form.
 * M2 integration point: call this with Member 2's error response object.
 * @param {Object} errors - { fieldName: "error message", ... }
 */
function showFieldErrors(errors) {
  // Clear previous errors
  document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');

  // M2 TODO: map error keys to form field IDs
  // e.g. errors = { "title": "Title is required", "priority": "Invalid priority" }
  const fieldMap = {
    title:       'fTitle',
    description: 'fDescription',
    priority:    'fPriority',
    deadline:    'fDeadline',
    taskListId:  'fTaskListId',
  };

  Object.entries(errors).forEach(([field, msg]) => {
    const el = document.getElementById(fieldMap[field]);
    if (el) {
      el.classList.add('is-invalid');
      const feedback = el.nextElementSibling;
      if (feedback?.classList.contains('invalid-feedback')) {
        feedback.textContent = msg;
      }
    }
  });
}

/* ─────────────────────────────────────────────
   MODAL MANAGEMENT
───────────────────────────────────────────── */

let _currentEditId = null;

/** Open Add Task modal (blank form) */
function openAddModal() {
  _currentEditId = null;
  const form = document.getElementById('taskForm');
  if (form) form.reset();
  document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  const label = document.getElementById('modalTaskLabel');
  if (label) label.textContent = '➕ Add New Task';
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('taskModal'));
  modal.show();
}

/** Open Edit Task modal, pre-filled with task data */
async function openEditModal(id) {
  _currentEditId = id;
  const task = await getTaskById(id);
  if (!task) return;
  const label = document.getElementById('modalTaskLabel');
  if (label) label.textContent = '✏️ Edit Task';
  fillTaskForm(task);
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('taskModal'));
  modal.show();
}

/** Handle form submit inside modal — create or update */
async function handleTaskFormSubmit() {
  const data = readTaskForm();

  // Basic frontend guard (M2 does full validation on backend)
  if (!data.title) {
    showAlert('Title is required.', 'warning');
    return;
  }

  let result;
  if (_currentEditId) {
    result = await updateTask(_currentEditId, data);
  } else {
    result = await createTask(data);
  }

  if (result) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    modal?.hide();
    // Refresh whichever table is on this page
    if (typeof refreshPage === 'function') refreshPage();
  }
  // M2 integration: if result is null due to validation error, form stays open.
  // Errors are already shown via showAlert or showFieldErrors.
}

/* ─────────────────────────────────────────────
   EVENT HANDLERS (used in inline onclick attrs)
───────────────────────────────────────────── */

async function handleDelete(id) {
  const deleted = await deleteTask(id);
  if (deleted && typeof refreshPage === 'function') refreshPage();
}

async function handleComplete(id) {
  const updated = await markComplete(id);
  if (updated && typeof refreshPage === 'function') refreshPage();
}

/* ─────────────────────────────────────────────
   APP INITIALIZATION
───────────────────────────────────────────── */

/**
 * Main entry point — call on every page.
 * Each page defines its own refreshPage() and page-specific logic.
 */
function initializeApp() {
  setActiveNav();
  renderCurrentDate();
  hideLoader();
  console.info('[SmartTask] App initialized | Base URL:', BASE);
}

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', initializeApp);
