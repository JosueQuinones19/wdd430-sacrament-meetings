import { Meeting } from './types';

const meetings: Meeting[] = [
  {
    id: 1,
    date: '2026-11-01',
    type: 'testimony',
    wardName: 'Maple Creek 3rd Ward',
    presiding: 'Bishop Robert Jensen',
    conducting: 'Bishop Robert Jensen',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Maria Lopez',
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    closingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
    closingPrayer: 'Brother David Park',
    announcements: [
      'Ward temple night this Friday at 7:00 PM.',
      'Youth fundraiser bake sale next Sunday in the cultural hall.',
    ],
    wardBusiness: [
      'Sister Emily Carter sustained as Primary 2nd Counselor.',
    ],
    stakeBusiness: false,
    speakers: [],
    musicalNumbers: [],
  },
  {
    id: 2,
    date: '2026-11-08',
    type: 'regular',
    wardName: 'Maple Creek 3rd Ward',
    presiding: 'Bishop Robert Jensen',
    conducting: 'Brother Michael Torres, 1st Counselor',
    openingHymn: { number: 26, title: 'Joseph Smith\'s First Prayer' },
    openingPrayer: 'Brother Alan Fisher',
    sacramentHymn: { number: 176, title: 'Tis Sweet to Sing the Matchless Love' },
    closingHymn: { number: 304, title: 'Teach Me to Walk in the Light' },
    closingPrayer: 'Sister Rachel Adams',
    announcements: [
      'Stake conference next week. No regular ward meetings.',
      'Food drive donations accepted through Wednesday.',
    ],
    wardBusiness: [],
    stakeBusiness: false,
    speakers: [
      { name: 'Sister Hannah Brooks', topic: 'Finding Peace Through Prayer' },
      { name: 'Brother James Whitfield', topic: 'Service in Our Community' },
    ],
    musicalNumbers: [
      { performer: 'Ward Choir', title: 'Come, Thou Fount of Every Blessing' },
    ],
  },
  {
    id: 3,
    date: '2026-11-15',
    type: 'stake',
    wardName: 'Maple Creek Stake',
    presiding: 'President Thomas R. Kimball',
    conducting: 'President Thomas R. Kimball',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Steven Nguyen',
    sacramentHymn: { number: 0, title: '' },
    closingHymn: { number: 255, title: 'Carry On' },
    closingPrayer: 'Sister Linda Morrison',
    announcements: [
      'Stake youth conference registration opens December 1.',
      'New stake emergency preparedness plan distributed to ward leaders.',
    ],
    wardBusiness: [],
    stakeBusiness: true,
    speakers: [
      { name: 'President Thomas R. Kimball', topic: 'Strengthening Our Families' },
      { name: 'Sister Carol Ann Webb', topic: 'The Covenant Path' },
      { name: 'Elder Marcus Drew (visiting)', topic: 'Missionary Work in Our Stakes' },
    ],
    musicalNumbers: [
      { performer: 'Stake Youth Choir', title: 'I Am a Child of God' },
    ],
  },
  {
    id: 4,
    date: '2026-11-22',
    type: 'regular',
    wardName: 'Maple Creek 3rd Ward',
    presiding: 'Bishop Robert Jensen',
    conducting: 'Brother Daniel Reyes, 2nd Counselor',
    openingHymn: { number: 241, title: 'Count Your Blessings' },
    openingPrayer: 'Sister Naomi Clark',
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
    closingPrayer: 'Brother Kevin Olsen',
    announcements: [
      'Thanksgiving service project: meal assembly at the bishop\'s storehouse, Wednesday at 5 PM.',
      'No mutual this week due to the holiday.',
    ],
    wardBusiness: [
      'Brother Tyler Grant released as Elders Quorum Secretary with thanks.',
      'Brother Nathan Price sustained as Elders Quorum Secretary.',
    ],
    stakeBusiness: false,
    speakers: [
      { name: 'Sister Olivia Chen', topic: 'Gratitude as a Way of Life' },
      { name: 'Brother Samuel Dixon', topic: 'The Savior\'s Example of Thankfulness' },
      { name: 'Bishop Robert Jensen', topic: 'Blessings of the Harvest' },
    ],
    musicalNumbers: [],
  },
  {
    id: 5,
    date: '2026-11-29',
    type: 'regular',
    wardName: 'Maple Creek 3rd Ward',
    presiding: 'Bishop Robert Jensen',
    conducting: 'Bishop Robert Jensen',
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Brother Richard Endo',
    sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Sister Priya Sharma',
    announcements: [
      'Ward Christmas party December 13 at 6:00 PM. Sign-up sheet in the foyer.',
      'Tithing settlement appointments available starting next week.',
    ],
    wardBusiness: [],
    stakeBusiness: false,
    speakers: [
      { name: 'Brother Isaac Tanaka', topic: 'Preparing for the Savior\'s Birth' },
      { name: 'Sister Grace Holloway', topic: 'Lights in a Dark World' },
    ],
    musicalNumbers: [
      { performer: 'Sister Megan O\'Brien (violin)', title: 'Silent Night' },
    ],
  },
];

export function getMeetings(date?: string): Meeting[] {
  if (date) {
    return meetings.filter((m) => m.date === date);
  }
  return [...meetings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getMeetingById(id: number): Meeting | undefined {
  return meetings.find((m) => m.id === id);
}
