import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong.";
      try {
        // Check if it's our custom Firestore error
        const parsed = JSON.parse(this.state.error?.message || "");
        if (parsed.error && parsed.operationType) {
          errorMessage = `Database Error: ${parsed.error} during ${parsed.operationType}. Please refresh.`;
        }
      } catch {
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="p-8 text-center bg-[#1A060D] border border-[#FF0055]/30 rounded-3xl m-4">
          <h2 className="text-[#FF0055] text-2xl font-bold mb-4">Oops!</h2>
          <p className="text-[#FDF5E6]/80 mb-6">{errorMessage}</p>
          <button
            className="px-6 py-2 bg-[#FF0055] text-white rounded-full hover:bg-[#D90048] transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      );
    }

    // @ts-ignore
    return this.props.children;
  }
}
