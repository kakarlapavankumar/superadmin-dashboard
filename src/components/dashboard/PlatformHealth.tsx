import type { platformHealth } from "../../types/dashboard";

interface Props {
  items: platformHealth[];
}

export default function PlatformHealth({ items }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="font-bold text-lg mb-5">Platform Health</h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{(item as platformHealth & { name?: string }).name}</span>

            <span
              className={
                (item as platformHealth & { status: string }).status ===
                  "Healthy" ||
                (item as platformHealth & { status: string }).status ===
                  "Connected" ||
                (item as platformHealth & { status: string }).status ===
                  "Running"
                  ? "text-green-600 font-medium"
                  : "text-blue-600 font-medium"
              }
            >
              {(item as platformHealth & { status: string }).status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
