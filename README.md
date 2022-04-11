### GitHub bot for spect.network

> A GitHub App built with [Probot](https://github.com/probot/probot) 

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Environment variables

Go to [https://smee.io/](https://smee.io/) and start a new channel. Copy the Webhook Proxy URL, that's ```WEBHOOK_PROXY_URL```

Navigate to [GitHub Developer Settings](https://github.com/settings/apps) and create an app. Create a webhook secret. You'll get the ```APP_ID``` & ```WEBHOOK_SECRET``` .

Under [Personal Access Tokens](https://github.com/settings/tokens), you can generate a new Token to access the GitHub API. Save the ```.pem``` file in the working directory.

## Documentation

[Webhook Events and Payloads](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads)

[Octokit Webhooks](https://github.com/octokit/webhooks.js#webhook-events)

[Probot](https://probot.github.io/docs/webhooks/)

[Smee Client](https://github.com/probot/smee-client)
