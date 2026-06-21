export default function ErrorMessage({ title = 'Something went wrong', message, retry }) {
  return (
    <div className="error-message" role="alert">
      <strong>{title}</strong>
      {message ? <p>{message}</p> : null}
      {retry ? (
        <button type="button" className="error-message__retry" onClick={retry}>
          Try again
        </button>
      ) : null}
    </div>
  )
}
