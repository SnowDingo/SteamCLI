import React, { useState } from 'react';
import {Text,Box, Newline, useApp} from 'ink';
import BigText from 'ink-big-text';
import Spinner from 'ink-spinner';
import TextInput from 'ink-text-input';
import { Alert, MultiSelect, Select } from '@inkjs/ui';



export default function App() {

	const {exit} = useApp();

	const [option, setOption] = useState(100)
	return (
		<Box flexDirection='column'>
			<Text color={"cyan"}><BigText colors={"red"} text='STEAM-CLI'></BigText></Text>
			<Text>A cli app to use steam API</Text>
		<Newline />

		<Text color={'yellow'}>Please type in /help to see all the available commands</Text>
		<Box>
			<Select
				options={[
					{
						label:"Search for a game",
						value:1,
					},
					{
						label:"Search for a user",
						value:2,
					},
					{
						label:"exit",
						value:99,
					}
				]}

				onChange={(e) => {
					setOption(e)
					if(e ==99){
						exit();
					}
				}}

				
			>

				
			</Select>
		</Box>
		{/* <Box>
			{submitted?<Alert variant='success'>Created {previous}</Alert>:<></>}
		</Box> */}
		</Box>
	);
}
