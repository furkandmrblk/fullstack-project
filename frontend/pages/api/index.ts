import Badge1 from '../../public/badge1.svg';
import Badge10 from '../../public/badge10.svg';
import Badge25 from '../../public/badge25.svg';
import Badge50 from '../../public/badge50.svg';
import Badge75 from '../../public/badge75.svg';
import Badge100 from '../../public/badge100.svg';
import Badge150 from '../../public/badge150.svg';
import Badge200 from '../../public/badge200.svg';
import Badge250 from '../../public/badge250.svg';
import Badge500 from '../../public/badge500.svg';
import Badge750 from '../../public/badge750.svg';
import Badge1000 from '../../public/badge1000.svg';

import WeekBadge from '../../public/1week.svg';
import TwoWeeksBadge from '../../public/2weeks.svg';
import MonthBadge from '../../public/1month.svg';
import YearBadge from '../../public/1year.svg';
import TwoYearsBadge from '../../public/2years.svg';
import { useState } from 'react';

export const tempArrayFinished: string[] = [];
export const tempArrayWatching: string[] = [];
export const tempArrayWatchlist: string[] = [];

// SEARCH ALGORITHM

let searchResult: string = undefined;

export const setSearchResult = (value: string) => {
  searchResult = value;
};

export const getSearchResult = () => {
  return searchResult;
};

// USER INFORMATION

let usersOnline: number = 0;

export const setOnlineUsers = (isOnline: boolean) => {
  if (isOnline === true) usersOnline = usersOnline + 1;
};

export const getOnlineUsers = () => {
  return usersOnline;
};

export const lastTimeOnline = (userLastTimeOnline: number) => {
  let dateNow = new Date().toString();
  let parsedDateNow = Date.parse(dateNow);

  let diff = parsedDateNow - userLastTimeOnline;

  let seconds = Math.floor(diff / 1000),
    minutes = Math.floor(seconds / 60),
    hours = Math.floor(minutes / 60),
    days = Math.floor(hours / 24),
    months = Math.floor(days / 30),
    years = Math.floor(days / 365);

  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  days %= 30;
  months %= 12;

  let user = undefined;

  let yearText: string = undefined;
  let monthText: string = undefined;
  let dayText: string = undefined;
  let hourText: string = undefined;
  let minuteText: string = undefined;
  let secondText: string = undefined;

  if (years <= 1) {
    yearText = 'year';
  } else {
    yearText = 'years';
  }

  if (months <= 1) {
    monthText = 'month';
  } else {
    monthText = 'months';
  }

  if (days <= 1) {
    dayText = 'day';
  } else {
    dayText = 'days';
  }

  if (hours <= 1) {
    hourText = 'hour';
  } else {
    hourText = 'hours';
  }

  if (minutes <= 1) {
    minuteText = 'minute';
  } else {
    minuteText = 'minutes';
  }

  if (seconds <= 1) {
    secondText = 'second';
  } else {
    secondText = 'seconds';
  }

  if (years === 0 && months === 0 && days === 0 && hours === 0 && minutes < 5) {
    user = 'just now';
  } else if (
    years === 0 &&
    months === 0 &&
    days === 0 &&
    hours === 0 &&
    minutes >= 5
  ) {
    user = minutes + ' ' + minuteText;
  } else if (years === 0 && months === 0 && days === 0) {
    user = hours + ' ' + hourText + ' ' + minutes + ' ' + minuteText;
  } else if (years === 0 && months === 0) {
    user =
      days +
      ' ' +
      dayText +
      ' ' +
      hours +
      ' ' +
      hourText +
      ' ' +
      minutes +
      ' ' +
      minuteText;
  } else if (years === 0) {
    user =
      months +
      ' ' +
      monthText +
      ' ' +
      days +
      ' ' +
      dayText +
      ' ' +
      hours +
      ' ' +
      hourText +
      ' ' +
      minutes +
      ' ' +
      minuteText;
  } else {
    user =
      years +
      ' ' +
      yearText +
      ' ' +
      months +
      ' ' +
      monthText +
      ' ' +
      days +
      ' ' +
      dayText +
      ' ' +
      hours +
      ' ' +
      hourText +
      ' ' +
      minutes +
      ' ' +
      minuteText;
  }

  return user;
};

