/**
* The Loading State is going to be used to load in all of the in-game assets that we need in game.
*
* Because in this blueprint there is only a single "hidden object" section we are going to load in all of
* the asset's at this point.
*
* If you have multiple states however, I would recommend have loading the other graphics as they are required by their states,
* Otherwise the loading times maybe a bit long and it is not the most optimal solution.
*
*/

/**
* Since we want to use the custom Kiwi.JS loader with the bobing kiwi/html5 logo and everything. We need to extend the KiwiLoadingScreen State.
* The KiwiLoadingScreen State is an extentsion of a normal State but it has some custom code to handle the loading/bobbing/fading of all the items, so if you override a method (like the preload) for example just make sure you call the super method.
*
* The parameters we are passing into this method are as ordered.
* 1 - name {String} Name of this state.
* 2 - stateToSwitch {String} Name of the state to switch to AFTER all the assets have loaded. Note: The state you want to switch to should already have been added to the game.
* 3 - dimensions {Object} A Object containing the width/height that the game is to be. For example {width: 1024, height: 768}
* 4 - subfolder {String} The folder that the loading graphics are located at.
*/
var LoadingState = new KiwiLoadingScreen('LoadingState',  'IntroState', {width:768, height: 1024}, 'assets/img/loading/');

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
* This preload method is responsible for preloading all your in game assets.
* Since we are extending the KiwiLoadingScreen we need to make sure we call the preload method on the KiwiLoadingScreen.
* @method preload
* @private
*/
LoadingState.preload = function () {
  /*
  let hiddenOjbectImages = [
    "bee",
    "bird",
    "bunny",
    "car",
    "chalice",
    "coin",
    "crab",
    "fish",
    "football",
    "gourd",
    "pencil",
    "seal",
    "skull",
    "swan",
    "tree",
    "umbrella",
    "violin"
  ];
  */
  let hiddenOjbectImages = [
    "bottle",
    "cup",
    "flashlight",
    "pencil",
    "spoon",
    "stapler",
    "sunglasses",
    "wrench",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7"
  ];

  //Create an object to hold the name of the images and number of objects in
  // this game instance.
  SharedData.gameInstanceData = {};

  //Randomize the list so we get a unique set of objects each time
  let shuffledHiddenObjectImages = shuffle(hiddenOjbectImages);

  //Make sure to call the super at the top.
  //Otherwise the loading graphics will load last, and that defies the whole point in loading them.
  KiwiLoadingScreen.prototype.preload.call(this);

  //Decide how many objects will be hidden in the game instance
  let numObjects = 6;

  //Store this stuff away for use in playState
  SharedData.gameInstanceData.hiddenObjectImages = shuffledHiddenObjectImages;
  SharedData.gameInstanceData.numObjects = numObjects;

  this.addImage('bg', 'assets/img/bg2.png');
  this.addImage('UI_btn', 'assets/img/UI_btn.png');
  this.addImage('hint_btn', 'assets/img/hint.png');
  for (i=0; i < SharedData.gameInstanceData.numObjects; i++) {
    let s = SharedData.gameInstanceData.hiddenObjectImages[i];
    this.addImage(`hidden_${s}`, `assets/img/200/${s}.png`);
    this.addImage(`UI_${s}`, `assets/img/icon/UI_${s}.png`);
  }
};
