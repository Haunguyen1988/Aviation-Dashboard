const supabase = require('../config/supabase');

exports.authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Missing authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            throw new Error('Invalid token');
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: ' + error.message });
    }
};
