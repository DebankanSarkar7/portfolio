const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ==================== Embedded LinkedIn Data ====================
const linkedInData = {
    profile: {
        firstName: 'Debankan',
        lastName: 'Sarkar',
        headline: 'Data Engineer @TCS | AWS | ETL | Sharing Insights through Technical Blogs',
        summary: 'Data Engineer with 1.2 years of IT experience in designing and developing end-to-end ETL data pipelines using AWS. At TCS, I focus on engineering data pipelines that handle massive data volumes with speed and precision. I specialize in boosting system throughput and increasing data flow speed, while simultaneously identifying opportunities for pipeline optimization and cost reduction.Key areas :• 1+ year of experience contributing to the architecture, design, and end-to-end delivery of enterprise-scale cloud data platforms on AWS.• Strong hands-on experience implementing big data solutions using PySpark, AWS Glue, AWS Lambda, DynamoDb and Step Functions.• Contributed to the full lifecycle delivery of large-scale data engineering solutions.• Deep understanding of data requirements within the Insurance and Wealth Management sectors.Let\'s connect to talk about data pipelines, cloud efficiency, or the latest in the data space !',
        location: 'Kolkata, West Bengal, India',
        website: 'https://medium.com/@debankansarkar',
        industry: 'Technology, Information and Internet'
    },
    positions: [
        {
            company: 'Tata Consultancy Services',
            title: 'Data Engineer',
            description: '• Designed and developed enterprise-scale data platforms on AWS using S3, Lambda, Glue, and Python\n• Integrated diverse business platforms into centralized cloud data platforms through robust ETL pipelines\n• Optimized SQL databases for downstream API and application consumption, improving data accessibility\n• Implemented real-time data pipelines using PySpark, AWS DMS, SQS, CloudWatch, DynamoDB, and RDS\n• Conducted comprehensive data analysis to design cost-effective, high-performance data pipelines',
            location: 'Kolkata',
            startDate: 'Apr 2025',
            endDate: 'Present'
        }
    ],
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
    ],
    education: [
        {
            school: 'Bengal Institute Of Technology',
            degree: 'Bachelor of Technology - B.Tech',
            startDate: '2020',
            endDate: '2024'
        }
    ],
    languages: [
        {
            name: 'English',
            proficiency: 'Professional working proficiency'
        },
        {
            name: 'Bengali',
            proficiency: 'Native or bilingual proficiency'
        }
    ]
};

function getLinkedInData() {
    return linkedInData;
}

app.get('/api/projects', (req, res) => {
    res.json([
        { id: 1, title: 'Cloud Architecture Design', tech: 'AWS' },
        { id: 2, title: 'ETL Pipeline Automation', tech: 'Python & SQL' },
        { id: 3, title: 'AI Model Implementation', tech: 'LLMs' }
    ]);
});

function fetchMediumStories(username, maxItems = 8) {
    const feedUrl = `https://medium.com/feed/@${username}`;
    const techTags = ['devops', 'cloud', 'automation', 'azure', 'aws', 'agile', 'software-development', 'programming', 'engineering', 'tech', 'data', 'pipeline', 'kubernetes', 'docker'];
    const enduranceTags = ['endurance', 'running', 'cycling', 'fitness', 'training', 'marathon', 'athletic'];

    return new Promise((resolve, reject) => {
        https.get(feedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                Accept: 'application/rss+xml, application/xml'
            }
        }, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                const items = [];
                const matches = [...data.matchAll(/<item>([\s\S]*?)<\/item>/gi)];

                function extractTag(text, tag) {
                    const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i');
                    const result = text.match(regex);
                    return result ? result[1].trim() : '';
                }

                function extractAllTags(text, tag) {
                    const regex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'gi');
                    const matches = [];
                    let match;
                    while ((match = regex.exec(text)) !== null) {
                        const trimmed = match[1].trim();
                        if (trimmed.length > 0) {
                            matches.push(trimmed);
                        }
                    }
                    return matches;
                }

                function cleanHtml(value) {
                    return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
                }

                function categorizePost(categories) {
                    const tagsLower = categories.map(c => c.toLowerCase());
                    const isTech = tagsLower.some(t => techTags.includes(t));
                    const isEndurance = tagsLower.some(t => enduranceTags.includes(t));
                    if (isTech && !isEndurance) return 'tech';
                    if (isEndurance && !isTech) return 'endurance';
                    if (isTech && isEndurance) return 'both';
                    return 'uncategorized';
                }

                matches.slice(0, maxItems).forEach((match) => {
                    const itemXml = match[1];
                    const title = extractTag(itemXml, 'title') || 'Untitled story';
                    const link = extractTag(itemXml, 'link') || `https://medium.com/@${username}`;
                    const pubDateRaw = extractTag(itemXml, 'pubDate');
                    const pubDate = pubDateRaw ? new Date(pubDateRaw).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
                    const descriptionRaw = extractTag(itemXml, 'description') || extractTag(itemXml, 'content:encoded') || '';
                    const description = cleanHtml(descriptionRaw).slice(0, 135).trim();
                    const categories = extractAllTags(itemXml, 'category');
                    const category = categorizePost(categories);

                    items.push({ title, link, pubDate, description: description.length ? description + '...' : 'Read more on Medium.', category, tags: categories });
                });

                resolve(items);
            });
        }).on('error', reject);
    });
}

app.get('/api/medium', async (req, res) => {
    try {
        const items = await fetchMediumStories('debankansarkar', 4);
        res.json({ items });
    } catch (error) {
        console.error('Medium fetch error:', error);
        res.status(500).json({ error: 'Unable to fetch Medium stories' });
    }
});

app.get('/api/linkedin', (req, res) => {
    try {
        const data = getLinkedInData();
        res.json(data);
    } catch (error) {
        console.error('LinkedIn data error:', error);
        res.status(500).json({ error: 'Unable to load LinkedIn data' });
    }
});

app.get('/api/linkedin/profile', (req, res) => {
    try {
        const data = getLinkedInData();
        res.json(data.profile);
    } catch (error) {
        console.error('LinkedIn profile error:', error);
        res.status(500).json({ error: 'Unable to load profile' });
    }
});

app.get('/api/linkedin/experience', (req, res) => {
    try {
        const data = getLinkedInData();
        res.json({ positions: data.positions });
    } catch (error) {
        console.error('LinkedIn experience error:', error);
        res.status(500).json({ error: 'Unable to load experience' });
    }
});

app.get('/api/linkedin/skills', (req, res) => {
    try {
        const data = getLinkedInData();
        res.json({ skills: data.skills });
    } catch (error) {
        console.error('LinkedIn skills error:', error);
        res.status(500).json({ error: 'Unable to load skills' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});