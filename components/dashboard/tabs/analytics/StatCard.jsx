import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function StatCard ({ title, value, icon, change, subtitle }) {
    const isPositive = change >= 0;

    return (
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium opacity-70 mb-1">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                    {subtitle && <p className="text-xs opacity-60 mt-1">{subtitle}</p>}
                </div>
                <div className="p-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-xl">
                    {icon}
                </div>
            </div>
            {change !== undefined && (
                <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'
                    }`}>
                    {isPositive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
                    <span>{Math.abs(change)}%</span>
                    <span className="text-xs opacity-70 ml-1">from previous period</span>
                </div>
            )}
        </div>
    );
};
