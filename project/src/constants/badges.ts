import { Badge } from '../types';

export const BADGES: Badge[] = [
  {
    id: 'bronze',
    name: 'Bronze Explorer',
    description: 'Completed your first lessons and started your coding journey',
    pointsRequired: 100,
    color: '#CD7F32',
    icon: 'Award'
  },
  {
    id: 'silver',
    name: 'Silver Achiever',
    description: 'Demonstrated consistent learning and problem-solving skills',
    pointsRequired: 300,
    color: '#C0C0C0',
    icon: 'Medal'
  },
  {
    id: 'gold',
    name: 'Gold Performer',
    description: 'Excelled in multiple programming languages and concepts',
    pointsRequired: 700,
    color: '#FFD700',
    icon: 'Trophy'
  },
  {
    id: 'platinum',
    name: 'Platinum Expert',
    description: 'Advanced understanding of computer science principles',
    pointsRequired: 1500,
    color: '#E5E4E2',
    icon: 'Star'
  },
  {
    id: 'master',
    name: 'Master Programmer',
    description: 'Elite level programming skills and mentorship qualities',
    pointsRequired: 3000,
    color: '#8A2BE2',
    icon: 'Crown'
  }
];

export const getBadgeForPoints = (points: number): Badge => {
  return BADGES.slice().reverse().find(badge => points >= badge.pointsRequired) || BADGES[0];
};