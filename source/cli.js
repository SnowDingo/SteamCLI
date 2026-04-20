#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
		Usage
		  $ steamcli

		Options
			--help Show the help instruction for SteamCLI
			--ui   Open interactive UI
		Examples
		  $ steamcli --ui
		  Show the GUI
	`,
	{
		importMeta: import.meta,
		flags:{
			auth: {
			type:"boolean",
			shortFlag:"a"
			},
		}
	},
);

// First element goes to command, the second goes to arguments
const [command,...args]=cli.input;

if(!command || command == 'ui'){
	render(<App name={cli.flags.name} />);
}else if (command=='help'){
	cli.showHelp()
}else if(command == 'auth'){

}else{
	console.error("Unknown command. Please try again:");
}


