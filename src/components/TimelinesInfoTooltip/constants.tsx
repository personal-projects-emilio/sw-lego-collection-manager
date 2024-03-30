import { FaEmpire, FaFirstOrder, FaGalacticRepublic, FaOldRepublic, FaRebel } from 'react-icons/fa'

import NewRepublic from 'assets/new-republic.svg?react'

export const starWarsTimeline = [
  {
    title: 'The Old Republic',
    icon: <FaOldRepublic />,
    showsAndMovies: [],
  },
  {
    title: 'Fall of the Jedi',
    icon: <FaGalacticRepublic />,
    showsAndMovies: [
      'Episode I - The Phantom Menace',
      'Episode II - Attack of the Clones',
      'The Clone Wars',
      'Episode III - Revenge of the Sith',
    ],
  },
  {
    title: 'Reign of the Empire',
    icon: <FaEmpire />,
    showsAndMovies: ['The Bad Batch', 'Solo: A Star Wars Story', 'Obi-Wan Kenobi'],
  },
  {
    title: 'Age of Rebellion',
    icon: <FaRebel />,
    showsAndMovies: [
      'Andor',
      'Rebels',
      'Rogue One: A Star Wars Story',
      'Episode IV - A New Hope',
      'Episode V - The Empire Strikes Back',
      'Episode VI - Return of the Jedi',
    ],
  },
  {
    title: 'The New Republic',
    icon: <NewRepublic style={{ fontSize: '46px', margin: '-3px' }} />,
    showsAndMovies: ['The Mandalorian', 'The Book of Boba Fett', 'Ahsoka', 'Skeleton Crew'],
  },
  {
    title: 'Rise of the First Order',
    icon: <FaFirstOrder />,
    showsAndMovies: [
      'Resistance',
      'Episode VII - The Force Awakens',
      'Episode VIII - The Last Jedi',
      'Episode IX - The Rise of Skywalker',
    ],
  },
]
