var cluster = require('cluster')
//var app = require('./app')
var app = require('./app')

cluster.schedulingPolicy = cluster.SCHED_RR;
if(cluster.isMaster){
  var cpuCount = require('os').cpus().length;
  for(var i = 0; i < cpuCount; i++){
    cluster.fork();
  }
}
else{
  app(cluster);
}

cluster.on('fork', function(worker){
  console.log('forked->Worker %d', worker.id);
});
