/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

 const axios = require('axios');
 const SmeeClient = require('smee-client')

 const smee = new SmeeClient({
   source: process.env.WEBHOOK_PROXY_URL,
   target: 'http://localhost:4000/events',
   logger: console
 })
 
 const events = smee.start()
 
 // Stop forwarding events
 events.close()


module.exports = (app) => {
  
  app.log.info("Yay, the app has loaded!");
  
  app.on('pull_request.opened', opened);

  const server_url = process.env.MORALIS_SERVER_ID ;
  const app_id = process.env.MORALIS_APPLICATION_ID;
  let comment ;
  
    async function opened(context) {

      const prhead = String(context.payload.pull_request.title).trim();
      const keywords = prhead.split(' ',2);
      const essential = keywords[0];
      const taskId = keywords[1];

      if (essential == "Spect"){

        const name = String(context.payload.pull_request.user.login);
        const nameUrl = String(context.payload.pull_request.user.url);
        const prLink = String(context.payload.pull_request.html_url);

        var data = {
          "updates":{
              "status": 200,
          }
        }

        var config = {
          method: 'get',
          url: `${server_url}/functions/updateCard?_ApplicationId=${app_id}&taskId=${taskId}&link=${prLink}&user=${name}`,
          data: data
        };

        await axios(config)
        .then(function (response) {
          console.log(response.data);
          if(response.status == 200){
            comment = "Hey ["+name+"]("+nameUrl+"), your [Pull Request]("+prLink+") has been received by Spect!";
          }else{
            comment = "Hey ["+name+"]("+nameUrl+"), it looks like there's some issue with updating your progress";
          }
        })
        .catch(function (error) {
          console.log(error);
        });

        const issueComment = context.issue({
          body: comment,
        });
        return context.octokit.issues.createComment(issueComment);
        } 
      }


  app.on('pull_request.merged', merged);

    async function merged(context) {

      const prhead = String(context.payload.pull_request.title).trim();
      const keywords = prhead.split(' ',2);
      const essential = keywords[0];
      const taskId = keywords[1];

      if (essential == "Spect"){

        var data = {
          "updates":{
              "status": 205
          }
        }

        var config = {
          method: 'get',
          url: `${server_url}/functions/updateCard?_ApplicationId=${app_id}&taskId=${taskId}&user=${name}`,
          data: data
        };

        await axios(config)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      } 
    }
};

  

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/

// const comment = "Hey ["+name+"]("+nameUrl+"), your [Pull Request]("+prLink+") has been received by Spect!"; 