let registeredTime = {
  years: undefined,
  months: undefined,
  days: undefined,
  hours: undefined,
  minutes: undefined,
  seconds: undefined,
};

export const registeredFor = (userDate: number) => {
  let dateNow = new Date().toString();
  let parsedDateNow = Date.parse(dateNow);

  let diff = parsedDateNow - userDate;

  let seconds = Math.floor(diff / 1000),
    minutes = Math.floor(seconds / 60),
    hours = Math.floor(minutes / 60),
    days = Math.floor(hours / 24),
    months = Math.floor(days / 30),
    years = Math.floor(days / 365);

  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  days %= 30;
  months %= 12;

  registeredTime.years = years;

  registeredTime.months = months;

  registeredTime.days = days;

  registeredTime.hours = hours;

  registeredTime.minutes = minutes;

  registeredTime.seconds = seconds;

  return registeredTime;
};

export const getRegisteredTime = () => {
  return registeredTime;
};

let LoyaltyBadge: StaticImageData = undefined;

export const setLoyaltyBadge = (value: {
  years: number;
  months: number;
  days: number;
}) => {
  if (value.years >= 2) {
    LoyaltyBadge = TwoYearsBadge;
  } else if (value.years >= 1) {
    LoyaltyBadge = YearBadge;
  } else if (value.months >= 1 && value.years === 0) {
    LoyaltyBadge = MonthBadge;
  } else if (value.days >= 14 && value.months === 0 && value.years === 0) {
    LoyaltyBadge = TwoWeeksBadge;
  } else if (value.days >= 7 && value.months === 0 && value.years === 0) {
    LoyaltyBadge = WeekBadge;
  } else {
    LoyaltyBadge = undefined;
  }

  return LoyaltyBadge;
};

export const getLoyaltyBadge = () => {
  return LoyaltyBadge;
};

// BADGES

let Badge: StaticImageData = undefined;

export function setBadge(value: number) {
  if (value >= 1000) {
    Badge = Badge1000;
  } else if (value >= 750) {
    Badge = Badge750;
  } else if (value >= 500) {
    Badge = Badge500;
  } else if (value >= 250) {
    Badge = Badge250;
  } else if (value >= 200) {
    Badge = Badge200;
  } else if (value >= 150) {
    Badge = Badge150;
  } else if (value >= 100) {
    Badge = Badge100;
  } else if (value >= 75) {
    Badge = Badge75;
  } else if (value >= 50) {
    Badge = Badge50;
  } else if (value >= 25) {
    Badge = Badge25;
  } else if (value >= 10) {
    Badge = Badge10;
  } else if (value >= 1) {
    Badge = Badge1;
  } else {
    Badge = undefined;
  }

  return Badge;
}

export function getBadge() {
  return Badge;
}

// USERPROFILE

let randomNumber: number = undefined;
export function setNumber(value: number) {
  randomNumber = value;
}
export function getNumber() {
  return randomNumber;
}

let favoriteAnime: string = undefined;
export function setAnime(value: string) {
  favoriteAnime = value;
}
export function getAnime() {
  return favoriteAnime;
}

let favoriteManga: string = undefined;
export function setManga(value: string) {
  favoriteManga = value;
}
export function getManga() {
  return favoriteManga;
}

let favoriteChar: string = undefined;
export function setChar(value: string) {
  favoriteChar = value;
}
export function getChar() {
  return favoriteChar;
}

// SORTING ALGORITHM

export const topPickedAnimes: any[] = [];

