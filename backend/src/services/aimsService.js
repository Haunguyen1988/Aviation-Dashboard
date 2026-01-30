const soap = require('soap');
const winston = require('winston');

class AimsService {
    constructor() {
        this.wsdlUrl = process.env.AIMS_WSDL_URL;
        this.username = process.env.AIMS_USERNAME;
        this.password = process.env.AIMS_PASSWORD;
        this.client = null;
    }

    async getClient() {
        if (this.client) return this.client;

        try {
            this.client = await soap.createClientAsync(this.wsdlUrl);

            // Override endpoint if it points to internal IP
            const publicEndpoint = this.wsdlUrl.split('?')[0];
            this.client.setEndpoint(publicEndpoint);
            winston.info(`AIMS SOAP endpoint set to: ${publicEndpoint}`);

            return this.client;
        } catch (error) {
            winston.error('Error creating AIMS SOAP client:', error);
            throw error;
        }
    }

    /**
     * Fetch crew roster details for a period
     * @param {number} staffId 
     * @param {string} fromDate 'DDMMYYYY'
     * @param {string} toDate 'DDMMYYYY'
     */
    async fetchRoster(staffId, fromDate, toDate) {
        const client = await this.getClient();
        const args = {
            UN: this.username,
            PSW: this.password,
            ID: staffId,
            FmDD: fromDate.substring(0, 2),
            FmMM: fromDate.substring(2, 4),
            FmYY: fromDate.substring(4, 8),
            ToDD: toDate.substring(0, 2),
            ToMM: toDate.substring(2, 4),
            ToYY: toDate.substring(4, 8)
        };

        return new Promise((resolve, reject) => {
            client.CrewMemberRosterDetailsForPeriod(args, (err, result) => {
                if (err) {
                    winston.error('AIMS fetchRoster error:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    /**
     * Fetch flight details for a specific day
     * @param {string} date 'DDMMYYYY'
     */
    async fetchFlights(date) {
        const client = await this.getClient();
        const args = {
            UN: this.username,
            PSW: this.password,
            DD: date.substring(0, 2),
            MM: date.substring(2, 4),
            YY: date.substring(4, 8)
        };

        return new Promise((resolve, reject) => {
            client.FlightDetailsForFlightLegOnDay(args, (err, result) => {
                if (err) {
                    winston.error('AIMS fetchFlights error:', err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}

module.exports = new AimsService();
