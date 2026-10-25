export interface ContentConfig {
  personName: string
  nicknameToHim: string
  senderNickname: string
  coreQuote: string
  subQuote: string

  sectionOne: {
    handwrittenIntro: string
    mainReveal: string
    supportingText: string
    buttonText: string
    hiddenStarMessage: string
  }

  sectionTwo: {
    mainHeading: string
    nextLine: string
    supportingMessage: string
    buttonText: string
  }

  sectionThree: {
    timelineHeading: string
    timelineSubheading: string
    chapters: Array<{
      tag: string
      title: string
      dateTag?: string
      text: string
      theme: 'almost' | 'ganpati' | 'twoweeks'
      quote: string
    }>
    timelineFooter: string
  }

  sectionFour: {
    heading: string
    subheading: string
    cards: Array<{
      id: number
      title: string
      text: string
      iconName: string
      tagline: string
      isSpecialFirsts?: boolean
      firstsTitle?: string
      firstsParagraphs?: string[]
    }>
  }

  sectionFive: {
    heading: string
    subheading: string
    envelopes: Array<{
      id: string
      title: string
      colorTheme: 'blush' | 'ivory' | 'burgundy'
      sealText: string
      letter: string
    }>
  }

  sectionSeven: {
    clueText: string
    buttonLabel: string
    starTrailSteps: string[]
    constellationRevealHeading: string
    sealedLetterLabel: string
    finalSecretMessage: string
  }

  sectionEight: {
    heading: string
    subheading: string
    buttonText: string
    wishResponseText: string
  }

  giftBoutique: {
    sectionTag: string
    heading: string
    supportingText: string
    progressTitle: string
    completedCelebration: string
    completedButtonText: string
    finalRevealButton: string
    finalRevealTitle: string
    finalRevealLetter: string
    gifts: Array<{
      id: string
      label: string
      subtitle: string
      iconType: 'letter' | 'universe' | 'hug' | 'firsts' | 'wish' | 'mystery'
      message: string
      buttonText?: string
    }>
  }

  sectionNine: {
    title: string
    fullLetter: string
    closingThought: string
    returnButton: string
  }
}

