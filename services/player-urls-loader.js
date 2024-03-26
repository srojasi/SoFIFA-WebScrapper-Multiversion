const {getPageContent} = require('./scraper');
const cheerio = require('cheerio');
const fs = require('fs');

const SOFIFA_BASE_URL = 'https://sofifa.com';
const PLAYER_IDS_FILENAME = './files/player-urls-full.csv';
const PLAYER_IDS_SOFIFA_URL = `https://sofifa.com/players?col=oa&sort=desc&offset=`;

/**
 * This method gets all the players' page urls from sofifa.com
 * @returns {Promise<void>}
 */
async function loadPlayerUrlsFile() {
    fs.writeFileSync(PLAYER_IDS_FILENAME, '');
    let currentOffset = 0;
    while (true) {
        let content = await getPageContent(PLAYER_IDS_SOFIFA_URL + currentOffset);
        const $ = cheerio.load(content);
        const playerListTable = $('main article table tbody tr');
        const players = playerListTable
            .map((i, e) => SOFIFA_BASE_URL + $(e).find('td a').attr('href'))
            .get();
        const playerIds = players.join('\n') + '\n';
        fs.appendFileSync(PLAYER_IDS_FILENAME, playerIds);
        const hasNextPath = $('.pagination a').text().includes('Next');
        if (!hasNextPath) {
            console.log('does not have next page. stopping scanning now.');
            break;
        }
        currentOffset += 60;
        console.log(`downloaded player urls count=${currentOffset}`);
    }
}

module.exports = {
    loadPlayerUrlsFile
};