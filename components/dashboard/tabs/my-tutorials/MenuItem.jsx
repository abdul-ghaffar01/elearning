
export default function MenuItem({ icon, text, danger }) {
    return (
        <button
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200
                ${danger
                    ? "text-red-500 hover:bg-red-500/10 hover:scale-105"
                    : "hover:bg-[var(--accent)]/10 hover:scale-105"
                }
            `}
        >
            <span className={`${danger ? "text-red-500" : "text-current"}`}>
                {icon}
            </span>
            <span>{text}</span>
        </button>
    );
}