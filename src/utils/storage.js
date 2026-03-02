export const STORAGE_KEYS = {
  deadlines: "scc-study-deadlines",
  tasks: "scc-task-manager",
}

const UPDATE_EVENT = "scc:data-updated"

export function readStoredArray(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeStoredArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: { key } }))
}

export function subscribeStorageUpdates(handler) {
  const wrapped = () => handler()
  window.addEventListener(UPDATE_EVENT, wrapped)
  window.addEventListener("storage", wrapped)
  window.addEventListener("focus", wrapped)

  return () => {
    window.removeEventListener(UPDATE_EVENT, wrapped)
    window.removeEventListener("storage", wrapped)
    window.removeEventListener("focus", wrapped)
  }
}
