export default function SortControls({ value, onChange }) {
    return (
        <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap hidden sm:block">
                Sort by:
            </label>
            <select
                id="sort"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full sm:w-auto pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">Title A-Z</option>
                <option value="za">Title Z-A</option>
                <option value="pages_desc">Most Pages</option>
            </select>
        </div>
    );
}
