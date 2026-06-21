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
