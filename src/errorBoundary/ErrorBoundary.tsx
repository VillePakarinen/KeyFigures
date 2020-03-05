import React from "react";

interface Props {
  render: any;
}

export default class ErrorBoundary extends React.Component<Props> {
  state: {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
  } = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.props.render}</div>;
    }
    return this.props.children;
  }
}
