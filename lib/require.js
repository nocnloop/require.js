/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2021-04-26 09:14:34
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2021-04-26 23:43:26
 * @Description: file content
 * @FilePath: \requirejs\lib\require.js
 */
; (
    function () {
        // 模块缓存
        const moduleCache = {};

        console.log(moduleCache);

        // 基础配置
        const baseConfig = {
            paths: {}
        };

        // 获取模块地址
        const getUrl = (dependName) => {
            return baseConfig.paths[dependName]
        }

        // 加入缓存
        const addCache = (arg) => {

            const module = moduleCache[arg.moduleName]

            if (!module) {
                moduleCache[arg.moduleName] = {
                    name: arg.moduleName,
                    status: "loading",
                    callback: arg.callback,
                    export: null,
                    depends: arg.depends ? arg.depends : [],
                    parent: arg.parentModule ? [arg.parentModule] : []
                }
            } else {
                arg.status && (module.status = arg.status)
                arg.callback && (module.callback = arg.callback)
                arg.parentModule && module.parent.push(arg.parentModule)
                arg.depends && module.depends.push(arg.depends)
            }


        }

        // 加载所依赖的模块
        const loadDepend = (moduleName, parentModule) => {
            if (!moduleCache[moduleName]) {
                const url = getUrl(moduleName)
                addCache({ moduleName, parentModule })
                const script = document.createElement('script');
                script.id = moduleName;
                script.type = 'text/javascript';
                script.async = true;
                script.src = url;
                script.onload = () => {
                    setTimeout(() => { checkParentStatus(moduleCache[moduleName].parent) }, 0);
                }
                const firstScript = document.getElementsByTagName('script')[0];
                firstScript.parentNode.insertBefore(script, firstScript);
            } else {
                // parent中是否已经包含parentModule
                const isExist = moduleCache[moduleName].parent.find(p => p == parentModule)
                !isExist && addCache({ moduleName, parentModule })
            }
        }


        const require = (depends, callback) => {
            if (depends.length > 0) {
                addCache({ moduleName: 'REQUIRE_ROOT', depends, callback })
                depends.forEach(dependName => {
                    loadDepend(dependName, 'REQUIRE_ROOT')
                })
            } else {
                callback()
            }
        }

        // 配置模块
        require.config = (config) => {
            baseConfig.paths = config.paths
        }


        /*
            1. 当调用此函数的时候，缓存中其实已经有了此信息
            2. 往关联缓存字段中插入depends依赖模块属性
            3. 往关联缓存字段中插入callback回调字段属性
            4. 没有依赖的模块，仅仅需要插入callback，因为没有依赖的模块往往是最底层
        */
        const define = (depends, callback) => {
            const moduleName = document.currentScript && document.currentScript.id
            if (depends.length > 0) {
                addCache({ moduleName, depends, callback })
                depends.forEach(dependName => {
                    loadDepend(dependName, moduleName)
                })
            } else {
                addCache({ moduleName, callback })
                const module = moduleCache[moduleName]
                module.export = module.callback()
                module.status = 'loaded'
            }

        }

        const checkParentStatus = (parentList) => {
            parentList.forEach(moduleName => {
                const module = moduleCache[moduleName]
                if (module.status == 'loaded') {
                    return checkParentStatus(module.parent)
                }
                const exportList = []
                const isLoaded = module.depends.every(dependModuleName => {
                    const dependModule = moduleCache[dependModuleName]
                    exportList.push(dependModule.export)
                    return dependModule.status == 'loaded'
                })
                if (isLoaded) {
                    module.export = module.callback.apply(window, exportList)
                    module.status = 'loaded'
                    if (module.moduleName == 'REQUIRE_ROOT') return
                    checkParentStatus(module.parent)
                }
            })

        }



        window.require = require
        window.define = define
    }
)();