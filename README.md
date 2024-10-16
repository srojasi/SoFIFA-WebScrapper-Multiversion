### Multiversion SoFIFA Players Data

Collected from [sofifa.com](https://sofifa.com).
Keep in mind that the above full players data won't always be up-to-date.

If you would like to download the latest data, you can do so by cloning the repo and running the script locally. 
Be mindful that the job will take about 2.5 hours. There is a 300ms delay on each request to avoid Cloudfare rate limitting on sofifa.com.

To run the project locally, follow the instructions below.
Node (version `18.12.1`) and npm (version `9.3.1`) were used during development.

```
git clone https://github.com/srojasi/SoFIFA-WebScrapper-Multiversion
cd sofifa-web-scraper
npm install

# to download test urls and players (useful for testing setup)
npm run download-urls-test
npm run test

# to download all the 18k+ urls and players (takes ~2.5 hours)
npm run download-urls
npm run full
```

### Sample Run
```
prashantghimire@Prashants-MBP sofifa-web-scraper % npm run full

> sofifa-web-scraper@1.0.0 full
> node main.js full

running full scan.
1-https://sofifa.com/player/239085/erling-haaland/240047/
2-https://sofifa.com/player/231747/kylian-mbappe/240047/
3-https://sofifa.com/player/192985/kevin-de-bruyne/240047/
4-https://sofifa.com/player/231866/rodrigo-hernandez-cascante/240047/
5-https://sofifa.com/player/202126/harry-kane/240047/
.
.
.
18722-https://sofifa.com/player/277344/eanna-fitzgerald/240047/
18723-https://sofifa.com/player/272761/jiaqiang-lyu/240047/
18724-https://sofifa.com/player/71064/ishaan-shishodia/240047/
18725-https://sofifa.com/player/269541/yuhang-wu/240047/
18726-https://sofifa.com/player/277493/fredy-chawngthansanga/240047/
scan complete: 2:23:31.926 (h:mm:ss.mmm)
```

#### Players Data

```
import pandas as pd
pd.read_csv('./player-data-full.csv', index_col=['player_id'])
```

<img src="images/player_data.png"  alt="Basic"/>

### Version

To get players from different versions of FIFA, only change the constant `SOFIFA_VERSION` in the `player-urls-loader.js`.

The supported versions is the ones defined by SoFIFA, given by the `r` parameter in the address bar of the SoFIFA webpage.
