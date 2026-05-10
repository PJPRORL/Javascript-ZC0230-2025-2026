import { Pokemon } from "../models/pokemon"
import { Trainer } from "../models/trainer"

interface DataManager {
  pokemon: Pokemon[]
  trainers: Trainer[]
}

export const dataManager: DataManager = {
  pokemon: [
    {
      id: '1',
      name: 'Bulbasaur',
      types: ['Grass', 'Poison'],
      generation: 'I',
      internationalNumber: 1,
    },
    {
      id: '2',
      name: 'Ivysaur',
      types: ['Grass', 'Poison'],
      generation: 'I',
      internationalNumber: 2,
    },
    {
      id: '3',
      name: 'Venusaur',
      types: ['Grass', 'Poison'],
      generation: 'I',
      internationalNumber: 3,
    },
    {
      id: '4',
      name: 'Charmander',
      types: ['Fire'],
      generation: 'I',
      internationalNumber: 4,
    },
    {
      id: '5',
      name: 'Charmeleon',
      types: ['Fire'],
      generation: 'I',
      internationalNumber: 5,
    },
    {
      id: '6',
      name: 'Charizard',
      types: ['Fire', 'Flying'],
      generation: 'I',
      internationalNumber: 6,
    },
    {
      id: '7',
      name: 'Squirtle',
      types: ['Water'],
      generation: 'I',
      internationalNumber: 7,
    },
    {
      id: '8',
      name: 'Wartortle',
      types: ['Water'],
      generation: 'I',
      internationalNumber: 8,
    },
    {
      id: '9',
      name: 'Blastoise',
      types: ['Water'],
      generation: 'I',
      internationalNumber: 9,
    },
  ],
  trainers: [
    {
      id: '1',
      name: 'Ash Ketchum',
      age: 10,
    },
    {
      id: '2',
      name: 'Misty',
      age: 12,
    },
    {
      id: '3',
      name: 'Brock',
      age: 15,
    },
    {
      id: '4',
      name: 'Tracey Sketchit',
      age: 13,
    },
    {
      id: '5',
      name: 'May',
      age: 12,
    },
    {
      id: '6',
      name: 'Dawn',
      age: 10,
    },
    {
      id: '7',
      name: 'Serena',
      age: 16,
    },
    {
      id: '8',
      name: 'Lillie',
      age: 15,
    },
    {
      id: '9',
      name: 'Goh',
      age: 10,
    }
  ],
}