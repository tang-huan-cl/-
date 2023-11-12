
//  给定两个大小为 m 和 n 的有序数组 nums1 和 nums2, 请找出这两个有序数组的中位数。要求算法的时间复杂 度为 O(log(m+n))。

// 示例 1： nums1 = [1, 3] nums2 = [2] 中位数是 2.0
// 示例 2： nums1 = [1, 2] nums2 = [3, 4] 中位数是(2 + 3) / 2 = 2.5

const findMedianSortedArrays = function( nums1, nums2 ) {
    const lenN1 = nums1.length;
    console.log('---------------->1: ', lenN1);
    const lenN2 = nums2.length;
    console.log('---------------->2: ', lenN2);
    const median = Math.ceil((lenN1 + lenN2 + 1) / 2); 
    console.log('---------------->3: ', median);
    const isOddLen = (lenN1 + lenN2) % 2 === 0; 
    console.log('---------------->4: ', isOddLen);
    const result = new Array(median); 
    console.log('---------------->5: ', result);
    let i = 0; // pointer for nums1 
    let j = 0; // pointer for nums2
    for (let k = 0; k < median; k++) { 
        if (i < lenN1 && j < lenN2) { 
            // tslint:disable-next-line:prefer-conditional-expression 
            if (nums1[i] < nums2[j]) { 
                result[i + j] = nums1[i++]; 
            } else { 
                result[i + j] = nums2[j++]; 
            } 
        } else if (i < lenN1) { 
            result[i + j] = nums1[i++]; 
        } else if (j < lenN2) { 
            result[i + j] = nums2[j++]; 
        } 
    }

    if(isOddLen) { 
        return (result[median - 1] + result[median - 2]) / 2; 
    } else { 
        return result[median - 1]; 
    } 
};

const nums1 = [1, 2, 7, 10] ,nums2 = [3, 4, 9, 18];

const v = findMedianSortedArrays( nums1, nums2 );

console.log('---------------->res: ', v);



