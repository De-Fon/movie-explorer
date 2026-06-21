/*
  ⏳ Loader.jsx — "The Spinner"
  Shows a spinner and optional message while data is loading.
*/
export default function Loader({ message = 'Loading…' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}
