import React from 'react';
import toast from 'react-hot-toast';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    toast.error("Ocurrió un error inesperado. Por favor, intenta nuevamente.");
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <h1 className="text-2xl font-bold text-red-600">Algo salió mal.</h1>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
