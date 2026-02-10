import React, {useEffect, useState} from 'react';
import {Text, Box, Newline, useApp, useInput} from 'ink';
import BigText from 'ink-big-text';
import Spinner from 'ink-spinner';
import TextInput from 'ink-text-input';
import {Alert, MultiSelect, Select} from '@inkjs/ui';
import Link from 'ink-link';
import { fetchSteamID, getUserData } from './api';

// So here are some of the basic structure for this app
// There is an useState variable called option that tracks the state
/*
	101-> Input the API Key
	100->Menu
	1->Enter the user name
	105->Calling APIs
	200->Display results

*/

export default function App() {
	const {exit} = useApp();

	const [option, setOption] = useState(101);

	const [api, setAPI] = useState('');

	// A textfield related stuff yay!
	const [inputval, setInputValue] = useState('');

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("")

	const [result, setResult] = useState()
	// useEffect
	useEffect(()=> {
		if (option !== 105) {
			return;
		}
		const runfunc = async() => {

		try{
			// if the user hasn't done all the required steps just go back
		
		setLoading(true);
		const id = await fetchSteamID(api, inputval)
		if(id==0){
			setError("User not found!")
			setOption(100);

		}else{
			const result = await getUserData(api,id)
			if(result !=null){
				setResult(result);
				setOption(200)
			}else{
				setError("Couldn't fetch the user data")
				setOption(100)
			}
		}
	}finally{
		setLoading(false)
	}
		}
		runfunc();
		
	}, [option]);

	const UserInput = () => {
		useInput((input, key) => {
			if (input == 'x') {
				if (option == 2) {
					setOption(100);
					setInputValue('');
				} else if (option == 1) {
					setOption(100);
					setInputValue('');
				}
			}
			if (key.return) {
				if (option == 101) {
					setOption(100);
				} else if (option == 1) {
					setOption(105);
				}
			}
		});
		return null;
	};

	return loading ? (
		<Box>
			<Text>Loading results...</Text>
			<Spinner />
		</Box>
	) : (
		(option == 200)?<>
		<Box>
			<Text>{result.personaname}</Text>
			<Text>{result.personastate}</Text>
			<Text>Results!</Text>
		</Box>
		
		</>:<>
			<Box flexDirection="column">
				<UserInput />
				<Text color={'cyan'}>
					<BigText colors={'red'} text="STEAM-CLI"></BigText>
				</Text>
				<Text>A cli app to use steam API</Text>
				<Text>{error}</Text>
				<Newline />

				<Text color={'yellow'}>
					Please type in /help to see all the available commands
				</Text>
				<Newline />
				{option == 101 ? (
					<>
						<Text color={'white'}>
							Please enter the Steam API key{' '}
							<Text color={'red'}>
								Note: You have to retype this in future uses.
								<Newline /> You can get your own Steam API Keys{' '}
								<Link url="https://steamcommunity.com/dev/apikey">
									here
								</Link>{' '}
							</Text>{' '}
						</Text>
						<Box borderStyle={'round'} borderColor={'white'}>
							<TextInput
								mask='*'
								value={api}
								onChange={e => {
									setAPI(e);
								}}
								placeholder="Enter the Steam API key"
							></TextInput>
						</Box>
					</>
				) : (
					<>
						{option == 100 ? (
							<>
								<Box>
									<Select
										options={[
											{
												label: 'Search for a user',
												value: 1,
											},
											{
												label: 'exit',
												value: 99,
											},
										]}
										onChange={e => {
											setOption(e);
											if (e == 99) {
												exit();
											} else if (e == 1) {
											}
										}}
									></Select>
								</Box>
							</>
						) : (
							<>
								<>
									{option == 1 ? (
										<>
											<Text color={'white'}>
												Please enter the user name.{' '}
												<Text color={'red'}>
													Note: This has to be public profile
												</Text>{' '}
											</Text>
											<Box borderStyle={'round'} borderColor={'white'}>
												<TextInput
													value={inputval}
													onChange={e => {
														setInputValue(e);
													}}
													placeholder="Enter the Steam username"
												></TextInput>
											</Box>
										</>
									) : (
										<></>
									)}
								</>
							</>
						)}
					</>
				)}
			</Box>
		</>)}
		
