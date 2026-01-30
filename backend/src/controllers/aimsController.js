const aimsService = require('../services/aimsService');
const supabase = require('../config/supabase');
const winston = require('winston');

exports.syncRoster = async (req, res) => {
    try {
        const { staff_id, start_date, end_date } = req.body;

        if (!staff_id || !start_date || !end_date) {
            return res.status(400).json({ success: false, error: 'Missing staff_id, start_date, or end_date' });
        }

        winston.info(`Syncing AIMS roster for staff ${staff_id} from ${start_date} to ${end_date}`);
        const result = await aimsService.fetchRoster(staff_id, start_date, end_date);

        const rosterItems = result?.CrewMemberRosterDetailsForPeriodResult?.TAIMSCrewRostDetailList?.TAIMSCrewRostItm || [];

        const formattedRoster = rosterItems.map(item => {
            return {
                staff_id: staff_id,
                roster_date: item.Day,
                duty_code: item.Legcd,
                duty_type: (item.Flt && item.Flt !== 'OFF') ? 'FLIGHT' : 'OFF',
                dep_airport: item.Dep,
                arr_airport: item.Arr,
                std: item.STD,
                sta: item.STA,
                atd: item.ATD,
                ata: item.ATA,
                source: 'AIMS_API'
            };
        });

        if (formattedRoster.length > 0) {
            const { error } = await supabase
                .from('crew_roster')
                .upsert(formattedRoster, { onConflict: 'staff_id, roster_date' });

            if (error) throw error;
        }

        res.json({ success: true, data: { synced_count: formattedRoster.length } });
    } catch (error) {
        winston.error('AIMS syncRoster error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.syncFlights = async (req, res) => {
    try {
        const { date } = req.body; // 'DDMMYYYY'

        if (!date) {
            return res.status(400).json({ success: false, error: 'Missing date' });
        }

        winston.info(`Syncing AIMS flights for ${date}`);
        const result = await aimsService.fetchFlights(date);

        const flightItems = result?.FlightDetailsForFlightLegOnDayResult?.FlightList?.TAIMSFlight || [];

        const formattedFlights = flightItems.map(item => ({
            flight_no: `${item.FlightCarrier}${item.FlightNo}${item.FlightLegCD || ''}`,
            flight_date: item.FlightDate,
            dep_airport: item.FlightDep,
            arr_airport: item.FlightArr,
            std: item.FlightStd,
            sta: item.FlightSta,
            etd: item.FlightEtd,
            eta: item.FlightEta,
            atd: item.FlightAtd,
            ata: item.FlightAta,
            ac_reg: item.FlightReg,
            ac_type: item.FlightAcType,
            commercial_ind: true,
            source: 'AIMS_API'
        }));

        if (formattedFlights.length > 0) {
            const { error } = await supabase
                .from('flights')
                .upsert(formattedFlights, { onConflict: 'flight_no, flight_date' });

            if (error) throw error;
        }

        res.json({ success: true, data: { synced_count: formattedFlights.length } });
    } catch (error) {
        winston.error('AIMS syncFlights error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
