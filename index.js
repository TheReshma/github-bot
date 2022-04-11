/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

 const SmeeClient = require('smee-client')

 const smee = new SmeeClient({
   source: process.env.WEBHOOK_PROXY_URL,
   target: 'http://localhost:3000/events',
   logger: console
 })
 
 const events = smee.start()
 
 // Stop forwarding events
 events.close()


module.exports = (app) => {
  
  app.log.info("Yay, the app was loaded!");
  
  app.on('pull_request.opened', receive);

  
    async function receive(context) {

      const name = String(context.payload.pull_request.user.login);
      const nameUrl = String(context.payload.pull_request.user.url);
      const prBody = String(context.payload.pull_request.body).trim();
      const prLink = String(context.payload.pull_request.html_url);

      const keywords = prBody.split(' ',6);
      const essential = keywords[0];
      const tribe = keywords[1];
      const space = keywords[2];
      const taskId = keywords[3];
      const userId = keywords[4];

      const comment = "Hey ["+name+"]("+nameUrl+"), your [Pull Request]("+prLink+") has been received by Spect!";

      // axios.post(`https://tribes.spect.network/tribe/${tribe}/space/${space}/${taskId}`, {
      //   nameUrl: nameUrl,
      //   userId: userId,
      //   prLink: prLink
      // })
      // .then(function (response) {
      //   console.log(response);
      //   if(response.status == 200){
      //     comment = "Hey ["+name+"]("+nameUrl+"), your [Pull Request]("+prLink+") has been received by Spect!";
      //   }else{
      //     comment = "Hey ["+name+"]("+nameUrl+"), it looks like there's some issue with updating your progress";
      //   }
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      if(essential == "Spect"){
        const issueComment = context.issue({
          body: comment,
        });
        context.log.info(comment);
        return context.octokit.issues.createComment(issueComment);
        } 
      }
    };

  

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/




