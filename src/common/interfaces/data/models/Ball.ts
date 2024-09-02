

/**
 * Interface for a pokeball
 */
export interface Ball<Id extends Ball.BallId> {

  /**
   * The id of the ball
   */
  readonly id: Id;

  /**
   * The name of the ball
   */
  readonly name: `${string} Ball`;

  /**
   * Whether the ball is a Hisui ball
   */
  readonly isHisui?: true;
}

export namespace Ball {

  /**
   * The ids of the balls
   */
  export const ballIds = [
    "master",
    "ultra",
    "great",
    "poke",
    "safari",
    "net",
    "dive",
    "nest",
    "repeat",
    "timer",
    "luxury",
    "premier",
    "dusk",
    "heal",
    "quick",
    "cherish",
    "fast",
    "level",
    "lure",
    "heavy",
    "love",
    "friend",
    "moon",
    "sport",
    "dream",
    "beast",
    "strange",
    "poke_h",
    "great_h",
    "ultra_h",
    "feather_h",
    "wing_h",
    "jet_h",
    "heavy_h",
    "leaden_h",
    "gigaton_h",
    "origin_h"
  ] as const satisfies string[];


  /**
   * The id of a ball
   */
  export type BallId = typeof ballIds[number];


  /**
   * The balls in the game
   */
  export const balls: {
    readonly [key in BallId]: Ball<key>;
  } = {
    master: {
      id: "master",
      name: "Master Ball"
    },
    ultra: {
      id: "ultra",
      name: "Ultra Ball"
    },
    great: {
      id: "great",
      name: "Great Ball"
    },
    poke: {
      id: "poke",
      name: "Poké Ball"
    },
    safari: {
      id: "safari",
      name: "Safari Ball"
    },
    net: {
      id: "net",
      name: "Net Ball"
    },
    dive: {
      id: "dive",
      name: "Dive Ball"
    },
    nest: {
      id: "nest",
      name: "Nest Ball"
    },
    repeat: {
      id: "repeat",
      name: "Repeat Ball"
    },
    timer: {
      id: "timer",
      name: "Timer Ball"
    },
    luxury: {
      id: "luxury",
      name: "Luxury Ball"
    },
    premier: {
      id: "premier",
      name: "Premier Ball"
    },
    dusk: {
      id: "dusk",
      name: "Dusk Ball"
    },
    heal: {
      id: "heal",
      name: "Heal Ball"
    },
    quick: {
      id: "quick",
      name: "Quick Ball"
    },
    cherish: {
      id: "cherish",
      name: "Cherish Ball"
    },
    fast: {
      id: "fast",
      name: "Fast Ball"
    },
    level: {
      id: "level",
      name: "Level Ball"
    },
    lure: {
      id: "lure",
      name: "Lure Ball"
    },
    heavy: {
      id: "heavy",
      name: "Heavy Ball"
    },
    love: {
      id: "love",
      name: "Love Ball"
    },
    friend: {
      id: "friend",
      name: "Friend Ball"
    },
    moon: {
      id: "moon",
      name: "Moon Ball"
    },
    sport: {
      id: "sport",
      name: "Sport Ball"
    },
    dream: {
      id: "dream",
      name: "Dream Ball"
    },
    beast: {
      id: "beast",
      name: "Beast Ball"
    },
    strange: {
      id: "strange",
      name: "Park/Strange Ball"
    },
    poke_h: {
      id: "poke_h",
      name: "Poke Ball",
      isHisui: true
    },
    great_h: {
      id: "great_h",
      name: "Great Ball",
      isHisui: true
    },
    ultra_h: {
      id: "ultra_h",
      name: "Ultra Ball",
      isHisui: true
    },
    feather_h: {
      id: "feather_h",
      name: "Feather Ball",
      isHisui: true
    },
    wing_h: {
      id: "wing_h",
      name: "Wing Ball",
      isHisui: true
    },
    jet_h: {
      id: "jet_h",
      name: "Jet Ball",
      isHisui: true
    },
    heavy_h: {
      id: "heavy_h",
      name: "Heavy Ball",
      isHisui: true
    },
    leaden_h: {
      id: "leaden_h",
      name: "Leaden Ball",
      isHisui: true
    },
    gigaton_h: {
      id: "gigaton_h",
      name: "Gigaton Ball",
      isHisui: true
    },
    origin_h: {
      id: "origin_h",
      name: "Origin Ball",
      isHisui: true
    }
  };

}

