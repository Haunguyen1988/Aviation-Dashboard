const supabase = require('../config/supabase');

exports.getSectorCount = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;

        // Default to current month if not specified
        const start = start_date || new Date().toISOString();
        const end = end_date || new Date().toISOString();

        const { count, error } = await supabase
            .from('flights')
            .select('*', { count: 'exact', head: true })
            .gte('flight_date', start)
            .lte('flight_date', end)
            .eq('commercial_ind', true);

        if (error) throw error;

        res.json({ success: true, data: { count } });
    } catch (error) {
        console.error('Error in getSectorCount:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getACChanges = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        const start = start_date || new Date().toISOString();
        const end = end_date || new Date().toISOString();

        const { count, error } = await supabase
            .from('aircraft_swaps')
            .select('*', { count: 'exact', head: true })
            .gte('flight_date', start)
            .lte('flight_date', end);

        if (error) throw error;

        res.json({ success: true, data: { count } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getBlockHours = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        const start = start_date || new Date().toISOString();
        const end = end_date || new Date().toISOString();

        // Use the view_flights_metrics for calculation
        // Summing in Supabase JS client isn't direct like SQL 'SUM()', 
        // usually we use an RPC function or a View that aggregates, 
        // OR we fetch data and sum in Node (if data is small scaling issue),
        // OR we use .select('block_hours.sum()') - wait PostgREST doesn't support aggregate functions directly in select lightly without grouping.
        // But the user asked for "SQL View... for heavy post processing".
        // Let's assume the View returns row-level metrics (as I defined it), 
        // so we still need to sum.
        // OPTION 1: Fetch all rows and sum (Bad for performance).
        // OPTION 2: Create a second View for Aggregates (better).
        // OPTION 3: Supabase .rpc() call to a custom SQL function.

        // I'll implement a simple fetch for now as it's a migration and we can optimize later,
        // OR better, I will assume the user creates an RPC or we do it in Node for now if dataset is manageable.
        // Actually, let's just fetch the `block_hours` column and sum in Node for simplicity in migration unless thousands of rows.
        // RETHINK: "Render Free is not optimal for heavy post processing".
        // Use RPC is best.

        let { data, error } = await supabase.rpc('calculate_block_hours', { start_date: start, end_date: end });

        if (error) {
            // Fallback if RPC not exists: Fetch view and sum (temporary migration step)
            // console.warn("RPC calculate_block_hours not found, falling back to client-side sum");
            const { data: rows, error: viewError } = await supabase
                .from('view_flights_metrics')
                .select('block_hours')
                .gte('flight_date', start)
                .lte('flight_date', end)
                .eq('commercial_ind', true);

            if (viewError) throw viewError;

            const sum = rows.reduce((acc, row) => acc + (row.block_hours || 0), 0);
            return res.json({ success: true, data: { block_hours: sum } });
        }

        res.json({ success: true, data: { block_hours: data || 0 } });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getLayovers = async (req, res) => {
    res.json({ success: true, data: { count: 0, message: "Not implemented yet" } });
};

exports.getDeadheads = async (req, res) => {
    res.json({ success: true, data: { count: 0, message: "Not implemented yet" } });
};
