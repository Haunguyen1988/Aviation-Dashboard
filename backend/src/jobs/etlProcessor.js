const Queue = require('bull');
const FileParser = require('../services/fileParser');
const ValidationService = require('../services/validationService');
const { Flight, AircraftSwap, CrewPairing, ETLAuditLog } = require('../models');

const etlQueue = new Queue('etl processing', process.env.REDIS_URL || 'redis://localhost:6379');

etlQueue.process('flight-upload', async (job) => {
    const { filePath, fileName } = job.data;
    const parser = new FileParser();
    const validator = new ValidationService();

    let processed = 0, inserted = 0, updated = 0, rejected = 0;

    try {
        // Parse file
        // Determine type by extension (simple check)
        let rows;
        if (filePath.endsWith('.csv')) {
            rows = await parser.parseCSV(filePath);
        } else {
            rows = await parser.parseExcel(filePath);
        }

        for (const row of rows) {
            processed++;

            // Validate
            const validation = validator.validateFlightRow(row);
            if (!validation.valid) {
                rejected++;
                continue;
            }

            // Check for existing record (deduplication)
            const flightDate = row.Flight_Date; // Ensure format matches DB

            const existing = await Flight.findOne({
                where: {
                    flight_id: row.Flight_ID,
                    flight_date: flightDate
                }
            });

            const data = {
                flight_id: row.Flight_ID,
                flight_date: flightDate,
                tail_number: row.Tail_Number,
                ac_type: row.AC_Type,
                std: row.STD,
                sta: row.STA,
                atd: row.ATD,
                ata: row.ATA,
                origin: row.Origin,
                destination: row.Destination,
                commercial_ind: row.Commercial_Ind === 'Y'
            };

            if (existing) {
                await existing.update(data);
                updated++;
            } else {
                await Flight.create(data);
                inserted++;
            }
        }

        // Log audit
        await ETLAuditLog.create({
            file_name: fileName,
            records_processed: processed,
            records_inserted: inserted,
            records_updated: updated,
            records_rejected: rejected,
            status: 'SUCCESS'
        });

        return { success: true, processed, inserted, updated, rejected };
    } catch (error) {
        console.error("ETL Error:", error);
        await ETLAuditLog.create({
            file_name: fileName,
            records_processed: processed,
            records_inserted: inserted,
            records_updated: updated,
            records_rejected: rejected,
            status: 'FAILED',
            error_message: error.message
        });
        throw error;
    }
});

module.exports = etlQueue;
