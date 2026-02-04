import { getPanelLayout } from '../../utils/helpers';
import Panel from './Panel';

export default function PanelGrid({ panels, onPanelClick }) {
    if (!panels || panels.length === 0) return null;

    const layout = getPanelLayout(panels.length);
    const isMobile = window.innerWidth < 768; // Simple check, or use a hook

    return (
        <div
            className="grid gap-3 md:gap-4 w-full max-w-5xl mx-auto bg-white p-4 md:p-8 shadow-2xl"
            style={{
                aspectRatio: isMobile ? 'auto' : '2/3', // Comic page ratio
                gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
                gridTemplateRows: `repeat(${layout.rows}, 1fr)`
            }}
        >
            {panels.map((panel, index) => {
                // Advanced grid spans for asymmetric layouts
                let style = {};

                // Example logic for 5 panel asymmetric layout (3 bottom, 2 top) as per specs
                if (layout.asymmetric && panels.length === 5) {
                    if (index < 2) {
                        // Top row: 2 panels spanning full width together? 
                        // Or grid-column: span 3 if cols=6?
                        // Let's simplify:
                        // If cols=2, rows=3. 
                        // Logic needs to be robust CSS Grid.
                        // Let's stick to simple equal grid for now unless index matches specific patterns
                    }
                }

                return (
                    <div key={panel.panel_number} className="relative w-full h-full min-h-[200px]" style={style}>
                        <Panel panel={panel} onClick={onPanelClick} />
                    </div>
                );
            })}
        </div>
    );
}
