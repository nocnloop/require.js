/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2021-04-26 23:02:40
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2021-04-26 23:03:42
 * @Description: file content
 * @FilePath: \requirejs\js\hybrid.js
 */

define(['red'], (red) => {
    red.getRed()
    return {
        getHybrid: () => {
            console.log('hybrid...');
        }
    }
})