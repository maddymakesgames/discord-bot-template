import { Client } from '../types/types';

const ready = (_client: Client) => {
	console.timeEnd('Start Up');
	console.log('Finished start up');
};

module.exports = {run:ready, name:'ready'};