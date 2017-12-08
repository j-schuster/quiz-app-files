import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getData } from '../utils/api' 
import { connect } from 'react-redux'
import { purple, white, red } from '../utils/colors'
import ActionButton from './ActionButton'

class DeckView extends React.Component {
	render(){
		const deck = this.props.navigation.state.params.entryId
		const { decks } = this.props

		return(
			<View style={styles.container}>
				<Text>{decks[deck].title}</Text>
				<Text>{decks[deck].questions.length}</Text>

				<ActionButton styles={styles} text={'Add Card'} color={purple}
	        		onPress={() => this.props.navigation.navigate('AddCard', { entryId: deck })}/>
	        	<ActionButton styles={styles} text={'Start Quiz'} color={red} 
	        		onPress={() => this.props.navigation.navigate('Quiz', { entryId: deck })}/>
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
		width: 170
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	}
})

function mapStateToProps(decks){
	return {
		decks
	}
}

export default connect(mapStateToProps)(DeckView)