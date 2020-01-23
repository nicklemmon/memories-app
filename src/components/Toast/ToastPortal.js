import ReactDOM from 'react-dom'

export default function ToastPortal({ children }) {
  return ReactDOM.createPortal(children, document.getElementById('toast-portal'))
}
