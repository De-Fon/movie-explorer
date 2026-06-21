/*
  🛡️ ErrorBoundary.jsx — "The Safety Net"
  Catches runtime errors in child components and shows a friendly error
  message so the whole app doesn't crash.
*/
import React from 'react'
import ErrorMessage from './ErrorMessage.jsx'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
    this.reset = this.reset.bind(this)
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // log to external service if available
    // console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          title="Something went wrong"
          message={this.state.error?.message}
          retry={this.reset}
        />
      )
    }
    return this.props.children
  }

  reset() {
    this.setState({ hasError: false, error: null })
  }
}
