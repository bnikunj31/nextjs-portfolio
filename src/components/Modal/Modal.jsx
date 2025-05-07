const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg w-4/5 max-w-3xl">
      <div className="flex justify-between items-center border-b border-gray-700 px-4 py-3">
        <h2 className="text-xl font-semibold">Enquiry Details</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
        >
          &times;
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

export default Modal;
  