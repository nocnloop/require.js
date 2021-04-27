/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2021-04-26 23:02:40
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2021-04-27 09:13:32
 * @Description: file content
 * @FilePath: \requirejs\js\hybrid.js
 */

define(['red'], (red) => {
    red.getRed('hybrid')
    return {
        getHybrid: () => {
            console.log('hybrid...');
        }
    }
})