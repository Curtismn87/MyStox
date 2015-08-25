user stories
• as a user I want to select specific stocks/funds to follow
• ... un-follow selected stocks
• ... select an index of all stocks/funds
• ... select timeframe of prices(YTD, 1w, 1m, 1y, start/end)
• ... graph values of selected stocks
• ... user authentication (with signup/login/logout/sessions)
• ... search for a stock ticker/name by ticker/name
• ... view a single stock page with detailed info
• ... have a profile page for my personal data
• ... see algorithm outputs (predictive indexes) over time (e.g. Bollinger Bands)
• ... create watch lists (stocks to buy, stocks to sell, stocks owned)
• ... view world data: exchange rates, gnps, big mac index, waffle house index
• ... view events (CNN, twitter, AP, etc.)

ERD
stocks
• stockID
• symbol
• name
• data...

history
• historyID
• stockID
• date
• value
• data...

news
• newsID
• date
• title
• content
• stockID

twitter
• twitterID
• stockID
• date
• hashtag
• text
