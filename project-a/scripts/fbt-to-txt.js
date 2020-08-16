// @flow

const sourceStrings = require("../.source_strings.json");

// node scripts/fbt-to-txt.js

for (const phrase of sourceStrings.phrases) {
  for (const [hash, text] of Object.entries(phrase.hashToText)) {
    console.warn(`${hash} (${phrase.desc})\nEN: ${text}\nES: \n`); // eslint-disable-line no-console
  }
}

/*

xqoguQxnoeLWkiZgd66KQA== (Rule number 1)
EN: Be careful when entering the café so that the cats do not run away. {pleading face emoji}
ES:

AZBk0HF6F8GgThvh5h0vdg== (Rule number 2)
EN: Feel free to play with the cats and have fun. But please, respect their space and do not force them to do things they do not want, such as pulling their tails, whiskers, etc.
ES:

2fSycF0Q8vnGGrk4RLeKLg== (Rule number 3)
EN: Try not to wake up our cats or interrupt them while they are having a snack.
ES:

0yUbdcejksJ+Iw6ARTDoag== (Rule number 4)
EN: We encourage you to take pictures. {thumbs up emoji} But prefer to take them without a flash. Don’t forget to tag us on your Instagram {instagram account}
ES:

5iTUS9k7jab+evPuLeeh7A== (Rule number 5)
EN: Our cats have a special healthy food which you can buy from us. Human food might be dangerous for them. Please don’t feed them with your food.
ES:

/T78HImOiKKs6J26mVLuaQ== (Rule number 6)
EN: Cats are very sensitive. Be careful with loud and sudden noises, which could scare them.
ES:

U98Bttt6bmp1PmUACerVug== (Rule number 7)
EN: Leave your pets at home. Other pets are not allowed here.
ES:

itv8A/4Pvi/UCI1hEPlLpQ== (Rule number 8)
EN: We are not responsible for any injuries caused by our cats - they are very playful, and they do not mean it. Pay special attention to your kids. Feel free to ask for medical aid when needed.
ES:

eEHP2QM079xkRqVGx7HUlQ== (Rule number 9)
EN: Hygiene is important. Wash your hand when playing with our cats.
ES:

4EOS7M5k/RGGg6oLo32EHw== (Rule number 10)
EN: Please, follow our rules. Misbehaving guests will be asked to leave.
ES:

*/
