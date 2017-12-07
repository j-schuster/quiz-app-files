import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DeckList from './components/DeckList'
import { TabNavigator } from 'react-navigation'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import AddDeck from './components/AddDeck'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor}/>
    }
  },
    AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 56,
      backgroundColor: white,

    }
  }
})


export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Tabs/>
     </View>
    );
  }
}





