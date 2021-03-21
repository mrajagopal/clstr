#!/usr/bin/env node

const cluster = require('cluster')
// const app = require('./app')

// Just for a test (for those without express)
function workerProcessSimple() {
	console.log('I am too lazy to do anything');	
}


// The default scheduling policy on Unix is cluster.SCHED_RR (Round Ronin)
// On windows, it try to chanve to RR if possible.
cluster.schedulingPolicy = cluster.SCHED_RR;
if(cluster.isMaster){
  var cpuCount = require('os').cpus().length;
  for(var i = 0; i < cpuCount; i++){
    cluster.fork();
  }
}
else{
  // app(cluster);
  workerProcessSimple();
}

cluster.on('fork', function(worker){
  console.log('forked->Worker %d', worker.id);
});
