require('dotenv').config();
const aimsService = require('./src/services/aimsService');
const winston = require('winston');

async function testAims() {
    console.log('--- AIMS Integration Test ---');
    console.log('WSDL:', process.env.AIMS_WSDL_URL);

    try {
        // 1. Test Flight Sync
        console.log('\nTesting fetchFlights for today...');
        const today = new Date().toISOString().split('T')[0].split('-').reverse().join(''); // DDMMYYYY
        console.log('Target Date:', today);

        const flightResults = await aimsService.fetchFlights(today);
        const flightItems = flightResults?.FlightDetailsForFlightLegOnDayResult?.FlightList?.TAIMSFlight || [];
        console.log(`Flights count: ${flightItems.length}`);

        if (flightItems.length > 0) {
            console.log('✅ Flight sync data received & parsed!');
        } else {
            console.log('⚠️ Flight sync returned empty or unexpected structure.');
        }

        // 2. Test Roster Sync (Using a real-looking ID or user valid ID)
        const staffId = '101'; // Try a common ID
        console.log(`\nTesting fetchRoster for staff ${staffId}...`);
        const result = await aimsService.fetchRoster(staffId, '01012026', '31012026');
        console.log('Roster Results Snippet:', JSON.stringify(result).substring(0, 500) + '...');

        console.log('\n--- Test Completed ---');
    } catch (error) {
        console.error('❌ AIMS Test Failed:', error.message);
        if (error.response) {
            console.error('Response Data:', error.response.data);
        }
    }
}

testAims();
