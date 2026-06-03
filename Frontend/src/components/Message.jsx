function Message({ variant, children }) {
  const styles = {
    success: "bg-green-100 text-green-800 border-green-500",
    danger: "bg-red-100 text-red-800 border-red-500",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-500",
  };

  const activeStyle = styles[variant] || styles.success;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div
        className={`p-4 border-l-4 w-4/5 max-w-md rounded shadow-lg pointer-events-auto ${activeStyle}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Message;
