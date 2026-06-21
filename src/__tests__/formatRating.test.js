import formatRating from '../utils/formatRating'

describe('formatRating', () => {
  it('formats a normal rating to one decimal place out of 10', () => {
    expect(formatRating(7.5)).toBe('7.5/10')
  })

  it('handles a rating of 0', () => {
    expect(formatRating(0)).toBe('0.0/10')
  })

  it('handles null rating', () => {
    expect(formatRating(null)).toBe('—')
  })

  it('handles undefined rating', () => {
    expect(formatRating(undefined)).toBe('—')
  })

  it('handles a perfect 10', () => {
    expect(formatRating(10)).toBe('10.0/10')
  })
})
