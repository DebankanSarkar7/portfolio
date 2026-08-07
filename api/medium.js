const https = require('https');

const techTags = ['devops', 'cloud', 'automation', 'azure', 'aws', 'agile', 'software-development', 'programming', 'engineering', 'tech', 'data', 'pipeline', 'kubernetes', 'docker'];
const enduranceTags = ['endurance', 'running', 'cycling', 'fitness', 'training', 'marathon', 'athletic'];

function fetchMediumStories(username, maxItems = 8) {
    const feedUrl = `https://medium.com/feed/@${username}`;

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
        const items = await fetchMediumStories('debankansarkar', 4);
        res.json({ items });
    } catch (error) {
        console.error('Medium fetch error:', error);
        res.status(500).json({ error: 'Unable to fetch Medium stories' });
    }
}