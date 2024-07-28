import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Memperbarui state sehingga render berikutnya menunjukkan UI fallback.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Anda juga dapat mencatat error ke layanan pelaporan error
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Anda dapat merender UI fallback kustom
      return <h1>Terjadi kesalahan. Silakan coba lagi nanti.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
