const DIRECTION_RIGHT = 0,
      DIRECTION_UP = 90,
      DIRECTION_LEFT = 180,
      DIRECTION_DOWN = 270;

const KEYCODE_ESC = 27,
      KEYCODE_ARROW_UP = 38,
      KEYCODE_ARROW_DOWN = 40,
      KEYCODE_ARROW_LEFT = 37,
      KEYCODE_ARROW_RIGHT = 39;

const CELL_ACCURACY_FACTOR = 0.5;

const ACTOR_SPEED = 150,
      ACTOR_SPEED_LEVEL_FACTOR = 0.02;

const ENEMY_SPEED_FACTOR = 1,
      ENEMY_PRISON_DOTS_THRESHOLD = 15;

const PLAYER_SPEED_FACTOR = 1.05;

const SHADOW_SPEED_THRESHOLD_DOTS = 80,
      SHADOW_SPEED_THRESHOLD_FACTOR = 1.05;

const CHASE_DURATION = 15,
      CHASE_DURATION_LEVEL_FACTOR = 1;

const SCATTER_MAX_COUNT = 4,
      SCATTER_DURATION = 7,
      SCATTER_DURATION_LEVEL_FACTOR = 0.5,
      SCATTER_DURATION_MIN = 0.5;

const FRIGHT_DURATION = 7,
      FRIGHT_DURATION_LEVEL_FACTOR = 0.5,
      FRIGHT_DURATION_MIN = 0.5,
      FRIGHT_SPEED_FACTOR = 0.9;

const DEAD_SPEED_FACTOR = 1.3;

const PRISON_MAX_DELAY = 4;

const ENERGIZER_SPEED_FACTOR = 1.2,
      ENERGIZER_SCORE_AMOUNT = 50,
      ENERGIZER_BONUS_SCORE = 200;

const BONUS_BONUS_SCORE = 200,
      BONUS_DURATION = 7;

const TARGET_SPEED_DEBUFF_FACTOR = 0.85,
      TARGET_SPEED_DEBUFF_DURATION = 0.4;

const SLOWDOWN_SPEED_DEBUFF_FACTOR = 0.7,
      SLOWDOWN_SPEED_DEBUFF_DURATION = 0.3;

const DOT_SCORE_AMOUNT = 10;

const GAME_BASE_LIVES = 3,
      GAME_BASE_LEVEL = 1;

const MAPS = [
  {
    name: "Default",
    tiledmap: res.default_level_tilemap_tmx,
    background: res.default_level_background_png
  }
];

const SOUNDS_DEAD_BACKGROUND = 0,
      SOUNDS_ENERGIZE_BACKGROUND = 1,
      SOUNDS_DEFAULT_BACKGROUND = 2;
