// @flow

export default function getRandomDatapointID(): number {
  const min = 1000000000;
  const max = 9000000000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
