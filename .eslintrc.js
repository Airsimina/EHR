module.exports = {
    // ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。 'root': true,
    'root': true,
    // 启用的环境
    'env': {
        'node': true
    },
    'rules': {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 'space-before-function-paren': 'off', // 关闭前置空格数校验
        'eqeqeq': 'off', // 关闭===校验
        'eol-last': 'off', // 文件以单一的换行符结束
        'indent': 0, // 缩进检查
        "quotes": [2, "double"], //引号类型 `` "" ''
        'no-new': 0, // 关闭 使用new不将结果对象分配给变量
        'quote-props': 'off', // 关闭 对象中属性名称是否始终用引号括起来
        'prefer-const': 'off', // 关闭 如果一个变量从不重新分配，使用const声明更好。
        'dot-notation': 'off', // var x = foo["bar"]; 关闭方括号验证
        "no-irregular-whitespace": "off", // 关闭空格报错检查
        "no-tabs": 0, //不能使用制表符
        "no-cond-assign": 2, //禁止在条件表达式中使用赋值语句
        "no-duplicate-case": 2, //switch中的case标签不能重复
        "no-dupe-args": 2, //函数参数不能重复
        "no-dupe-keys": 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-empty": 2, //块语句中的内容不能为空
        "no-func-assign": 2, //禁止重复的函数声明
        "no-labels": 2, //禁止标签声明
        "no-multi-spaces": 1, //不能用多余的空格
        "no-multiple-empty-lines": [1, {
            "max": 2
        }], //空行最多不能超过2行
        "no-trailing-spaces": 1, //一行结束后面不要有空格
        "no-undef": 1, //不能有未定义的变量
        "no-unneeded-ternary": 2, //禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
        "eqeqeq": 0, //必须使用全等
        "key-spacing": [0, {
            "beforeColon": false,
            "afterColon": true
        }], //对象字面量中冒号的前后空格
        "indent": [0], // 缩进
        "semi": [2, "never"] //语句强制分号结尾
    },
    // plugins 关键字来存放插件名字的列表
    'plugins': ['vue'],
    'parserOptions': {
        // 解析器
        'parser': 'babel-eslint'
    },
    // 配置文件
    'extends': [
        'plugin:vue/essential',
    ]
}