import {runMonteCarlo} from './advanced-model.js';
self.onmessage=e=>{const {jobId,workspace}=e.data;try{const results=runMonteCarlo(workspace,progress=>self.postMessage({jobId,progress}));self.postMessage({jobId,results});}catch(err){self.postMessage({jobId,error:err.message});}};
