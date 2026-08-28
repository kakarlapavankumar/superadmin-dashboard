interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-2 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (item) => (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`px-3 py-2 border rounded ${
              item === page ? "bg-blue-600 text-white" : ""
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
