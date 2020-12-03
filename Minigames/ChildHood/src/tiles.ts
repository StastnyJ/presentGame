class Tile {
  private shapes: boolean[][][];
  private actSahpe: number;

  constructor() {
    this.shapes = tileShapes[Math.floor(Math.random() * tileShapes.length)];
    this.actSahpe = 0;
  }

  public getShape = () => this.shapes[this.actSahpe];

  public getWidth = () => this.shapes[this.actSahpe][0].length;

  public getHeight = () => this.shapes[this.actSahpe].length;

  public isCovered = (x: number, y: number) => {
    if (x < 0 || y < 0) return false;
    if (y >= this.getHeight() || x >= this.getWidth()) return false;
    return this.getShape()[y][x];
  };

  public rotate = (availableSpace: number) => {
    const newIndex = (this.actSahpe + 1) % this.shapes.length;
    if (availableSpace >= this.shapes[this.actSahpe][0].length) this.actSahpe = newIndex;
  };
}

const tileShapes = [
  // TILE 0
  [
    [
      // ##
      //  ##
      [true, true, false],
      [false, true, true],
    ],
    [
      //  #
      // ##
      // #
      [false, true],
      [true, true],
      [true, false],
    ],
  ],
  // TILE 1
  [
    [
      //  ##
      // ##
      [false, true, true],
      [true, true, false],
    ],
    [
      // #
      // ##
      //  #
      [true, false],
      [true, true],
      [false, true],
    ],
  ],
  // TILE 2
  [
    [
      // ##
      // ##
      [true, true],
      [true, true],
    ],
  ],
  // TILE 3
  [
    [
      // #
      // #
      // ##
      [true, false],
      [true, false],
      [true, true],
    ],
    [
      //   #
      // ###
      [false, false, true],
      [true, true, true],
    ],
    [
      // ##
      //  #
      //  #
      [true, true],
      [false, true],
      [false, true],
    ],
    [
      // ###
      // #
      [true, true, true],
      [true, false, false],
    ],
  ],
  // TILE 4
  [
    [
      //  #
      //  #
      // ##
      [false, true],
      [false, true],
      [true, true],
    ],
    [
      // #
      // ###
      [true, false, false],
      [true, true, true],
    ],
    [
      // ##
      // #
      // #
      [true, true],
      [true, false],
      [true, false],
    ],
    [
      // ###
      //   #
      [true, true, true],
      [false, false, true],
    ],
  ],
  // TILE 5
  [
    [
      //  #
      // ##
      //  #
      [false, true],
      [true, true],
      [false, true],
    ],
    [
      //  #
      // ###
      [false, true, false],
      [true, true, true],
    ],
    [
      // #
      // ##
      // #
      [true, false],
      [true, true],
      [true, false],
    ],
    [
      // ###
      //  #
      [true, true, true],
      [false, true, false],
    ],
  ],
  // TILE 6
  [
    [
      //  ####
      [true, true, true, true],
    ],
    [
      // #
      // #
      // #
      // #
      [true],
      [true],
      [true],
      [true],
    ],
  ],
];
