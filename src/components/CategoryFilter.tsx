type ToastProps = {
  message: string;
}

const Toast = ({ message }: ToastProps) => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded">
      {message}
    </div>
  );
};

export default Toast;