export function partition(arr, start = 0, end = arr.length - 1) {
  // Let's choose the pivot to be the arr[start] element
  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      swapIdx++;
      // Swap current element with the element at the new pivot index
      [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
    }
  }

  // Swap the pivot element with the element at the pivotIndex index
  [arr[swapIdx], arr[start]] = [arr[start], arr[swapIdx]];

  // Return the index of the pivot element after swapping
  return swapIdx;
}

export function quickSort(arr, left = 0, right = arr.length - 1) {
  // Base case is that the left and right pointers don't overlap, after which we'll be left with an array of 1 item
  if (left < right) {
    let pivotIndex = partition(arr, left, right);

    // For left subarray, which is everything to the left of the pivot element
    quickSort(arr, left, pivotIndex - 1);

    // For the right sub array, which is everything to the right of the pivot element
    quickSort(arr, pivotIndex + 1, right);
  }
  // Return the array, when it's of length 1 i.e, left === right
  return arr;
}

// ANIME, MANGA & CHARACTER ARRAYS

export const animeList: string[] = [
  'A Ben Mao',
  'A Brightening Life',
  'A Day Before Us',
  'A Kite',
  'A Log Day Of Timbre',
  'A New Journey',
  'A Piece of Phantasmagoria',
  "A Sea Doesn't Tell Much",
  'A Smart Experiment',
  'A Tang Qi Yu',
  'A Woman In A Fashion Building',
  'A-Channel',
  'A-Channel+smile',
  'A-Channel: +A-Channel',
  'A-Channel: Nabe wo Tabeyou',
  'A-Girl',
  'A-jang.com',
  'A-Ko The Versus',
  'A-Size Classmate',
  'A.D. Police (TV)',
  'A.F.',
  'A.I.C.O.: Incarnation',
  'A.LI.CE',
  'A3! Season Autumn & Winter',
  'A3! Season Spring & Summer',
  'Aa / ii',
  'Aa Harimanada',
  'Aa! Megami-sama!',
  'Aa! Megami-sama! (2011)',
  'Aa! Megami-sama! (TV)',
  'Aa! Megami-sama! (TV) Specials',
  'Aa! Megami-sama! Movie',
  'Aa! Megami-sama!: Chichaitte Koto wa Benri da ne',
  'Aa! Megami-sama!: Sorezore no Tsubasa',
  'Aa! Megami-sama!: Sorezore no Tsubasa Specials',
  'Aa! Megami-sama!: Tatakau Tsubasa',
  'AAA de Ikou!!: Yuuna & Akiko',
  'Aachi wa Ssipak',
  'Abarenbou Rikishi!! Matsutarou',
  'Abashiri Ikka',
  'ABC Tenkiyohou',
  'Abciee Shuugyou Nikki',
  'Abe George Kattobi Seishun Ki: Shibuya Honky Tonk',
  'Abenobashi Mahou☆Shoutengai',
  'Absolute Duo',
  'Abstract feat. Alkama',
  'Abu Shui Qian Gushi',
  'Abunai Sisters: Koko & Mika',
  'ACCA: 13-ku Kansatsu-ka',
  'ACCA: 13-ku Kansatsu-ka - Regards',
  'ACCA: 13-ku Kansatsu-ka Specials',
  'Accel World',
  'Accel World EX',
  'Accel World: Acchel World',
  'Accel World: Infinite∞Burst',
  'Accelerando: Datenshi-tachi no Sasayaki',
  'Acchi Kocchi',
  'Acchi Kocchi (TV)',
  'Acchi Kocchi (TV): Place=Princess',
  'Ace wo Nerae!',
  'Ace wo Nerae! (1979)',
  'Ace wo Nerae! 2',
  'Ace wo Nerae!: Final Stage',
  'Acerola-chan',
  'Action Heroine Cheer Fruits',
  'Active Raid: Kidou Kyoushuushitsu Dai Hachi Gakari',
  'Active Raid: Kidou Kyoushuushitsu Dai Hachi Gakari 2nd',
  'Actors: Songs Connection',
  'Ad Lib Anime Kenkyuujo',
  'AD Police',
  'Adachi to Shimamura',
  'Adachi to Shimamura Mini Anime',
  'Adachi-ga Hara',
  'Adesugata Mahou no Sannin Musume',
  'Adobe Student and Teacher Edition',
  'Advancer Tina',
  'Adventures in Beauty Wonderland',
  'AEIOUdan: Douro no Tadashii Watari Kata',
  'Aerover: Pinigseuui Buhwal',
  'Aerover: Seupeiseu Drone Gwihwan',
  'Aesop Douwa',
  "Aesop's World",
  'Afghanistan Paghman-mura no Monogatari: Boku no Mura ni Circus ga Kita',
  'Afghanistan Paghman-mura no Monogatari: Sekaiichi Utsukushii Boku no Mura',
  'Africa no Salaryman',
  'Africa no Salaryman (TV)',
  'Afro Samurai',
  'Afro Samurai Movie',
  'Afro Samurai Pilot',
  'Afro Samurai: Resurrection',
  'Afro-Ken',
  'After School',
  'After War Gundam X',
  'After... The Animation',
  'Afureko! AR',
  'Against',
  'Agatha Christie no Meitantei Poirot to Marple',
  'Age Man to Fuku Chin',
  'Age of Obscure: Boubaku Jidai',
  'Aggressive Retsuko',
  'Aggressive Retsuko (ONA)',
  'Aggressive Retsuko (ONA) 2nd Season',
  'Aggressive Retsuko (ONA) 3rd Season',
  'Aggressive Retsuko (ONA) 4th Season',
  'Aggressive Retsuko: We Wish You a Metal Christmas',
  'Agigongryong Doolie',
  'Agigongryong Doolie (1988)',
  'Agigongryong Doolie (2009)',
  'Agigongryong Doolie (Movie)',
  'Agukaru',
  'Agukaru: Play with Ibaraki-hen',
  'Agukaru: Play with Ibaraki-hen Episode 0',
  'Aguu: Tensai Ningyou',
  'Ahiru no Ko',
  'Ahiru no Otegara',
  'Ahiru no Pekkle no Ahiru no Drakestail',
  'Ahiru no Pekkle no Aladdin to Mahou no Lamp',
  'Ahiru no Pekkle no Hihou wo Sagase',
  'Ahiru no Pekkle no Minikui Ahiru no Ko',
  'Ahiru no Pekkle no Sindbad no Bouken',
  'Ahiru no Pekkle no Suieitaikai wa Oosawagi',
  'Ahiru no Sora',
  'Ahiru Rikusentai',
  'Aho Girl',
  'Ai',
  'Ai (ONA)',
  'Ai City',
  'Ai Doll',
  'Ai Mai! Moe Can Change!',
  'Ai Monogatari: 9 Love Stories',
  'Ai no Gakkou Cuore Monogatari',
  'Ai no Katachi: Ecchi na Onnanoko wa Kirai... Desu ka?',
  'Ai no Kiseki: Doctor Norman Monogatari',
  'Ai no Kusabi',
  'Ai no Kusabi (2012)',
  'Ai no Senshi Rainbowman',
  'Ai no Utagoe wo Kikasete',
  'Ai no Wakakusa Monogatari',
  'Ai no Wakakusa Monogatari Special',
  'Ai no Wakakusa Yama Monogatari',
  'Ai Shimai 2: Futari no Kajitsu',
  'Ai Shimai Tsubomi... Kegashite Kudasai',
  'Ai Shimai: Futari no Kajitsu',
  'Ai Shoujo Pollyanna Story',
  'Ai Shoujo Pollyanna Story Specials',
  'Ai Sky Tree 21',
  'Ai Tenchi Muyou!',
  'Ai Tenshi Densetsu Wedding Peach',
  'Ai Tenshi Densetsu Wedding Peach DX',
  'Ai Tenshi Densetsu Wedding Peach Specials',
  'Ai to Ken no Camelot: Mangaka Marina Time Slip Jiken',
  'Ai to Shi',
  'Ai to Yuuki no Pig Girl Tonde Buurin',
  'Ai wa Kagi no Kazu dake... Fuuzoku Mansion',
  'Ai wa KAT-TUN',
  'Ai wo Komete',
  'Ai Yori Aoshi',
  'Ai Yori Aoshi: Enishi',
  'Ai Yori Aoshi: Enishi - Miyuki',
  'Ai Yori Aoshi: Yumegatari',
  'Ai Zai Xiyuan Qian',
  'Ai Zai Xiyuan Qian 2nd Season',
  'Aibeya The Animation',
  'Aigan Kaijuu',
  'Aihime Megohime',
  'AIKa',
  'AIKa R-16: Virgin Mission',
  'AIKa Zero',
  'AIKa Zero Picture Drama',
  'Aika-chan no Chikyuu',
  'AIKa: Special Trial',
  'Aikagi The Animation',
  'Aikatsu Friends!',
  'Aikatsu Friends!: Kagayaki no Jewel',
  'Aikatsu on Parade!',
  'Aikatsu on Parade! (ONA)',
  'Aikatsu Planet!',
  'Aikatsu Stars!',
  'Aikatsu Stars! Movie',
  'Aikatsu!',
  'Aikatsu! Movie',
  'Aikatsu! Music Award: Minna de Shou wo MoracchaimaShow!',
  'Aikatsu!: Dai Starmiya Ichigo Matsuri Zenyasai!!',
  'Aikatsu!: Nerawareta Mahou no Aikatsu! Card',
  'Ail Maniax: Inma Seifukugari & Majogari no Yoru ni',
  'Aioi Ai oi',
  'Air',
  'Air Gear',
  'Air Gear Special',
  'Air Gear: Kuro no Hane to Nemuri no Mori - Break on the Sky',
  'Air in Summer',
  'Air Master',
  'Air Movie',
  'Air Recap',
  'Airs',
  'Aisai Nikki',
  'Aisei Tenshi Love Mary: Akusei Jutai - The Animation',
  'Aiseki Mogol Girl',
  'Aishen Qiaokeli-ing...',
  'Aishen Qiaokeli-ing... II',
  'Aishen Qiaokeli-ing: Wanjie Jinian',
  'Aishite Knight',
  'Aishiteru yo McCrea: McCrea no Koutsuu Anzen',
  'Aishiteruze Baby★★',
  'Aitata Bocchi',
  'Aitsu to Lullaby: Suiyobi no Cinderella',
  'AIUEO Anime Sekai no Douwa: Aesop Monogatari Anime Series',
  'Aiura',
  'Ajimu: Kaigan Monogatari',
  'Ajin',
  'Ajin 2nd Season',
  'Ajin 2nd Season OVA',
  'Ajin OVA',
  'Ajin Part 1: Shoudou',
  'Ajin Part 2: Shoutotsu',
  'Ajin Part 3: Shougeki',
  'Ajin Senshi',
  'Ajisai no Chiru Koro ni OVA',
  'Ajisai no Uta',
  'Ajjishin da Tsunami wa? Jibun no Inochi wa Jibun de Mamoru',
  'Akachan Honbuchou',
  'Akachan to Boku',
  'Akadou Suzunosuke',
  'Akagaki Genzou: Tokuri no Wakare',
  'Akagami no Shirayuki-hime',
  'Akagami no Shirayuki-hime 2nd Season',
  'Akagami no Shirayuki-hime: Nandemonai Takaramono, Kono Page',
  'Akage no Anne',
  'Akage no Anne Specials',
  'Akage no Anne: Green Gables e no Michi',
  'Akahori Gedou Hour Rabuge',
  'Akai Hayate',
  'Akai Ito',
  'Akai Kiba: Blue Sonnet',
  'Akai Koudan Zillion',
  'Akai Koudan Zillion Recaps',
  'Akai Koudan Zillion: Utahime Yakyoku',
  'Akai Kutsu! Onnanoko!',
  'Akai Shouzou: Char, Soshite Frontal e',
  'Akakichi no Eleven',
  'AkaKill! Gekijou',
  'Akame ga Kill!',
  'Akane Maniax',
  'Akane-chan',
  'Akaneiro ni Somaru Saka',
  'Akaneiro ni Somaru Saka: Hardcore',
  'Akanesasu Shoujo',
  'Akashic Re:cords',
  'Akatsuki no Yona',
  'Akatsuki no Yona OVA',
  'Akazukin Chacha',
  'Akazukin Chacha OVA',
  'Akazukin Chanto Manabou! Koutsuu Rule',
  'Akazukin to Kenkou',
  'AKB0048',
  'AKB0048: Next Stage',
  'AKB48 Stage Fighter',
  'Akebi no Hana: Maho',
  'Akebi-chan no Sailor-fuku',
  'Aki no Kanade',
  'Aki no Puzzle',
  'Aki-Sora',
  'Aki-Sora: Yume no Naka',
  "Akiba's Trip The Animation",
  'Akiba-chan',
  'Akibakei Kanojo',
  'Akichi Asobi: Playground',
  'Akihabara Dennou-gumi',
  'Akihabara Dennou-gumi: 2011-nen no Natsuyasumi',
  'Akikan!',
  'Akikan!: Kan Ippatsu!? Onsen Panic',
  'Akiko',
  'Akina to Onsen de H Shiyo!',
  'Akindo Sei no Little Peso',
  'Akira',
  'Akita Kenritsu Iburi Gakkou Chuutou-bu',
  'Akita Kenritsu Iburi Gakkou Chuutou-bu: Web-ban Omake',
  'Akkun to Kanojo',
  'Aku no Hana',
  'Aku no Onna Kanbu',
  'Aku no Onna Kanbu: Full Moon Night',
  'Aku no Onna Kanbu: Full Moon Night R',
  'Akubi Girl',
  'Akudama Drive',
  'Akuei to Gacchinpo',
  'Akuei to Gacchinpo The Movie: Chelsea no Gyakushuu/Akuei to Mahou no Hammer',
  'Akuei to Gacchinpo: Tenkomori',
  'Akuei to Gacchinpo: Tenkomori - Maboroshi no Omake Episode',
  'Akuemon',
  'Akuma no Kairozu',
  'Akuma no Kimuraa-hen',
  'Akuma no Memumemu-chan',
  'Akuma no Riddle',
  'Akuma no Riddle: Shousha wa Dare? Nukiuchi Test',
  'Akuma to Himegimi',
  'Akuma Tou no Prince: Mitsume ga Tooru',
  'Akuma-kun',
  'Akuma-kun (Movie)',
  'Akuma-kun: Youkoso Akuma Land e!!',
  'Akuu Daisakusen Srungle',
  'Al Caral no Isan',
  'Aladdin to Mahou no Lamp no Koutsuu Anzen',
  'Alan-kun no Koutsuu Rule wo Mamorou ne!',
  'Aldnoah.Zero',
  'Aldnoah.Zero 2nd Season',
  'Aldnoah.Zero Extra Archives',
  'Alexander Senki',
  'Alexander Senki Movie',
  'Alexandros no Ketsudan',
  'Ali Baba to 40-hiki no Touzoku',
  'Alice Gear Aegis: Doki! Actress Darake no Mermaid Grand Prix♥',
  'Alice in Cyberland',
  'Alice in Deadly School',
  'Alice in Dreamland',
  'Alice or Alice',
  'Alice SOS',
  'Alice Tantei Kyoku',
  'Alice to Therese no Maboroshi Koujou',
  'Alice to Zouroku',
  'Alien 9',
  'Alignment You! You! The Animation',
  'All Out!',
  'All That Gundam',
  'All-Free kono Natsu Ichioshi Monogatari Campaign Kokuchi Douga',
  'Allargando The Animation',
  'Allegseuui Moheom',
  'Allison to Lillia',
  'Aloha! Youkai Watch: Rakuen Hawaii de Geragerapou!!',
  'Alphard x Taka no Tsume',
  'Alps Monogatari: Watashi no Annette',
  'Alps Monogatari: Watashi no Annette Specials',
  'Alps no Shoujo Heidi',
  'Alps no Shoujo Heidi (1979)',
  'Alps no Shoujo Heidi Pilot',
  'Alps no Shoujo Heidi: Alm no Yama-hen',
  'Alps no Shoujo Heidi: Heidi to Clara-hen',
  'Altered Carbon: Resleeved',
  'Ama Gli Animali',
  'Amaama to Inazuma',
  'Amada Anime Series: Super Mario Brothers',
  'Amaenaide yo!!',
  'Amaenaide yo!! Katsu!!',
  'Amaenaide yo!! Katsu!!: Damasarenaide yo!!',
  'Amaenaide yo!!: Yasumanaide yo!!',
  'Amagami SS',
  'Amagami SS OVA',
  'Amagami SS+ Plus',
  'Amagami SS+ Plus Picture Drama',
  'Amagami SS+ Plus: Extra Episode+ Plus',
  'Amagami SS: Tachibana Miya-hen - Imouto',
  'Amagi Brilliant Park',
  'Amagi Brilliant Park: Nonbirishiteiru Hima ga Nai!',
  'Amagi Brilliant Park: Wakuwaku Mini Theater - Rakugaki Backstage',
  'Amai Choubatsu: Watashi wa Kanshu Senyou Pet',
  'Amakage',
  'Amakano',
];

