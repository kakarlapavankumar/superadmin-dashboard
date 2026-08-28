interface Activity {
  id: string | number;
  message: string;
  time: string;
}

interface Props {
  activities: Activity[];
}

export default function RecentActivities({ activities }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="font-bold text-lg mb-5">Recent Activities</h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border-b pb-3">
            <p className="font-medium">{activity.message}</p>

            <p className="text-sm text-gray-500">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
