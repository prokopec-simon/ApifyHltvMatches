import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';

await Actor.init();
const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new CheerioCrawler({
    proxyConfiguration,
    async requestHandler({ $ }) {
        const pageContent = $('html').html();
        await Actor.pushData({
            status: 200,
            data: [{ rawPageContent: pageContent }],
        });
    },
});

await crawler.run(['https://www.hltv.org/matches/']);
await Actor.exit();
