// @flow

import fs from 'fs';
import path from 'path';
import { parse, buildSchema } from 'graphql';

import { calculate, THRESHOLD } from '../calculate';
import OriginalThresholdError from '../ThresholdError';

const schema = buildSchema(fs.readFileSync(path.join(__dirname, 'testschema.graphql'), 'utf8'));
const ThresholdError = new OriginalThresholdError(THRESHOLD);

test.each([
  ['{scalar}', 3],
  ['{scalarNonNull}', 3],
  ['{enum}', 3],
  ['{list}', 10_004], // list without 'first' are being heavily penalized
  ['{list(first:1)}', 5], // we differ here from referential implementation - it would say "3" but that's wrong (?)
  ['{list(first:2)}', 6],
  ['{list(first:10)}', 14],
  ['{list(last:1)}', 5],
  ['{list(last:2)}', 6],
  ['{list(last:10)}', 14],
  ['{a:scalar,b:scalar}', 6],
  ['{scalar,list}', 10_007], // list without 'first' are being heavily penalized
  ['{scalar,list(first:1)}', 8],
  ['{me{name}}', 7],
  ['{me{name,surname}}', 10],

  // UNION
  ['{union{...on User{name}}}', 7],
  ['{union{...on User{name,surname}}}', 10],
  ['{union{...on User{name}...on PageInfo{hasNextPage}}}', 10],
  ['{union{...on User{name,surname}...on PageInfo{hasNextPage,hasPreviousPage}}}', 16],
  ['{union{...on User{friends{name}}}}', 50_008],
  ['{union{...on User{friends(first:1){name}}}}', 13],
  ['{union{...on User{friends(first:1){name,surname}}}}', 16],

  // INTERFACE
  ['{node(id:1){id}}', 7],
  ['{node(id:1){id}}', 7],
  ['{node(id:1){...{id}}}', 7],
  ['{node(id:1){...on User{id}}}', 7],
  ['{node(id:1){...on User{id,name}}}', 10],
  ['{node(id:1){...on User{friends{name}}}}', 50_008],
  ['{node(id:1){...on User{friends(first:1){name}}}}', 13],
  ['{node(id:1){...on User{friends(first:1){name,surname}}}}', 16],

  // CYCLIC
  ['{me{friends{name}}}', 50_008], // list without 'first' are being heavily penalized
  ['{me{friends{a:name,b:name}}}', 80_008], // list without 'first' are being heavily penalized
  ['{me{friends{name,surname}}}', 80_008], // list without 'first' are being heavily penalized
  ['{me{friends{friends{name}}}}', ThresholdError], // actual value would be "500_060_008"
  ['{me{friends(first:1000){name}}}', 5_008],
  ['{me{friends(first:1){name}}}', 13],
  ['{me{friends(first:1){name,surname}}}', 16],
  ['{me{friends(first:1){friends(first:1){name}}}}', 19],
  ['{me{friends(first:1){friends(first:1){friends(first:1){name}}}}}', 25],
  ['{me{friends(first:1){friends(first:1){friends(first:1){friends(first:1){name}}}}}}', 31],
  ['{me{friends(first:1){friends(first:1){friends(first:1){friends(first:1){friends(first:1){name}}}}}}}', 37], // prettier-ignore
  ['{me{friends(first:2){name}}}', 18],
  ['{me{friends(first:2){friends(first:2){name}}}}', 40],
  ['{me{friends(first:2){friends(first:2){friends(first:2){name}}}}}', 84],
  ['{me{friends(first:2){name,surname}}}', 24],
  ['{me{friends(first:2){friends(first:2){name,surname}}}}', 52],
  ['{me{friends(first:2){friends(first:2){friends(first:2){name,surname}}}}}', 108], // GitHub would say "8" according to docs (true?)

  // EXTREME BLOWUP
  ['{me{friends(first:5){name}}}', 33],
  ['{me{friends(first:5){friends(first:5){name}}}}', 163],
  ['{me{friends(first:5){friends(first:5){friends(first:5){name}}}}}', 813],
  ['{me{friends(first:5){friends(first:5){friends(first:5){friends(first:5){name}}}}}}', 4063],
  ['{me{friends(first:5){friends(first:5){friends(first:5){friends(first:5){friends(first:5){name}}}}}}}', 20_313], // prettier-ignore
  ['{me{friends(first:5){friends(first:5){friends(first:5){friends(first:5){friends(first:5){friends(first:5){name}}}}}}}}', 101_563], // prettier-ignore
  [
    '{me{friends(first:5){friends(first:5){friends(first:5){friends(first:5){friends(first:5){friends(first:5){friends(first:5){name}}}}}}}}}',
    ThresholdError,
  ],
  // Extreme blowup with "last" argument:
  ['{me{friends(last:5){name}}}', 33],
  ['{me{friends(last:5){friends(last:5){name}}}}', 163],
  ['{me{friends(last:5){friends(last:5){friends(last:5){name}}}}}', 813],

  // CONNECTIONS
  ['{me{friendsConnection{count}}}', 11],
  ['{me{friendsConnection{pageInfo{hasNextPage}}}}', 15],
  ['{me{friendsConnection{count,pageInfo{hasNextPage}}}}', 18],
  ['{me{friendsConnection{edges{node{name}}}}}', 90_012], // edges without 'first' are being heavily penalized

  // CONNECTIONS WITH LIMIT
  ['{me{friendsConnection(first:1){count}}}', 11],
  ['{me{friendsConnection(first:100){count}}}', 11], // doesn't grow since it's only once in the list
  ['{me{friendsConnection(first:1){count,edges{node{name}}}}}', 24],
  ['{me{friendsConnection(first:1){edges{node{name}}count}}}', 24],
  ['{me{friendsConnection(first:1){edges{node{name}}pageInfo{hasNextPage}}}}', 28],
  ['{me{friendsConnection(first:5){edges{node{name}}pageInfo{hasNextPage}}}}', 64],
  ['{me{friendsConnection(first:5){edges{node{name}}pageInfo{hasNextPage,hasPreviousPage}}}}', 67],
  ['{me{friendsConnection(first:1){edges{node{name}}}}}', 21],
  ['{me{friendsConnection(first:1){edges{node{name,surname}}}}}', 24],
  ['{me{friendsConnection(first:5){edges{node{name}}}}}', 57],
  ['{me{friendsConnection(first:5){edges{node{name,surname}}}}}', 72],
  ['{me{friendsConnection(first:5){edges{node{friendsConnection(first:5){edges{node{name}}}}}}}}', 307], // prettier-ignore
  ['{me{friendsConnection(first:5){edges{node{friendsConnection(first:5){edges{node{friendsConnection(first:5){edges{node{name}}}}}}}}}}}', 1557], // prettier-ignore

  // CONNECTIONS WITH VARIABLE LIMIT
  ['query($count:Int){me{friendsConnection(first:$count){edges{node{name}}}}}', 9_012],
  ['query($count:Int!){me{friendsConnection(first:$count){edges{node{name}}}}}', 9_012],
  ['query D1($count:Int!=1){me{friendsConnection(first:$count){edges{node{name}}}}}', 21],
  ['query D2($count:Int!=5){me{friendsConnection(first:$count){edges{node{name}}}}}', 57],

  // INLINE FRAGMENTS
  ['{me{friends(first:1){...on User{name}}}}', 13], // same as: {me{friends(first:1){name}}}
  ['{me{friends(first:1){...on User{__typename,name}}}}', 13],
  ['{me{friends(first:1){...{name}}}}', 13],
  ['{me{friends(first:1){...@include(if:true){name}}}}', 13],
  ['{me{friends(first:1){...@include(if:false){name}}}}', 13], // should we support this 🤔 (similar for @skip)

  // FRAGMENTS
  ['fragment X on User{name},query{me{friends(first:1){...X}}}', 13], // same as: {me{friends(first:1){name}}}
  ['fragment X on User{name,surname},query{me{friends(first:1){...X}}}', 16],
  ['fragment X on User{name},query{me{friends(first:1){...X,surname}}}', 16],
  ['fragment X on User{name},query{me{friends(first:1){...X,__typename}}}', 13],
  ['fragment X on User{name},query{me{friends(first:1){...X,...X}}}', 13],
  ['fragment X on User{name},fragment Y on User{surname},query{me{friends(first:1){...X,...Y}}}', 16], // prettier-ignore

  // MULTIPLE OPERATIONS
  // Please note: we currently calculate score for every definition together. Should we return
  // array with individual scores instead?
  ['query A{scalar} query B{scalar}', 6],
  ['query A{scalar,list(first:1)} query B{scalar}', 11],
  ['query A{scalar} query B{scalar,list(first:1)}', 11],

  // INTROSPECTION
  // We currently do not penalize introspection fields at all.
  ['{__typename}', 0],
  ['{__typename,scalar}', 3],
  ['{__schema{queryType{name}}}', 0],
  ['{__schema{queryType{name}},__typename}', 0],
  ['{__schema{queryType{name}},__typename,list(first:1)}', 5],

  // MUTATIONS
  ['mutation {mutationScalar}', 3],

  // SUBSCRIPTIONS
  ['subscription {subscriptionScalar}', 3],

  // ERRORS (GraphQLError)
  // Please note: we do not do validation here since it's not responsibility of this utility.
  // This utility is just one of the validators.
  ['{thisFieldDoesNotExist}', 0],
  ['{scalar,thisFieldDoesNotExist}', 3],
])('%#) %p ~~> %p points', (query, expectedQuerySize) => {
  if (expectedQuerySize instanceof Error) {
    expect(() => calculate(schema, parse(query))).toThrowError(expectedQuerySize);
  } else {
    expect(calculate(schema, parse(query))).toBe(expectedQuerySize);
  }
});
