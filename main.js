let spanName = document.querySelector(".info-container .name span");

document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What's your name?");
  if (yourName == null || yourName == "") {
    spanName.append("UnKnown");
  } else {
    spanName.append(yourName);
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blocksCountainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksCountainer.children);

let orderRange = [...Array(blocks.length).keys()];
// Another Way
// let orderRange2 = Array.from(Array(blocks.length).keys());
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);
// Add order Css Property to game blocks

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  // Add click Event
  block.addEventListener("click", function () {
    // trigger the flip block function
    flipBlock(block);
  });
});

// Flip Block Fucntion
function flipBlock(selectedBlock) {
  // add class is-flipped
  selectedBlock.classList.add("is-flipped");

  // collect all flip card
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains(`is-flipped`)
  );

  // if theres two selcted blocks
  if (allFlippedBlocks.length === 2) {
    // console.log("two flipped block selected");

    // stop clicking function
    stopClicking();
    // check Matched Block Fucntion
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function success(boxs) {
  let boxshasmatch = boxs.filter((box) => {
    return box.classList.contains("has-match");
  });

  console.log(boxshasmatch.length);

  if (boxshasmatch.length === boxs.length) {
    let playagain = document.querySelector(".layer-win .bg-h2-win .playagain");
    document.querySelector(".layer-win").classList.add("win");
    playagain.addEventListener("click", () => {
      window.location.reload();
    });
  }
}

// check matched block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.techonolgy === secondBlock.dataset.techonolgy) {
    firstBlock.classList.remove(`is-flipped`);
    secondBlock.classList.remove(`is-flipped`);
    firstBlock.classList.add(`has-match`);
    secondBlock.classList.add(`has-match`);

    success(blocks);

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) - 1;

    if (triesElement.innerHTML == 0) {
      let layer = document.querySelector(".layer");

      layer.classList.add("show");
      document.getElementById("fail").pause();

      document.getElementById("lose").play();
    }

    const btnReTry = document.querySelector(".layer .bg-h2 button");

    btnReTry.addEventListener("click", () => {
      window.location.reload();
    });

    setTimeout(() => {
      firstBlock.classList.remove(`is-flipped`);
      secondBlock.classList.remove(`is-flipped`);
    }, duration);
    document.getElementById("fail").play();
  }
}

function stopClicking() {
  // Add class No Cliicking on Main Container
  blocksCountainer.classList.add("no-clicking");

  setTimeout(() => {
    // remove class No Clicking After the duration
    blocksCountainer.classList.remove("no-clicking");
  }, duration);
}

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // get random element
    random = Math.floor(Math.random() * current);

    // decrease length by one
    current--;

    // [1] save current element in stash
    temp = array[current];

    // [2] current element = Randome Element
    array[current] = array[random];

    // [3] random element = get element from stash

    array[random] = temp;
  }

  return array;
}
