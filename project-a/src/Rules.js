// @flow strict

import React from "react";
import fbt from "fbt";

export default function Rules() {
  return (
    <ol>
      <li>
        <fbt desc="Rule number 1">
          Be careful when entering the café so that the cats do not run away. 🥺
        </fbt>
      </li>
      <li>
        <fbt desc="Rule number 2">
          Feel free to play with the cats and have fun. But please, respect
          their space and do not force them to do things they do not want, such
          as pulling their tails, whiskers, etc.
        </fbt>
      </li>
      <li>
        <fbt desc="Rule number 3">
          Try not to wake up our cats or interrupt them while they are having a
          snack.
        </fbt>
      </li>
      <li>
        <fbt desc="Rule number 4">
          We encourage you to take pictures. 👍 But prefer to take them without
          a flash. Don’t forget to tag us on your Instagram{" "}
          <fbt:param name="instagram account">{"@tktk"}</fbt:param>
        </fbt>
      </li>
      <li>
        <fbt desc="Rule number 5">
          Our cats have a special healthy food which you can buy from us. Human
          food might be dangerous for them. Please don’t feed them with your
          food.
        </fbt>
      </li>
      <li>
        <fbt desc="Rule number 6">
          Cats are very sensitive. Be careful with loud and sudden noises, which
          could scare them.
        </fbt>
      </li>
      <li>
        <fbt desc="Rule number 7">
          Leave your pets at home. Other pets are not allowed here.
        </fbt>
      </li>
      <li>
        <fbt desc="Rule number 8">
          We are not responsible for any injuries caused by our cats - they are
          very playful, and they do not mean it. Pay special attention to your
          kids. Feel free to ask for medical aid when needed.
        </fbt>
      </li>
      <li>
        <fbt desc="Rule number 9">
          Hygiene is important. Wash your hand when playing with our cats.
        </fbt>
      </li>
      <li>
        <fbt desc="Rule number 10">
          Please, follow our rules. Misbehaving guests will be asked to leave.
        </fbt>
      </li>
    </ol>
  );
}
