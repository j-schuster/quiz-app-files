import React from 'react'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { orange, white, purple, red, green } from '../utils/colors'
import { SubmitButton } from './SubmitButton'
import { connect } from 'react-redux'
import ActionButton from './ActionButton'
import { Info } from './Info.js'


class Quiz extends React.Component {

	state={
		questionNumber: 0
	}

	render(){
		const questionNumber = this.state.questionNumber
		const decks = this.props.decks
		const deck = this.props.navigation.state.params.entryId
		const number = this.state.questionNumber + 1

		return(
			<View style={styles.container}>
				<View style={styles.card}>
					<Text style={styles.questions}>{number} / {decks[deck].questions.length}</Text>

					<Text style={styles.mainText}>{decks[deck].questions[questionNumber].question}</Text>

					<Info style={styles.answer} text={'Show Answer'}></Info>

					<ActionButton color={green} styles={styles} text={'Correct'}/>
					<ActionButton color={red} styles={styles} text={'Incorrect'}/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center',
		alignItems: 'center'
	},
	iosBtn: {
   		padding: 10,
   	    borderRadius: 7,
   	    height: 45,
    	margin: 5,
    	width: 160  
  },
  	submitBtnText: {
    	color: white,
    	fontSize: 26,
    	textAlign: 'center',
  },
 	 questions: {
  		top: 0,
  		alignSelf: 'flex-start',
  		left: 0,
  		color: white,
  		fontSize: 20,
  		margin: 5,
  		position: 'absolute',
  },
  	answer: {
  		color: white,
  		fontSize: 20,
  		margin: 20,
  },
 	 card: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		margin: 10,
		backgroundColor: orange,
		alignSelf: 'stretch',
		borderRadius: 10,
		shadowColor: 'rgba(0,0,0,0.34)',
        shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 4,
      shadowOpacity: 1
	},
	mainText: {
		fontSize: 40,
		color: white,
		marginTop: 40,
		textAlign: 'center'
	}

})

function mapStateToProps(decks){
	return {
		decks
	}
}

export default connect(mapStateToProps)(Quiz)