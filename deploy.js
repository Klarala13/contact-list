var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

var config = {
  user: "ftp_portfolio@clarasanchez.de",
  password: "ktfollen334@", // optional, prompted if none given
  host: "ftp.strato.de",
  port: 21,
  localRoot: __dirname + "/",
  remoteRoot: "/public_html/remote-folder/ContactList/build/index.html",
  include: ["*", "dist/*"],
  exclude: ["git", "node_modules"], // e.g. exclude sourcemaps - ** exclude: [] if nothing to exclude **
  deleteRemote: false, // delete ALL existing files at destination before uploading, if true
  forcePasv: true // Passive mode is forced (EPSV command is not sent)
};

// use with promises
ftpDeploy
  .deploy(config)
  .then(res => console.log("finished:", res))
  .catch(err => console.log(err));

// use with callback
ftpDeploy.deploy(config, function(err, res) {
  if (err) console.log(err);
  else console.log("finished:", res);
});
