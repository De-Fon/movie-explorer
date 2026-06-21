export default function Pagination({ currentPage, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) {
    return null
  }

  const pages = []
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, start + 4)

  for (let page = start; page <= end; page += 1) {
    pages.push(page)
  }

  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      <button
        type="button"
        className="pagination__button"
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          className={`pagination__button ${page === currentPage ? 'pagination__button--active' : ''}`}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="pagination__button"
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}
