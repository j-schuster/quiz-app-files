import React from 'react'
import { NavigationActions } from 'react-navigation'
import { orange, white } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import SubmitButton from './SubmitButton'

import { StyleSheet, 
		 View,
		 TouchableOpacity,
		 TextInput,
		 KeyboardAvoidingView,
		 Text  } from 'react-native'

class AddCard extends React.Component {

	state = {
		question: '',
		answer: '',
		correctAnswer: ''
	}

	submitCard = (deck) => {
		const { question, answer, correctAnswer } = this.state

		if(question && answer){
			this.props.dispatch(addCard({ question, answer, correctAnswer, deck }))
			addCardToDeck(deck, { question, answer, correctAnswer })
			this.setState({ question: '', answer: '', correctAnswer: ''})
			this.props.navigation.dispatch(NavigationActions.back({ key: null }))
		}
	}

	render(){
		const deckName = this.props.navigation.state.params.entryId

		return(
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<View style={styles.container}>
					<Text style={styles.title}>What is the question?</Text>
					<TextInput style={styles.input}
							   onChangeText={(question) => this.setState({question})}
							   value={this.state.question}
					></TextInput>

					<Text style={styles.title}>What is the answer?</Text>
					<TextInput style={styles.input}
							   onChangeText={(answer) => this.setState({answer})}
							   value={this.state.answer}
					></TextInput>

					<Text style={styles.title}>Is this true or false?</Text>
					<TextInput style={styles.input}
							   onChangeText={(correctAnswer) => this.setState({correctAnswer})}
							   value={this.state.correctAnswer}>
					</TextInput>

					<SubmitButton style={styles.submitBtn} onPress={() => this.submitCard(deckName)}/>

				</View>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	title: {
		fontSize: 30,
		color: '#333',
	},
	submitBtn: {
		borderWidth: 0.5,
		borderColor: '#d6d7da',
		padding: 10,
		backgroundColor: orange,
		borderRadius: 7,
		overflow: 'hidden'
	},
	input: {
		width: 250,
		height: 40,
		padding: 8,
		borderWidth: 1,
		borderColor: '#757575',
		margin: 20,
		borderRadius: 7
	}
})

export default connect()(AddCard)




























