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

    //189. 旋转数组

    /**
     * 
     * @param nums {[]}
     * @param target {number}
     * @return  {number}
     * @summary
     * 
     * 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
     * input: nums=[1,2,3,4,5,6,7],k = 3
     * result: [5,6,7,1,2,3,4]
     * 
     */
    //answer i 暴力法
    searchSpinArray(nums, target) {
        let len = nums.length;
        let k = target;
        if (k >= len) {
            k %= len;
        }
        while (k) {
            let previous = nums[len - 1];
            for (let i = 0; i < len; i++) {
                let temp = nums[i];
                nums[i] = previous;
                previous = temp;
            }
            k--;
        }
        return nums;
    }

    //answer ii 环形法
    static searchSpinArrayAnswerII(nums, target) {
        let len = nums.length;
        let k = target;
        if (k >= len) {
            k %= len;
        }
        let count = 0;
        for (let start = 0; count < len; start++) {
            //start：遍历索引  count：交换次数
            //nums[curr]...(k)..nums[next]
            let prev = nums[start];
            let current = start;
            do {
                let next = (k + current) % len;
                let temp = nums[next];
                //
                nums[next] = prev;
                prev = temp;
                //
                current = next;
                count++;
            } while (start !== current)
        }
        return nums;
    }
    //33. 搜索旋转排序数组

    /**
     * 
     * @param nums {[]}
     * @param target {number}
     * @return  {number}
     * @summary
     * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
     * 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。你可以假设数组中不存在重复的元素。你的算法时间复杂度必须是 O(log n) 级别。
     * input: nums = [4,5,6,7,0,1,2], target = 0 output: 4
     * 
     */


    //answer I leetcode official answer 
    SearchSpinArray(nums, target) {
        let len = nums.length;

        /**
         * 
         * @param  left {number} 
         * @param  right {number} 
         * 
         */
        let findTurningPoint = (nums, left, right) => {

            if (nums[left] < nums[right]) return left;
            while (left <= right) {
                let pivot = parseInt((left + right) / 2);
                if (nums[pivot] > nums[pivot + 1]) {
                    return pivot + 1;
                } else {
                    if (nums[pivot] < nums[left]) {
                        right = pivot - 1;
                    } else {
                        left = pivot + 1;
                    }
                }
            }
            return 0;
        }

        /**
         * 
         * @param  nums {[]}
         * @param  left {number} 
         * @param  right {number} 
         * 
         */

        let BinarySearchSpinArray = (nums, left, right) => {

            while (left <= right) {
                let mid = parseInt((right - left) / 2 + left);
                if (nums[mid] === target)
                    return mid;
                else {
                    if (target < nums[mid])
                        right = mid - 1;
                    else
                        left = mid + 1;
                }
            }
            return -1
        }

        if (len === 0) return -1;
        if (len === 1) return nums[0] == target ? 0 : -1;

        let turningPoint = findTurningPoint(nums, 0, len - 1);

        if (nums[turningPoint] === target) {
            return turningPoint;
        }
        if (turningPoint === 0) {
            return BinarySearchSpinArray(nums, 0, len - 1);
        }
        if (target >= nums[0]) {
            return BinarySearchSpinArray(nums, 0, turningPoint);
        } else {
            return BinarySearchSpinArray(nums, turningPoint, len - 1);
        }
    }
    //answer II
    SearchSpinArrayAnswerII(nums, target) {
        let len = nums.length;
        let high = len - 1;
        let low = 0;
        while (low < high) {
            let mid = parseInt((high - low) / 2 + low);
            if (nums[0] <= nums[mid] && (target > nums[mid] || target < nums[0])) {
                low = mid + 1;
            } else {
                if (target > nums[mid] && target < nums[0]) {
                    low = mid + 1
                } else {
                    high = mid;
                }
            }
        }
        return (low === high && nums[low] === target) ? low : -1;
        // let len = nums.length;
        // let high = len - 1;
        // let low = 0;
        // while (low <= high) {
        //     let mid = parseInt((high - low) / 2 + low);
        //     if (target === nums[mid]) return mid;
        //     if (nums[0] <= nums[mid] && (target > nums[mid] || target < nums[0])) {
        //         low = mid + 1;
        //     } else {
        //         if (target > nums[mid] && target < nums[0]) {
        //             low = mid + 1
        //         } else {
        //             high = mid - 1;
        //         }
        //     }
        // }
        // return -1;
    }

    /**
     * 
     * leetcode 15 三数之和
     * 
     * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
     * 注意：答案中不可以包含重复的三元组。
     * @param  nums {number []}
     * @returns {number[][]}
     * 
     */
    ThreeNumberSum(nums) {
        const len = nums.length;
        let res = [];
        if (nums === null || len < 3) return res;
        nums.sort((a, b) => a - b);
        for (let i = 0; i < len; i++) {
            if (nums[i] > 0) break;
            if (i >= 1 && nums[i] == nums[i - 1]) continue;
            let low = i + 1;
            let high = len - 1;
            while (low < high) {
                let tempSum = nums[i] + nums[low] + nums[high];
                if (tempSum === 0) {
                    res.push([nums[i], nums[low], nums[high]]);
                    while (low < high && nums[low] === nums[low + 1]) low++;
                    while (low < high && nums[high] === nums[high - 1]) high--;
                    low++;
                    high--;
                } else if (tempSum < 0) low++;
                else if (tempSum > 0) high--;
            }
        }
        return res;
    }

    /**
     * 
     * leetcode 704  
     * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
     * 
     * @param {*} nums 
     * @param {*} target 
     * 
     */

    static basicBinarySearch(nums, target) {
        let low = 0;
        let high = nums.length - 1;
        while (low <= high) {
            let mid = parseInt((high - low) / 2) + low;
            if (nums[mid] === target) {
                return mid;
            } else if (target > nums[mid]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    /**
     * 
     * leetcode 18 四数之和
     * 
     * 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？
     * 注意：找出所有满足条件且不重复的四元组。
     * @param  nums {number []}
     * @returns {number[][]}
     * 
     */
    static FourNumberSum(nums, target) {
        const len = nums.length;
        let res = [];
        nums.sort((a, b) => a - b);
        if (len < 4) return res;
        for (let a = 0; a < len - 3; a++) {
            if (a > 0 & nums[a] === nums[a - 1]) continue;
            for (let b = a + 1; b < len - 2; b++) {
                if (b > a + 1 & nums[b] === nums[b - 1]) continue;
                let c = b + 1;
                let d = len - 1;
                while (c < d) {
                    let tempSum = nums[a] + nums[b] + nums[c] + nums[d];
                    if (tempSum > target) {
                        d--;
                    } else if (tempSum < target) {
                        c++;
                    } else {
                        res.push([nums[a], nums[b], nums[c], nums[d]]);
                        while (c < d && nums[c] === nums[c + 1]) c++;
                        while (c < d && nums[d] === nums[d - 1]) d--;
                        c++;
                        d--;
                    }

                }
            }
        }
        return res;
    }

    /**
     * 
     * LeetCode 384
     * medium
     * 打乱一个没有重复元素的数组。
     * @param {*} nums 
     * 
     */
    static ArrayShuffle(nums) {
        this.origin = [...nums];

        this.ArrayShuffle.reset = (nums) => {
            return this.origin;
        };
        this.ArrayShuffle.shuffle = (nums) => {
            let n = nums.length;
            for (let i = 0; i < n; i++) {
                let rand = Math.floor(Math.random() * (i + 1));
                let temp = nums[rand];
                nums[rand] = nums[i];
                nums[i] = temp;
            }
            return nums;
        }

    }

    /**
     * 
     * leetcode 155
     * Easy
     * 
     * 设计一个支持 push，pop，top 操作，并能在常数时间内检索到最小元素的栈。
     * push(x) -- 将元素 x 推入栈中。
     * pop() -- 删除栈顶的元素.
     * top() -- 获取栈顶元素。
     * getMin() -- 检索栈中的最小元素。
     * @param {} x 
     * 
     */
    static minStack(x) {
        let stack = [];
        let helper = [];
        this.minStack.push = (x) => {
            stack.push(x);
            let len = helper.length;
            if (len === 0 || helper[len - 1] > x) {
                helper.push(x);
            } else {
                helper.push(helper[len - 1]);
            }
        }
        this.minStack.pop = () => {
            if (stack.length !== 0) {
                helper.pop();
                stack.pop();
            }
        }
        this.minStack.top = (x) => {
            let len = stack.length;
            return stack[len - 1];
        }
        this.minStack.getMin = (x) => {
            let len = helper.length;
            if (len !== 0) {
                return helper[len - 1];
            }
        }
        return this.minStack;
    }


}


module.exports = Alglorithms;