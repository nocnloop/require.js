/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2021-04-26 09:21:55
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2021-04-27 09:13:44
 * @Description: file content
 * @FilePath: \requirejs\js\log.js
 */

define(['red'], (red) => {
    red.getRed('log');
    return {
        getLog: () => {
            console.log('Hello World');
        }
    }
});
