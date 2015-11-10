var express = require('express');
var expr = express();
var cluster = undefined; 


app.prototype.processDefReq = function processDefReq(req, resp)
//function processDefReq(req, resp)
{
  console.log('Worker %d started!'+new Date(), this.cluster.worker.id);
  for(var i = 0; i < 999999999; i++){}
  resp.end('Hello from worker ' + this.cluster.worker.id);
  console.log('Worker %d returned!'+new Date(), this.cluster.worker.id);
}

app.prototype.startup = function startup()
//function startup()
{
//  console.log(this.cluster);
//  console.log(this);
  console.log('application started! Worker %d started!, process %d', this.cluster.worker.id, this.cluster.worker.process.pid);
}

function app(clstr)
{
  if(!(this instanceof app))
  {
    return new app(clstr);
  }
//  console.log('app function: ', clstr);
  this.cluster = clstr;
  expr.get('/', this.processDefReq.bind(this));
  expr.listen(8080, this.startup.bind(this));
}

module.exports = app; 
