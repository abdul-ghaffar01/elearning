export default function ProgressBar({ percentage, color = 'bg-[var(--accent)]' }) {
   return (
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
                className={`h-2 rounded-full ${color} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
}
