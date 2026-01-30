class ValidationService {
    validateFlightRow(row) {
        const errors = [];

        if (!row.Flight_ID) errors.push('Flight_ID is required');
        if (!row.Tail_Number) errors.push('Tail_Number is required');
        if (!row.STD) errors.push('STD is required');
        if (!row.ATA) errors.push('ATA is required');

        // Temporal validation
        if (row.ATA && row.ATD) {
            const ata = new Date(row.ATA);
            const atd = new Date(row.ATD);
            if (ata < atd) errors.push('ATA cannot be before ATD');
        }

        return { valid: errors.length === 0, errors };
    }
}

module.exports = ValidationService;
