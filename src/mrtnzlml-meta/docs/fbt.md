---
id: fbt
title: FBT deep dive
sidebar_label: FBT deep dive
---

This page is about an [internationalization framework FBT](https://facebook.github.io/fbt/). Most of the information here can be found in the official documentation. This page doesn't deal with configuration and other project specifics. Instead, I am trying to show here a complex example sentence and how to deal with various situations that might occur in the wild.

Demo sentence used on this page is:

> **Peter submitted his proposal for this CONFERENCE.**

It's intentionally constructed to show as many FBT features as reasonably possible. Other forms of this sentece would be:

> **Jane submitted her 2 proposals for this CONFERENCE.**
>
> **Peter and Jane submitted their 5 proposals for this EVENT.**

Any other combinations should be taken into account as well. We should also take care of language specifics. In this case I will be using Czech language as it is my native language.

## Basic translation

Docs: https://facebook.github.io/fbt/docs/api_intro

Let's start with the basic sentence:

```jsx
<p>Peter submitted his proposal for this CONFERENCE.</p>
```

In order to translate this sentence, we have to mark it with FBT tags for extraction and translation:

```jsx
<p>
  <fbt desc="example sentence">Peter submitted his proposal for this CONFERENCE.</fbt>
</p>
```

Note that `desc` property is mandatory and helps to create a context for translators. Running FBT scripts (`fbt-manifest`, `fbt-collect`, and `fbt-translate`) will generate the following source JSON:

```json
{
  "phrases": [
    {
      "hashToText": {
        "BkPtoAzDzZOUhbmpP9OB2g==": "Peter submitted his proposal for this CONFERENCE."
      },
      "filepath": "src/AAA/BBB.js",
      "line_beg": 41,
      "col_beg": 8,
      "line_end": 41,
      "col_end": 92,
      "desc": "example sentence",
      "project": "",
      "type": "text",
      "jsfbt": "Peter submitted his proposal for this CONFERENCE."
    }
  ],
  "childParentMappings": {}
}
```

In the following snippets I will be omitting lines that are not important for these examples.

## Generic parameters

Docs: https://facebook.github.io/fbt/docs/params

Now, let's parametrise the previous sentence a little (we need to make the names variable basically). Without FBT we would simply write:

```jsx
<p>{authorName} submitted his proposal for this CONFERENCE.</p>
```

With FBT it's not much more different. The only difference is that we need to be wrapping these important sections in FBT tags. In case of params we would write:

```jsx
<p>
  <fbt desc="example sentence">
    <fbt:param name="authorName">{authorName}</fbt:param> submitted his proposal for this
    CONFERENCE.
  </fbt>
</p>
```

Let's see how would the generated source JSON change:

```json
{
  "phrases": [
    {
      "hashToText": {
        "Tc+/y4Q7YQCYeRBllF7HWA==": "{authorName} submitted his proposal for this CONFERENCE."
      },
      "filepath": "src/AAA/BBB.js",
      "type": "text",
      "jsfbt": "{authorName} submitted his proposal for this CONFERENCE."
    }
  ],
  "childParentMappings": {}
}
```

Not a big difference except translators now know that the author name is variable and should not be translated.

## Name parameters

Docs: https://facebook.github.io/fbt/docs/params#fbtname

We can improve the previous example using a special parameter for names `fbt:name`:

```jsx
<p>
  <fbt desc="example sentence">
    <fbt:name name="authorName" gender={IntlVariations.GENDER_MALE}>
      {authorName}
    </fbt:name>{' '}
    submitted his proposal for this CONFERENCE.
  </fbt>
</p>
```

The main difference between `fbt:param` and `fbt:name` is that the later requires explicit `gender` property.

Let's see how would the generated source JSON change in this case:

```json
{
  "phrases": [
    {
      "hashToText": {
        "Tc+/y4Q7YQCYeRBllF7HWA==": "{authorName} submitted his proposal for this CONFERENCE."
      },
      "filepath": "src/AAA/BBB.js",
      "type": "table",
      "jsfbt": {
        "t": {
          "*": "{authorName} submitted his proposal for this CONFERENCE."
        },
        "m": [
          {
            "token": "authorName",
            "type": 1
          }
        ]
      }
    }
  ],
  "childParentMappings": {}
}
```

Basically, FBT is suggesting that the author name is a token which can affect the final sentence based on the gender. This doesn't make much sense in English so let's switch to Czech language which has more complex grammar. Here is how we would translate these two sentences:

```text
Peter submitted his proposal for this CONFERENCE.
Jane submitted her proposal for this CONFERENCE.

   ↓ ↓ ↓

Peter odeslal jeho návrh pro tuto KONFERENCI.
Jane odeslala její návrh pro tuto KONFERENCI.
```

Let's ignore the pronouns (_his/her_ and _jeho/její_) for now. Do you see how in English there is simply "submitted" but in Czech language there are two forms: "odeslal" and "odeslala" depending on the gender? This is why we have to specify gender of the `fbt:name`. Translators can now create these two versions and FBT can use the right form based on the author gender. Read more about how does it work from the translator perspective in [token variations](#token-variations).

## Pronouns

Docs: https://facebook.github.io/fbt/docs/pronouns

We have to fix one thing. Currently, we can change only the author name which creates incorrect sentence for a female author:

```text
Peter submitted his proposal for this CONFERENCE.
Jane submitted his proposal for this CONFERENCE.
               ^^^ !
```

This is not correct. We have to use "her" for female authors. Marking the possessive pronoun will fix this:

```jsx
<p>
  <fbt desc="example sentence">
    <fbt:name name="authorName" gender={IntlVariations.GENDER_MALE}>
      {authorName}
    </fbt:name>{' '}
    submitted <fbt:pronoun type="possessive" gender={GenderConst.MALE_SINGULAR} /> proposal for this
    CONFERENCE.
  </fbt>
</p>
```

Let's see how the source JSON looks like now:

```json
{
  "phrases": [
    {
      "hashToText": {
        "+MbwgPU5XGTPebk0OPU93A==": "{authorName} submitted her proposal for this CONFERENCE.",
        "Tc+/y4Q7YQCYeRBllF7HWA==": "{authorName} submitted his proposal for this CONFERENCE.",
        "JE+VhkCmEG2BkAsdVqeZgg==": "{authorName} submitted their proposal for this CONFERENCE."
      },
      "filepath": "src/AAA/BBB.js",
      "type": "table",
      "jsfbt": {
        "t": {
          "*": {
            "1": "{authorName} submitted her proposal for this CONFERENCE.",
            "2": "{authorName} submitted his proposal for this CONFERENCE.",
            "*": "{authorName} submitted their proposal for this CONFERENCE."
          }
        },
        "m": [
          {
            "token": "authorName",
            "type": 1
          },
          null
        ]
      }
    }
  ],
  "childParentMappings": {}
}
```

That looks more interesting. Now we know that the translators must translate 3 versions for 3 different pronouns. Moreover, they can create additional variants based on the author gender as mentioned before. From now on I will be showing only `hashToText` parts of the source JSON because it's getting long.

## Plurals

Docs: https://facebook.github.io/fbt/docs/plurals

At this point we can easily create the following sentences:

```text
Peter submitted his proposal for this CONFERENCE.
Jane submitted her proposal for this CONFERENCE.
Peter and Jane submitted their proposal for this CONFERENCE.
```

What if they can submit more proposals at the same time? Let's add a plural:

```jsx
<p>
  <fbt desc="example sentence">
    <fbt:name name="authorName" gender={IntlVariations.GENDER_MALE}>
      {authorName}
    </fbt:name>{' '}
    submitted <fbt:pronoun type="possessive" gender={GenderConst.MALE_SINGULAR} />{' '}
    <fbt:plural count={numberOfProposals} showCount="ifMany" many="proposals">
      proposal
    </fbt:plural>{' '}
    for this CONFERENCE.
  </fbt>
</p>
```

Let's have a look what FBT prepares for us now:

```json
{
  "hashToText": {
    "jyHDRYsQ+m5PXYWTUtXklw==": "{authorName} submitted her {number} proposals for this CONFERENCE.",
    "+MbwgPU5XGTPebk0OPU93A==": "{authorName} submitted her proposal for this CONFERENCE.",
    "2wrhfp3iomqILRKccafCQA==": "{authorName} submitted his {number} proposals for this CONFERENCE.",
    "Tc+/y4Q7YQCYeRBllF7HWA==": "{authorName} submitted his proposal for this CONFERENCE.",
    "9yFYnIAMehHw7DzazATKZw==": "{authorName} submitted their {number} proposals for this CONFERENCE.",
    "JE+VhkCmEG2BkAsdVqeZgg==": "{authorName} submitted their proposal for this CONFERENCE."
  }
}
```

This makes it much easier to prepare translations for all possible combinations that might occur in our application.

## Enumerations

Docs: https://facebook.github.io/fbt/docs/enums

We are missing one last thing and that is to make the CONFERENCE variable and offer either "conference" or a generic "event". For this we can use FBT enum:

```jsx
<p>
  <fbt desc="example sentence">
    <fbt:name name="authorName" gender={IntlVariations.GENDER_MALE}>
      {authorName}
    </fbt:name>{' '}
    submitted <fbt:pronoun type="possessive" gender={GenderConst.MALE_SINGULAR} />{' '}
    <fbt:plural count={numberOfProposals} showCount="ifMany" many="proposals">
      proposal
    </fbt:plural>{' '}
    for this <fbt:enum enum-range={['CONFERENCE', 'EVENT']} value={'EVENT'} />.
  </fbt>
</p>
```

Let's see how does the final source JSON looks like:

```json
{
  "hashToText": {
    "jyHDRYsQ+m5PXYWTUtXklw==": "{authorName} submitted her {number} proposals for this CONFERENCE.",
    "0FmkT19Bu3RxFgWGsfPEPQ==": "{authorName} submitted her {number} proposals for this EVENT.",
    "+MbwgPU5XGTPebk0OPU93A==": "{authorName} submitted her proposal for this CONFERENCE.",
    "b/rkZmFY4XwiSpEtJdEtmg==": "{authorName} submitted her proposal for this EVENT.",
    "2wrhfp3iomqILRKccafCQA==": "{authorName} submitted his {number} proposals for this CONFERENCE.",
    "VAzb5R7ojpl90WXneGW7rg==": "{authorName} submitted his {number} proposals for this EVENT.",
    "Tc+/y4Q7YQCYeRBllF7HWA==": "{authorName} submitted his proposal for this CONFERENCE.",
    "veYg8sN1gP/7pl8f+w/dSA==": "{authorName} submitted his proposal for this EVENT.",
    "9yFYnIAMehHw7DzazATKZw==": "{authorName} submitted their {number} proposals for this CONFERENCE.",
    "cpsQQ5qrPeslTk6u8vH5xQ==": "{authorName} submitted their {number} proposals for this EVENT.",
    "JE+VhkCmEG2BkAsdVqeZgg==": "{authorName} submitted their proposal for this CONFERENCE.",
    "c9PogXTiVvaGbB5fdV8AJw==": "{authorName} submitted their proposal for this EVENT."
  }
}
```

All possible combinations are available for translations. We can change the name, possessive pronouns, number of proposals and conference/event. At the beginning I wrote that we want to achieve the following sentences:

> **Peter submitted his proposal for this CONFERENCE.**
>
> **Jane submitted her 2 proposals for this CONFERENCE.**
>
> **Peter and Jane submitted their 5 proposals for this EVENT.**

All of them should be possible now. Can you find the patterns?

## Token variations

Token variations are probably the most difficult to understand when it comes to FBT. In a nutshell, translators take the hashes and their respective strings and translate them (using some tool like Crowdin for example). The tool then exports translated JSON which is being used to generate the final strings used in the application.

Let's take the following source string for example:

```json
{
  "hashToText": {
    // …
    "2wrhfp3iomqILRKccafCQA==": "{authorName} submitted his {number} proposals for this CONFERENCE."
    // …
  }
}
```

I purposefully chose a sentence with plurals. In English, there are no complications. However, other languages have multiple plurals. For example, Czech language has 4 kinds of plurals. To simplify the situation I will focus only on 2 of them.

For 2-4 proposals the Czech translation would be:

```text
{authorName} odeslal jeho {number} návrhy pro tuto KONFERENCI.
```

For 5 and more proposal the Czech translations would be:

```text
{authorName} odeslal jeho {number} návrhů pro tuto KONFERENCI.
```

Notice how the _návrhy/návrhů_ changed.

Your translators should know this and they will suggest these 2 possible translations. Now the question is: how should we feed this back to FBT? Normally, this is how the translation payload (coming from Crowdin for example) looks like:

```json
{
  "2wrhfp3iomqILRKccafCQA==": {
    "tokens": [],
    "types": [],
    "translations": [
      {
        "translation": "{authorName} odeslal jeho {number} návrhy pro tuto KONFERENCI.",
        "variations": []
      }
    ]
  }
}
```

I am intentionally showing only one variant which is not correct. To specify multiple variants, we have to say which token is the one that affects the sentence, what kind of token is it and finally the variants. Something like this:

```json
{
  "2wrhfp3iomqILRKccafCQA==": {
    "tokens": ["number"],
    "types": [28], // magic for "number" token type
    "translations": [
      {
        "translation": "{authorName} odeslal jeho {number} návrhy pro tuto KONFERENCI.",
        "variations": [20] // magic for "FEW"
      },
      {
        "translation": "{authorName} odeslal jeho {number} návrhů pro tuto KONFERENCI.",
        "variations": [24] // magic for "OTHER"
      }
    ]
  }
}
```

You can find what all these magic numbers mean in the [official documentation](https://facebook.github.io/fbt/docs/translating#variation-types) (you are not going to write them manually). Tl;dr: first variant is for "a few" proposals and the second one is for any other number of proposals.

The cool thing about FBT is that it actually understands Czech grammar and it knows that "a few" in czech means 2-4 and "other" means 5-∞. How? It's described [here in CLDR](https://unicode-org.github.io/cldr-staging/charts/latest/supplemental/language_plural_rules.html#cs).

### Variations based on subject

Docs: https://facebook.github.io/fbt/docs/implicit_params#the-hidden-__subject__-token

Let's try something different. Try to translate a sentence "They are tall.":

```jsx
<p>
  <fbt desc="example sentence">They are tall.</fbt>
</p>
```

First, we might think that we should mark "they" as a subject pronoun (see [pronouns](#pronouns)). However, that would generate the following combinations:

```json
{
  "hashToText": {
    "plsTE77FfHc1O8Zfg4LJZQ==": "She are tall.",
    "qTFkaLPeF+SXLrXArd8cRA==": "He are tall.",
    "HzO1G9M6ckGui+m5fEnQvw==": "They are tall."
  }
}
```

2 out of 3 are invalid sentences even in English - not great. We should always aim to generate valid English sentences. Instead of using `fbt:pronoun`, we can leave the sentence as is and specify what is the subject we are talking about like so:

```jsx
<p>
  <fbt desc="example sentence" subject={IntlVariations.GENDER_UNKNOWN}>
    They are tall.
  </fbt>
</p>
```

The source JSON would still contain only this one sentence. BUT, this gives us the opportunity to create variations based on the subject. Our translation program should return something like this:

```json
{
  "jPVht2gdBhQCq3YYDmqTng==": {
    "tokens": ["__subject__"], // special token for subject variations
    "types": [3], // magic for "gender" token type
    "translations": [
      {
        "translation": "He is tall.",
        "variations": [1] // magic for "male"
      },
      {
        "translation": "She is tall.",
        "variations": [2] // magic for "female"
      }
    ]
  }
}
```

FBT will now use the correct variant based on the specified subject gender. So for example:

```jsx
<p>
  <fbt desc="example sentence" subject={IntlVariations.GENDER_MALE}>
    They are tall.
  </fbt>
</p>
```

Returns `He is tall.` and `IntlVariations.GENDER_FEMALE` returns `She is tall.` as expected.

### Variations based on the viewing user

Docs: https://facebook.github.io/fbt/docs/implicit_params#the-hidden-__viewing_user__-token

Similarly to the `__subject__` above, you can also create variants based on the gender of the viewing user. For example, in Hebrew some command verbs depend on the gender on the viewing user. The principle is the same except it's necessary to use a special token `__viewing_user__`.

This use-case is probably quite rare in small applications.

### Variations based on multiple tokens

:::info todo
TODO
:::

## Additional info / caveats

1. FBT is built for extracting English source strings. It doesn't work well for other languages.
2. FBT locales **must** be in a format `en_US` (with underscore) otherwise variations will not work correctly.
3. FBT requires custom JSX transform that is basically non-standard (see lowercase `jsx` tag and namespaces `jsx:plural` and similar). This can create issues with some external tools. Issue: https://github.com/facebook/fbt/issues/202
4. FBT supports limited set of pronouns. It doesn't support pronouns like _ze/zir/zirself_ for example and many others.
