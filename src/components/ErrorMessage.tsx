interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = "Something went wrong",
}: ErrorMessageProps) {
  return <div className="p-4 rounded-lg bg-red-50 text-red-600">{message}</div>;
}
