/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2021-04-26 17:48:11
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2021-04-26 22:37:15
 * @Description: file content
 * @FilePath: \requirejs\js\red.js
 */
define(['blue'], (blue) => {
    blue.getBlue()
    return {
        getRed: () => {
            console.log('red...');
        }
    }
});