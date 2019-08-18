class Alglorithms {


    constructor(params) {
        this.params = params
    }

    /**
     *
     * @param strs {[]}
     * leetcode 
     * 14  最长公共前缀
     * longestCommonPrefix(String [] str)
     */
    longestCommonPrefix(strs) {

        //answer i 水平扫描法
        // if (strs.length === 0) return '';
        // let prefix = strs[0];
        // for (let i = 1; i < strs.length; i++) {
        //     while (strs[i].indexOf(prefix) !== 0) {
        //         prefix = prefix.substring(0, prefix.length - 1);
        //         if (!prefix) return "";
        //     }
        // }
        // return prefix;

        //answer ii 垂直扫描法
        if (strs.length === 0 || !strs) return '';
        for (let i = 0; i < strs[0].length; i++) {
            let currentChar = strs[0].charAt(i);
            for (let j = 1; j < strs.length; j++) {
                if (i === strs[j].length || strs[j].charAt(i) !== currentChar) {
                    return strs[0].substring(0, i);
                }
            }
        }
        return strs[0];
    }

    // 26. 删除排序数组中的重复项
    removeDuplicates(nums) {
        if (nums.length == 0) return 0;
        let i = 0;
        for (let j = 1; j < nums.length; j++) {
            if (nums[j] !== nums[i]) {
                nums[++i] = nums[j];
            }
        }
        return i + 1;
    }
    //102. 二叉树的层次遍历
    binaryTreeLevelTraversal(root) {
        let levels = [];
        if (!root) return levels;
        let LevelTraversal = (node, level) => {

            if (levels.length <= level) {
                levels.push([]);
            }
            levels[level].push(node.val);

            if (node.left)
                LevelTraversal(node.left, level + 1);
            if (node.right)
                LevelTraversal(node.right, level + 1);
        }
        LevelTraversal(root, 0);
        return levels;
    }
    //58. 最后一个单词的长度
    lengthOfLastWord(str) {
        let end = 0
        if (str.length) {
            end = str.length - 1;
        } else {
            return 0;
        }
        while (end >= 0 && str.charAt(end) === ' ') {
            end--;
        }
        let start = end;
        while (start >= 0 && str.charAt(start) !== ' ') {
            start--;
        }
        return end - start;
    };

    //46. 全排列
    //answer i 回溯法
    permute(nums) {

        let output = [];
        let nums_lst = [];

        for (let num of nums) {
            nums_lst.push(num);
        }

        let swap = (nums, index1, index2) => {
            if (index1 == index2) {
                return;
            }
            let temp = nums[index1];
            nums[index1] = nums[index2];
            nums[index2] = temp;
        }

        let backtrack = (n, [...nums], output, first) => {
            if (first === n) {
                output.push(nums)
            }
            for (let i = first; i < n; i++) {
                // place i-th integer first 
                // in the current permutation
                console.log('正序:', first, i)
                swap(nums, first, i);
                // use next integers to complete the permutations
                backtrack(n, nums, output, first + 1);
                // backtrack
                console.log('递归:', first, i)
                swap(nums, first, i);
            }

        }

        let n = nums.length;
        backtrack(n, nums_lst, output, 0);
        return output;
    }

    //7. 整数反转
    intergeReverse(x) {
        let rev = 0;
        const MAX_VALUE = 2 ** 31 - 1;
        const MIN_VALUE = -(2 ** 31 + 1);
        while (x !== 0) {
            let units = x % 10;
            x = parseInt(x / 10);
            if (rev > MAX_VALUE / 10 || (rev === MAX_VALUE / 10 && units === 7)) return 0;
            if (rev < MIN_VALUE / 10 || (rev === MIN_VALUE / 10 && units === -8)) return 0;
            rev = rev * 10 + units;
        }
        return rev;
    }


    //27. 移除元素
    removeElement(nums, val) {
        let i = 0;
        for (let j = 0; j < nums.length; j++) {
            if (nums[j] !== val) {
                nums[i] = nums[j];
                i++;
            }
        }
        return i;
    }

}

module.exports = Alglorithms;