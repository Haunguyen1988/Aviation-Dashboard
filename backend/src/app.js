const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/upload', require('./routes/uploadRoutes')); 
// Re-enable upload routes after confirming they work with Supabase Storage logic
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/kpi', require('./routes/kpiRoutes'));
app.use('/api/charts', require('./routes/chartRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
