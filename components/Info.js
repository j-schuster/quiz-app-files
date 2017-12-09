import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export function Info({ onPress, style, text }){
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={style}>{text}</Text>
		</TouchableOpacity>
	)
}