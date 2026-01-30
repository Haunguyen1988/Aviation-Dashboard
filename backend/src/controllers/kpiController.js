const supabase = require('../config/supabase');

exports.getSectorCount = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        const start = start_date || new Date().toISOString();
        const end = end_date || new Date().toISOString();

        const { count, error } = await supabase
            .from('flights')
            .select('*', { count: 'exact', head: true })
            .gte('flight_date', start)
            .lte('flight_date', end)
            .eq('commercial_ind', true);

        if (error) throw error;

        res.json({
            success: true,
            data: { count },
            meta: { start_date: start, end_date: end }
        });
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

        res.json({
            success: true,
            data: { count },
            meta: { start_date: start, end_date: end }
        });
    } catch (error) {
        console.error('Error in getACChanges:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getBlockHours = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        const start = start_date || new Date().toISOString();
        const end = end_date || new Date().toISOString();

        let { data, error } = await supabase.rpc('calculate_block_hours', { start_date: start, end_date: end });

        if (error) {
            const { data: rows, error: viewError } = await supabase
                .from('view_flights_metrics')
                .select('block_hours')
                .gte('flight_date', start)
                .lte('flight_date', end)
                .eq('commercial_ind', true);

            if (viewError) throw viewError;

            const sum = rows.reduce((acc, row) => acc + (row.block_hours || 0), 0);
            return res.json({
                success: true,
                data: { block_hours: sum },
                meta: { start_date: start, end_date: end, fallback: true }
            });
        }

        res.json({
            success: true,
            data: { block_hours: data || 0 },
            meta: { start_date: start, end_date: end }
        });
    } catch (error) {
        console.error('Error in getBlockHours:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getLayovers = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        const start = start_date || new Date().toISOString();
        const end = end_date || new Date().toISOString();

        const { count, error } = await supabase
            .from('crew_pairings')
            .select('*', { count: 'exact', head: true })
            .gte('duty_start', start)
            .lte('duty_end', end);

        if (error) throw error;
        res.json({
            success: true,
            data: { count },
            meta: { start_date: start, end_date: end }
        });
    } catch (error) {
        console.error('Error in getLayovers:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getDeadheads = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        const start = start_date || new Date().toISOString();
        const end = end_date || new Date().toISOString();

        const { count, error } = await supabase
            .from('crew_pairings')
            .select('*', { count: 'exact', head: true })
            .eq('deadhead_ind', true)
            .gte('duty_start', start)
            .lte('duty_end', end);

        if (error) throw error;
        res.json({
            success: true,
            data: { count },
            meta: { start_date: start, end_date: end }
        });
    } catch (error) {
        console.error('Error in getDeadheads:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getStandbyMetrics = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        const start = start_date || new Date().toISOString();
        const end = end_date || new Date().toISOString();

        const { data, error } = await supabase
            .from('view_crew_standby_metrics')
            .select('*')
            .gte('roster_date', start)
            .lte('roster_date', end);

        if (error) throw error;
        res.json({
            success: true,
            data: data,
            meta: { start_date: start, end_date: end }
        });
    } catch (error) {
        console.error('Error in getStandbyMetrics:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Additional list endpoints for Reports page
exports.getFlightsList = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        const start = start_date || new Date().toISOString();
        const end = end_date || new Date().toISOString();

        const { data, error } = await supabase
            .from('flights')
            .select('*')
            .gte('flight_date', start)
            .lte('flight_date', end)
            .order('flight_date', { ascending: false })
            .limit(100);

        if (error) throw error;
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getRosterList = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        const start = start_date || new Date().toISOString();
        const end = end_date || new Date().toISOString();

        const { data, error } = await supabase
            .from('crew_roster')
            .select('*')
            .gte('roster_date', start)
            .lte('roster_date', end)
            .order('roster_date', { ascending: false })
            .limit(100);

        if (error) throw error;
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
