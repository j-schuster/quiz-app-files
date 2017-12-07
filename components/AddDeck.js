import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class AdddDeck extends React.Component {
	render(){
		return (
			<View style={styles.container}>
				<Text>Hello from the Add Deck component</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default AdddDeck