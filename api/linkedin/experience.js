const linkedInData = {
    positions: [
        {
            company: 'Tata Consultancy Services',
            title: 'Data Engineer',
            description: '• Designed and developed enterprise-scale data platforms on AWS using S3, Lambda, Glue, and Python\n• Integrated diverse business platforms into centralized cloud data platforms through robust ETL pipelines\n• Optimized SQL databases for downstream API and application consumption, improving data accessibility\n• Implemented real-time data pipelines using PySpark, AWS DMS, SQS, CloudWatch, DynamoDB, and RDS\n• Conducted comprehensive data analysis to design cost-effective, high-performance data pipelines',
            location: 'Kolkata',
            startDate: 'Apr 2025',
            endDate: 'Present'
        }
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
        res.json({ positions: linkedInData.positions });
    } catch (error) {
        console.error('LinkedIn experience error:', error);
        res.status(500).json({ error: 'Unable to load experience' });
    }
}