import React from 'react'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Animated } from 'react-native'
import { orange, white, purple, red, green } from '../utils/colors'
import { SubmitButton } from './SubmitButton'
import { connect } from 'react-redux'
import ActionButton from './ActionButton'
import { Info } from './Info.js'


class Quiz extends React.Component {

	state={
		questionNumber: 0,
		showQuestion: false,
		correct: 0,
		incorrect: 0,
		animation: new Animated.Value(0.5),
		rotate: new Animated.Value(0),
		colorChange: new Animated.Value(0)
	}

showAnswer = () => (
	!this.state.showQuestion ? this.setState({ showQuestion: true })
	: this.setState({ showQuestion: false })
)

submitAnswer = (answer) => {

	this.handleAnimation()

	const { questionNumber } = this.state
	const deck = this.props.navigation.state.params.entryId
	const decks = this.props.decks
	const correct = decks[deck].questions[questionNumber].correctAnswer.toLowerCase()

	if(answer.trim() === correct.trim()){
		this.setState({ correct: this.state.correct + 1 })
	}else {
		this.setState({ incorrect: this.state.incorrect + 1 })
	}
	this.setState({ questionNumber: this.state.questionNumber + 1, showQuestion: false })

}

handleAnimation = () => {
	Animated.spring(this.state.animation, {
			toValue: 1.1,
			friction: 2,
			tension: 360,
			duration: 1000
		}).start(() => {
			Animated.spring(this.state.animation, {
				toValue: 1,
				duration: 100
			}).start()

		})


	Animated.timing(this.state.rotate, {
			toValue: 360,
			duration: 1500,
			delay: 1000
		}).start(() => {
			Animated.timing(this.state.rotate, {
				toValue:  0,
				duration: 1000
			}).start()
		})
	
	Animated.timing(this.state.colorChange, {
			toValue: 1,
			duration: 1500,
		}).start(() => {
			Animated.timing(this.state.colorChange, {
				toValue: 0,
				duration: 1500
			}).start()
		})

}


	replayQuiz = () => {
			this.setState({
				questionNumber: 0, 
				showQuestion: false,
				correct: 0,
				incorrect: 0,
			})
		}

	goBack = () => {
		this.props.navigation.dispatch(NavigationActions.back({ key: null }))
	}	


	render(){
		const questionNumber = this.state.questionNumber
		const decks = this.props.decks
		const deck = this.props.navigation.state.params.entryId
		const number = this.state.questionNumber + 1


		const animatedStyle = {
			transform: [
				{ scale: this.state.animation }
			]
		}


		const rotateInterpolate = this.state.rotate.interpolate({
			inputRange: [0, 360],
			outputRange: ["0deg", "1080deg"]
		})

		const rotateStyles = {
			transform: [
				{
					rotate: rotateInterpolate
				}
			]
		}

		const boxInterpolation = this.state.colorChange.interpolate({
			inputRange: [0,1],
			outputRange: ["rgba(242, 111, 40, 1)", "rgba(185, 63, 179, 1)"]
		})

		const boxAnimation={
			backgroundColor: boxInterpolation
		}

		if(questionNumber === decks[deck].questions.length){
			return (
				<View style={styles.container}>
					<Animated.View style={[styles.card, boxAnimation]}>

					<Animated.View style={animatedStyle}>
						<Text style={styles.mainText}>You got {this.state.correct} out of {decks[deck].questions.length} !</Text>
					</Animated.View>

						{this.state.correct > this.state.incorrect ?  <Animated.View style={rotateStyles}><Text style={{fontSize: 90}}>🕺</Text></Animated.View>
						: <Animated.View style={rotateStyles}><Text style={{fontSize: 90}}>😭😭😭</Text></Animated.View>}

						<View>
							<ActionButton styles={styles} text={'TryAgain'} color={red} onPress={this.replayQuiz}/>
							<ActionButton styles={styles} text={'Back'} color={green} onPress={this.goBack}/>
						</View>
					</Animated.View>
				</View>
			)
		}
		return(
			<View style={styles.container}>
				<View style={styles.card}>
					<Text style={styles.questions}>{number} / {decks[deck].questions.length}</Text>

					{!this.state.showQuestion ? <Text style={styles.mainText}>{decks[deck].questions[questionNumber].question}</Text>
					 : <Text style={styles.mainText}>{decks[deck].questions[questionNumber].answer}</Text>}

					{!this.state.showQuestion ? <Info style={styles.answer} text={'Show Answer'} onPress={this.showAnswer}></Info>
					: <Info style={styles.answer} text={'Show Question'} onPress={this.showAnswer}></Info>}

					<View>
						<ActionButton color={green} styles={styles} text={'Correct'} onPress={() => this.submitAnswer('true')}/>
						<ActionButton color={red} styles={styles} text={'Incorrect'} onPress={() => this.submitAnswer('false')}/>
					</View>
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