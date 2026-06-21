/*
  📅 formatDate.js — Friendly date formatter
  Turns raw ISO date strings into readable local date strings like
  "May 12, 2023" for display in the UI.
*/
export default function formatDate(dateString) {
  if (!dateString) {
    return 'Unknown'
  }

  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
