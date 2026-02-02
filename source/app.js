import React, { useState } from 'react';
import {Text,Box, Newline} from 'ink';
import BigText from 'ink-big-text';
import Spinner from 'ink-spinner';
import TextInput from 'ink-text-input';
import { Alert } from '@inkjs/ui';

export default function App() {

	const [todo, setTodo] = useState("")
	const [previous, setPrevious] = useState("")
	const [submitted, setSubmitted] = useState(false)
	return (
		<Box flexDirection='column'>
			<Text color={"cyan"}><BigText colors={"red"} text='STEAM-CLI'></BigText></Text>
			<Text>A cli app to use steam API</Text>
		<Newline />

		<Text color={'yellow'}>Please type in /help to see all the available commands</Text>
		{/* <Box>
			{submitted?<Alert variant='success'>Created {previous}</Alert>:<></>}
		</Box> */}
		</Box>
	);
}
