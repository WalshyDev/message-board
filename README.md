# Message board

This is an example application of using D1 in [Cloudflare Pages](https://pages.dev).

## Setup

1. Fork this repository
2. Create a D1 database with `npx wrangler d1 create message-board`
3. Run the migrations with `npx wrangler d1 migrations apply message-board`
4. Go to the Cloudflare dashboard and create a Pages project pointing to the repository - https://dash.cloudflare.com?to=/:account/pages/new
5. Head over to "Settings" -> "Functions" and bind your D1 database to `DB`
    !["message-board" database bound to D1 in the Pages dashboard](https://i.walshy.dev/1676343927.png#df84fd6b3947c342435cb50052a63b0a43b4726b420b114691be418da0304e5b)
6. Trigger a new deployment and enjoy the demo!
