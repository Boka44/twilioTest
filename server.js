const express = require('express');
const app =express();

const accountSid = process.env.EnvAccountSid;
const authToken = process.env.EnvAuthToken;
const client = require('twilio')(accountSid, authToken);
const twilio = require('twilio');
const PORT = process.env.PORT || 3000;
const VoiceResponse = require('twilio').twiml.VoiceResponse;

client.calls.create(
  {
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: '+13109999634',
    from: '+16572206273',
  },
  (err, call) => {
    process.stdout.write(call.sid);
  }
);

app.post('/voice', (req, res, next) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new twilio.TwimlResponse();
  twiml.say('Happy birthday Radshack! You beautiful bastard you.', { voice: 'alice' });

  // Render the response as XML in reply to the webhook request
  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/sms', (req, res, next) => {
  const twiml = new MessagingResponse();

  twiml.message('Happy birthday Gianni, and may your first child be a masculine child.');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
app.listen(PORT, () => {
	console.log("Server is running n port " + PORT);
};