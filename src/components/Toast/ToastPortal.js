import ReactDOM from 'react-dom'

export function ToastPortal({ children }) {
  return ReactDOM.createPortal(children, document.getElementById('toast-portal'))
}
