/*
  🚫 NotFoundPage.jsx — "The 404 Room"
  Shown when the user navigates to a route that doesn't exist.
*/
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="page page--not-found">
      <section className="not-found">
        <h1>404</h1>
        <p>We couldn't find the page you were looking for.</p>
        <Link to="/" className="button button--primary">
          Go back home
        </Link>
      </section>
    </main>
  )
}
