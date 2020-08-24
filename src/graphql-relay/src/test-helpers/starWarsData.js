/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */

/**
 * This defines a basic set of data for our Star Wars Schema.
 *
 * This data is hard coded for the sake of the demo, but you could imagine
 * fetching this data from a backend service rather than from hardcoded
 * JSON objects in a more complex demo.
 */

type Ship = {|
  id: string,
  name: string,
|};

type Fraction = {|
  id: string,
  name: string,
  ships: $ReadOnlyArray<string>,
|};

const xwing: Ship = {
  id: '1',
  name: 'X-Wing',
};

const ywing: Ship = {
  id: '2',
  name: 'Y-Wing',
};

const awing: Ship = {
  id: '3',
  name: 'A-Wing',
};

// Yeah, technically it's Corellian. But it flew in the service of the rebels,
// so for the purposes of this demo it's a rebel ship.
const falcon: Ship = {
  id: '4',
  name: 'Millenium Falcon',
};

const homeOne: Ship = {
  id: '5',
  name: 'Home One',
};

const tieFighter: Ship = {
  id: '6',
  name: 'TIE Fighter',
};

const tieInterceptor: Ship = {
  id: '7',
  name: 'TIE Interceptor',
};

const executor: Ship = {
  id: '8',
  name: 'Executor',
};

const rebels: Fraction = {
  id: '1',
  name: 'Alliance to Restore the Republic',
  ships: ['1', '2', '3', '4', '5'],
};

const empire: Fraction = {
  id: '2',
  name: 'Galactic Empire',
  ships: ['6', '7', '8'],
};

const data = {
  // prettier-ignore
  Faction: {
    '1': rebels,
    '2': empire,
  },
  // prettier-ignore
  Ship: {
    '1': xwing,
    '2': ywing,
    '3': awing,
    '4': falcon,
    '5': homeOne,
    '6': tieFighter,
    '7': tieInterceptor,
    '8': executor,
  },
};

let nextShip = 9;
export function createShip(shipName: string, factionId: string): Ship {
  const newShip = {
    id: String(nextShip++),
    name: shipName,
  };
  data.Ship[newShip.id] = newShip;
  data.Faction[factionId].ships.push(newShip.id);
  return newShip;
}

export function getShip(id: string): Ship {
  return data.Ship[id];
}

export function getFaction(id: string): Fraction {
  return data.Faction[id];
}

export function getRebels(): Fraction {
  return rebels;
}

export function getEmpire(): Fraction {
  return empire;
}
