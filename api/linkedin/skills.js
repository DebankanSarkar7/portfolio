const linkedInData = {
    skills: [
        'Amazon Athena',
        'AWS Lambda',
        'Extract, Transform, Load (ETL)',
        'SQL',
        'Amazon S3',
        'Data Engineering',
        'PySpark',
        'Amazon Web Services (AWS)',
        'Software Development',
        'Git',
        'Computer Science',
        'Python (Programming Language)',
        'Operating Systems',
        'Networking',
        'Engineering',
        'Communication',
        'English'
    ]
};

module.exports = async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        res.json({ skills: linkedInData.skills });
    } catch (error) {
        console.error('LinkedIn skills error:', error);
        res.status(500).json({ error: 'Unable to load skills' });
    }
}