import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DeckList from './components/DeckList'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import AddDeck from './components/AddDeck'
import DeckView from './components/DeckView'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore } from 'redux'
import AddCard from './components/AddCard'

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

const MainNavigator = StackNavigator({
    Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: 'Deck Info',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard: {
    screen: AddCard,
      navigationOptions: {
        title: 'Add Card',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      }
    }
  })


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
          <View style={{flex: 1}}>
            <MainNavigator/>
         </View>
       </Provider>
    );
  }
}





