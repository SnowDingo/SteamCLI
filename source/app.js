import React, { useState } from 'react';
import {Text,Box, Newline, useApp, useInput} from 'ink';
import BigText from 'ink-big-text';
import Spinner from 'ink-spinner';
import TextInput from 'ink-text-input';
import { Alert, MultiSelect, Select } from '@inkjs/ui';


export default function App() {

	const {exit} = useApp();

	const [option, setOption] = useState(101)

	const [api, setAPI] = useState("")
	
	// A textfield related stuff yay!
	const [inputval, setInputValue] = useState("")


	const UserInput = () => {
		useInput((input, key) => {
			if(input == 'x'){
				if(option==2){
					setOption(100)
					setInputValue("")
				}
			}
			if(key.return && option == 101){
				setOption(100)
			}
		})
	}

	return (
		<Box flexDirection='column'>
			<UserInput />
			<Text color={"cyan"}><BigText colors={"red"} text='STEAM-CLI'></BigText></Text>
			<Text>A cli app to use steam API</Text>
		<Newline />

		<Text color={'yellow'}>Please type in /help to see all the available commands</Text>
		<Newline />
		{(option == 101)?<>
			<Text color={"white"}>Please enter the Steam API key <Text color={"red"}>Note: You have to retype this in future uses</Text> </Text>
					<Box borderStyle={"round"} borderColor={"white"}>
					<TextInput value={api}  onChange={(e) => {
						setAPI(e)
					}} placeholder='Enter the Steam API key'></TextInput>
					</Box>
		</>:<>
			{(option ==100)?<>
			<Text color={"redBright"}> Your steam API key: {api} </Text>
				<Newline/>
				<Newline />
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
					}else if(e=1){
						
					}
				}}

				
			>

				
			</Select>
		</Box>
		</>:<>
				{option == 1?<>
					<Text>Please enter the name of the game {api} </Text>
				</>:<>
				{option ==2?<>

					<Text color={"white"}>Please enter the user name. <Text color={"red"}>Note: This has to be public profile</Text> </Text>
					<Box borderStyle={"round"} borderColor={"white"}>
					<TextInput value={inputval}  onChange={(e) => {
						setInputValue(e)
					}} placeholder='Enter the Steam username'></TextInput>
					</Box>
				</>:<></>}
				</>}
		</> }
		
		</>}
	</Box>
	)}