export const mangaList: string[] = [
  'Shingeki no Kyojin',
  'Berserk',
  'One Piece',
  'Tokyo Ghoul',
  'Naruto',
  'Boku no Hero Academia',
  'One Punch-Man',
  'Death Note',
  'Bleach',
  'Fairy Tail',
  'Solo Leveling',
  'Fullmetal Alchemist',
  'Kimetsu no Yaiba',
  'Vagabond',
  'Deadman Wonderland',
  'Jujutsu Kaisen',
  'Shokugeki no Souma',
  'Nanatsu no Taizai',
  'Akame ga Kill!',
  'Haikyuu!!',
  "Hell's Paradise: Jigokuraku",
  'Eleceed',
  'Chainsaw Man',
  'Ao Haru Ride',
  'Tower of God',
  'Tokyo Manji Revengers',
  'The Beginning After The End',
  'The Great Mage Returns After 4000 Years',
  'Sss-Class Suicide Hunter',
  'Second Life Ranker',
  "Player Who Can't Level Up",
];

export const charList: string[] = [
  'Monkey D. Luffy',
  'Lelouch Lamperouge',
  'Gojo Satoru',
  'Yuuji Itadori',
  'Guts',
  'Killua Zoldyck',
  'Gon',
  'Saitama',
  'Genos',
  'Sung Jin-Woo',
  'Levi',
  'Lawliet L',
  'Itachi Uchiha',
  'Roronoa Zoro',
  'Naruto Uzumaki',
  'Mikasa Ackerman',
  'Eren Yeager',
  'Rem',
  'Ken Kaneki',
  'Spike Spiegel',
  'Megumin',
  'Yato',
  'Kazuto Kirigaya',
  'Joseph Joestar',
  'Hisoka Morow',
  'Zero Two',
  'Taiga Aisaka',
  'Saber',
  'Eikichi Onizuka',
  'Son Goku',
  'Trunks',
  'Shouto Todoroki',
  'Ichigo Kurosaki',
  'Sasuka Uchiha',
  'Izuku Midoriya',
  'Violet Evergarden',
  'Josuke Higashikata',
  'Natsu Dragneel',
];