export const contentConfig: ContentConfig = {
  personName: "Parthiv",
  nicknameToHim: "babesssss",
  senderNickname: "your happiness",
  coreQuote: "Maybe the universe was waiting for the right moment to bring us together.",
  subQuote: "How can someone who entered your life so recently feel like someone your heart has known for so long?",

  sectionOne: {
    handwrittenIntro: "For my babesssss, the boy who somehow feels like home.",
    mainReveal: "Babesssss, I made a little universe for you.",
    supportingText: "Today is your day. But there is something else I have been wanting to tell you.",
    buttonText: "Enter Our Little Universe ♡",
    hiddenStarMessage: "Out of all the times our paths crossed, I am so glad life chose this moment for us.",
  },

  sectionTwo: {
    mainHeading: "Happiest Birthday, Parthiv.",
    nextLine: "My favourite human. My unexpected little miracle.",
    supportingMessage: "I am so glad our paths finally found each other.",
    buttonText: "There's a little story behind us...",
  },

  sectionThree: {
    timelineHeading: "Our Story, Written Somewhere in the Stars",
    timelineSubheading: "A cosmic coincidence, or maybe the universe's quiet timing...",
    chapters: [
      {
        tag: "CHAPTER ONE",
        title: "Before We Found Each Other",
        dateTag: "Crossed Paths",
        text: "We crossed paths so many times before we truly met. Maybe the universe was waiting for the right moment.",
        theme: "almost",
        quote: "Two orbits brushing against each other in the dark, waiting for the spark.",
      },
      {
        tag: "CHAPTER TWO",
        title: "That Ganpati Visarjan Day",
        dateTag: "Ganpati Visarjan",
        text: "Of all the days, somehow it was that day. I love believing that life brought us closer exactly when we were ready for it.",
        theme: "ganpati",
        quote: "Surrounded by golden lights and evening twilight, our story began.",
      },
      {
        tag: "CHAPTER THREE",
        title: "Two Weeks, Yet So Familiar",
        dateTag: "Two Weeks In",
        text: "How did two weeks become something that feels so familiar? With you, comfort came naturally, and our vibe just made sense.",
        theme: "twoweeks",
        quote: "Two weeks in human time. A lifetime in comfort.",
      },
    ],
    timelineFooter: "Maybe we were never strangers to the universe. Maybe we were just waiting for our moment.",
  },

  sectionFour: {
    heading: "Things I Love About Our Little World",
    subheading: "Short pages gathered from my heart, written just for you.",
    cards: [
      {
        id: 1,
        title: "YOUR COMFORT",
        tagline: "Safe & Gentle",
        iconName: "Feather",
        text: "With you, I can simply be myself.",
      },
      {
        id: 2,
        title: "OUR VIBE",
        tagline: "Effortless Harmony",
        iconName: "Sparkles",
        text: "We match each other's energy without even trying.",
      },
      {
        id: 3,
        title: "OUR TIMING",
        tagline: "The Universe's Clock",
        iconName: "Compass",
        text: "We crossed paths before, but this time we truly found each other.",
      },
      {
        id: 4,
        title: "OUR LITTLE FIRSTS",
        tagline: "Precious Memories",
        iconName: "Heart",
        isSpecialFirsts: true,
        firstsTitle: "Two Firsts, A Thousand Feelings ♡",
        text: "Some moments stay with you long after they are over.\n\nOur first hug — that feeling of being close to you, when for a little moment, everything felt so natural.\n\nAnd our first kiss… a little moment that became a memory I will always hold close to my heart.\n\nMaybe it was the beginning of something neither of us could fully explain. I just know that those moments became precious to me because they were with you, babesssss. ♡",
        firstsParagraphs: [
          "Some moments stay with you long after they are over.",
          "Our first hug — that feeling of being close to you, when for a little moment, everything felt so natural.",
          "And our first kiss… a little moment that became a memory I will always hold close to my heart.",
          "Maybe it was the beginning of something neither of us could fully explain. I just know that those moments became precious to me because they were with you, babesssss. ♡",
        ],
      },
      {
        id: 5,
        title: "OUR BEGINNING",
        tagline: "Unexpected Magic",
        iconName: "HeartHandshake",
        text: "Two weeks, so many feelings, and a connection I never expected to find.",
      },
      {
        id: 6,
        title: "OUR FUTURE",
        tagline: "Adventures Ahead",
        iconName: "Stars",
        text: "I hope we collect many more memories, laughs, and little moments together.",
      },
    ],
  },

  sectionFive: {
    heading: "Open These Whenever You Want",
    subheading: "Three little letters of love to hold onto whenever you need them.",
    envelopes: [
      {
        id: "miss-me",
        title: "Open when you miss me.",
        colorTheme: "blush",
        sealText: "Hug",
        letter: `Babesssss, whenever you miss me, picture me right next to you, smiling at you for no reason and probably annoying you a little.

No matter how busy or quiet the day gets, having you in my world makes everything feel warmer and lighter.

Sending you the biggest, tightest hug. ♡

— your happiness`,
      },
      {
        id: "need-comfort",
        title: "Open when you need comfort.",
        colorTheme: "ivory",
        sealText: "Peace",
        letter: `Hey babesssss.

You don't always have to have everything figured out or be strong all the time. You deserve peace, gentleness, and a space where you can simply breathe.

You gave me a comfort that feels so safe and effortless, and I hope I can always be that safe space for you too.

Take a gentle breath, okay? I'm always in your corner.

— your happiness ♡`,
      },
      {
        id: "how-we-happened",
        title: "Open when you wonder how we happened.",
        colorTheme: "burgundy",
        sealText: "Destiny",
        letter: `Do you ever think about all those times we crossed paths before we actually knew each other?

And then Ganpati Visarjan happened, and suddenly two weeks started feeling like years of comfort.

I don't know if it was fate, coincidence, or divine timing. I just know that in a universe full of possibilities, I am so grateful it was you.

— your happiness ♡`,
      },
    ],
  },

  sectionSeven: {
    clueText: "Babesssss, there is one more little thing hidden here for you...",
    buttonLabel: "Follow the little stars ♡",
    starTrailSteps: [
      "All those times our paths crossed before the timing was right...",
      "That one Ganpati Visarjan day when our real story began...",
      "Two weeks that felt like a comfort years in the making...",
      "The effortless vibe of simply being ourselves together...",
      "And now, you. Here. In my little universe.",
    ],
    constellationRevealHeading: "Maybe the universe was not making us wait. Maybe it was bringing us to the right moment.",
    sealedLetterLabel: "Only for Parthiv ♡",
    finalSecretMessage: `Babesssss,

If there is one thing I want you to remember today, it is how genuinely grateful I am that our paths finally found each other.

We crossed paths so many times before, but on that Ganpati Visarjan day, life brought us together at the right moment. In just two weeks, you became someone so familiar, comfortable, and precious to my heart.

Some connections don't need years to make sense. They just happen naturally when two people match each other's energy without even trying.

Happy Birthday, babesssss. Thank you for being you, and thank you, universe, for this timing.

Forever your happiness ♡`,
  },

  sectionEight: {
    heading: "One birthday. A thousand possibilities. A universe full of wishes.",
    subheading: "Make a wish, babesssss. I hope this year brings you the happiness, peace, and beautiful moments your heart deserves.",
    buttonText: "Send Your Wish Into the Universe ✨",
    wishResponseText: "I hope this year is gentle with your heart and generous with your dreams.",
  },

  giftBoutique: {
    sectionTag: "A Virtual Boutique for Babesssss 🎀",
    heading: "Okay, birthday boy... your happiness has a few surprises for you! 🎀",
    supportingText: "I couldn't wrap the whole universe for you, babesssss, so I made you a little world of surprises instead. Pick whatever makes you smile. ♡",
    progressTitle: "Your little collection of surprises",
    completedCelebration: "You found every little surprise, babesssss! Your happiness is officially smiling right now. 🥹♡",
    completedButtonText: "Open my favourite again",
    finalRevealButton: "One last thing from your happiness ♡",
    finalRevealTitle: "A Birthday Secret For Babesssss",
    finalRevealLetter: `If I could choose a gift for myself, it would be the chance to keep discovering all the little things that make you you.

But today is your birthday, babesssss, so all I really want is for you to feel loved, appreciated, and genuinely happy.

Thank you for becoming such a precious part of my story.

Happy Birthday, my favourite unexpected miracle.

Forever your happiness. ❤️`,
    gifts: [
      {
        id: "gift-letter",
        label: "A Little Letter From Me",
        subtitle: "Something I want you to know.",
        iconType: "letter",
        message: "Babesssss, if I could wrap one feeling and give it to you, it would be the feeling of being genuinely happy that our paths finally crossed. You have become such a precious part of my little world. ♡",
        buttonText: "Keep this little letter",
      },
      {
        id: "gift-universe",
        label: "A Universe Just for You",
        subtitle: "Because our story feels a little magical.",
        iconType: "universe",
        message: "Of all the times we crossed paths, I am so glad we found each other when we did. Maybe the universe really did have its own timing for us.",
        buttonText: "Keep this universe close ♡",
      },
      {
        id: "gift-hug",
        label: "Your Emergency Hug",
        subtitle: "Redeem whenever you need one.",
        iconType: "hug",
        message: "Babesssss, consider this your little virtual hug. No explanations needed, no words required. Just imagine me holding you close for a moment and reminding you that you deserve all the comfort and happiness in the world.",
        buttonText: "Send me another hug!",
      },
      {
        id: "gift-firsts",
        label: "Our Precious Firsts",
        subtitle: "Some moments stay with you.",
        iconType: "firsts",
        message: `Our first hug. Our first kiss. Two little moments that became precious memories because they were with you.

I don't think every meaningful feeling needs a thousand words. Some moments simply stay in your heart.

And these will always be special to me, babesssss. ♡`,
        buttonText: "Cherish this moment ♡",
      },
      {
        id: "gift-wish",
        label: "A Wish for Your New Year",
        subtitle: "Make a wish, birthday boy.",
        iconType: "wish",
        message: "I hope this year brings you closer to every dream you carry in your heart. May you find peace on difficult days, happiness in unexpected places, and countless reasons to be proud of yourself.",
        buttonText: "Make another wish ✨",
      },
      {
        id: "gift-mystery",
        label: "One Last Little Surprise",
        subtitle: "Babesssss, this one's a secret.",
        iconType: "mystery",
        message: `Surprise! If I could give you one thing beyond all these little gifts, it would be more moments together. More laughs, more silly conversations, more memories, and more reasons to smile because we found each other.

Your mystery gift is unlimited little moments with your happiness. ♡`,
        buttonText: "Claim my unlimited moments ♡",
      },
    ],
  },

  sectionNine: {
    title: "Before You Go, Babesssss...",
    fullLetter: `Babesssss,

It still amazes me how we crossed paths so many times before life finally brought us together.

From that Ganpati Visarjan day to becoming so close in just two weeks, everything about our story feels unexpectedly beautiful.

You make me feel comfortable, understood, and happy in a way that is difficult to explain. And our little firsts, our laughs, and the moments we have shared are already memories I hold close to my heart.

I do not know everything the future holds, but I know I am genuinely grateful that you are part of my life.

Happy Birthday, my favourite human.

Maybe it was timing. Maybe it was the universe. Either way, I am so glad it was you.

Forever your happiness ♡`,
    closingThought: "In a universe full of people, I am glad our paths finally found their way to each other.",
    returnButton: "Return to Our Little Universe ♡",
  },
}
