const Alglorithms = require('./Alglorithms');

//common
let alglorith = new Alglorithms();

//test 14
console.log(alglorith.longestCommonPrefix(["flower", "flow", "flight"]))

//test 26
let test26 = [1, 2, 3, 3, 4]
console.log(alglorith.removeDuplicates(test26), test26)

//test 102
let test102 = [3, 9, 20, null, null, 15, 7]
console.log(alglorith.binaryTreeLevelTraversal(test26), test26)

//test 58
let test58 = "Hello World"
console.log(alglorith.lengthOfLastWord(test58))

//test 46
let test46 = [1, 1, 2]
console.log(test46, JSON.stringify(alglorith.permute(test46)))

//test 7
let test7 = -1534236469;
console.log(alglorith.intergeReverse(test7))

//test27
let test27 = [3, 2, 2, 3];
console.log(alglorith.removeElement(test27, 3))

//test189
let test189 = [1, 2, 3, 4, 5];
console.log(alglorith.searchSpinArray(test189, 1))
console.log(Alglorithms.searchSpinArrayAnswerII(test189, 1))

//test33
let test33 = [3,1];
console.log(alglorith.SearchSpinArray(test33, 3))