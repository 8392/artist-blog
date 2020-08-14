# 主題和插件文档说明

## 主题根目录

1. 首先在开发一个主题的时候， 该主题必须有一个主题的图片，且该主题下至少有一个布局；
2. 主题下有一个主题对应的 index.json 文件， 用于对主题进行描述
3. 主题目类下应该有一个 demo.json 文件，用户对主题中插件的测试
4. 一个主题下可以有多个布局，最终有多少个布局，会在 index.json 中进行说明。

主题根目录中 index.json 文件介绍

```
eg:
{
  "name": "单插件主题",
  "code": "default",
  "type":["app","web"],
  "web_img_url":"/theme.jpg",
  "app_img_url":"/theme.jpg",
  "appLayout": [
    {
      "name": "我的app布局1",
      "layout_id": "layout1",
      "img_url": "/index.png",
      "template_url": ""
    }
  ],
  "webLayout": [
    {
      "name": "我的web布局1",
      "layout_id": "layout1",
      "img_url": "/index.png",
      "template_url": ""
    }
  ]
}
```

## 字段说明

在该 json 文件中会有一个 named
以上路径都是绝对路径，相对于该主题目类；

- name ：主题的名称， string 类型
- code ： 主题应该有一个 code, 默认为 default string 类型
- type ： 该主题支持的类型， 是一个 Array 类型， 只能是 web 和 app
- web_img_url ： web 主题的封面，是一个图片文件的路径；web_img_url/app_img_url 必须有一个 string 类型
- app_img_url ： app 主题的封面，是一个图片文件的路径；web_img_url/app_img_url 必须有一个 string 类型
- appLayout ： app 主题的布局列表 appLayout/webLayout 必须有一个 Array 类型
  - name:布局的名称
  - layout_id: 布局的 id, 必须填写 String 类型
  - img_url: 布局的缩略图，是一个 图片 文件的路径 必须填写 String 类型
  - template_url: 布局的最终展现，是一个 js 文件的路径，必须填写 String 类型
- webLayout ： web 主题的布局列表 appLayout/webLayout Array 类型
  - name:同 app
  - layout_id: 同 app
  - img_url: 同 app
  - template_url: 同 app

## 插件根目录

1. 首先在开发一个插件的时候， 该插件必须有一个插件的缩略图片，且该主题下至少有一个布局；
2. 插件下有一个插件对应的 index.json 文件， 用于对插件进行描述
3. 插件目类下应该有一个 demo.json 文件，用户对插件的测试
4. 一个插件下最终只有一个 js，会在 index.json 中进行说明。

```
eg:
{
  "name": "comsys-portal-demo-web",
  "title": "新闻 插件",
  "description": "插件描述, -- 融合门户-运行平台演示插件",
  "category": "新闻类",
  "version-description": "版本说明 - demo插件演示功能初始版本",
  "version": "1.0",
  "web_img_url": "/index.png",
  "web_template_url": "/index.js",
  "props": [
    {
      "hide": true,
      "key": "__permission__",
      "value": "",
      "label": "按钮权限",
      "desc": "配置按钮权限字段",
      "type": "String"
    },
    {
      "key": "seriesType",
      "label": "图类型",
      "desc": "选择需要柱状图还是折线图",
      "required": true,
      "radio": [
        { "label": "柱状图", "value": "bar" },
        { "label": "折线图", "value": "line" }
      ],
      "type": "String"
    },
    {
      "key": "noDataText",
      "label": "无数据时的提示",
      "desc": "无数据时的提示",
      "regexp": {
        "pattern": "\\d{3,5}",
        "message": "验证不通过"
      }
    },
  ],
  "config": [
    {
      "key": "show_news_type",
      "label": "显示新闻类型",
      "desc": "空显示所有新闻，填入新闻类型名称",
      "type": "String"
    }
  ]
}

```

## 字段说明

- name: 插件名称，英文
- title: 插件主题
- description: 插件的描述
- category: 插件的类别
- version-description: 插件发布的版本描述
- version: 插件的版本
- web_img_url: 插件的缩略图路径 String 类型
- web_template_url: 插件的最终 js
- terminal 该主题支持的类型， 是一个 Array 类型， 只能是 web 和 app
- asyncPage 插件内的一个子组件， 一个 Boolean, key 是传递给 props , value: 是当前子组件的名称 这两个 是必须的。
- props: 传递个插件的数据， 是一个 Array 类型 主要用于前端，在插件配置时使用
  - hide：是否在插件配置中进行显示
  - key：插件 传递给插件值的 key
  - value：插件 传递给插件值的 value
  - label：在配置参数时 显示插件 key 的名称
  - desc：配置参数时 显示该参数的描述
  - type：配置参数时 对该参数进行交易时的一种类型，默认为 String; 可以选择为 Array 或者 Object
  - required: 是否必须填写， Boolean 类型， 如果为 true; 则该参数必须有值才能通过验证
  - radio：默认在配置参数时 是用户直接输入， 如果有 radio， 则是让用户自由选择； 单项选择； Array 类型
    - label 显示的文字，String 类型
    - value 选中时传递给 props 的值
  - checkbox：同 radio, 不同的是这里是多项选择。 当选择是 radio/checkbox 时， type 默认是不生效的。此时的 type 默认在 checkbox 时是 Array; radio 时不一定（可以是 string / number / boolean）
  - switch：开关，在配置参数时以开关的形式进行展示；此时传递给 props 的值 默认是 true/false; 如果想要改变传递给 props 的值的时候， 这里可以传递一个对象
    ```
    {
      activeText: '',
      activeText	switch 打开时的文字描述	string	—	—
      inactiveText	switch 关闭时的文字描述	string	—	—
      activeValue	switch 打开时的值	boolean / string / number	—	true
      inactiveValue	switch 关闭时的值	boolean / string / number	—	false
    }
    ```
  - regexp: 正则表达式，用于自定义对当前 props 进行校验， 但校验规则 required 在前。 Object 类型
    - pattern 一个正则表达式的规则， String 类型
    - message 验证失败是的提示信息 String 类型
  - slider: 滑块； Object 类型
  - time：Object 类型
  - date: Object 类型
  - dateTime: Object 类型
  - props: 此 props 里面当然也支持子 props； 设计子 props 时，当前 props 的类型默认为 Array 类型，
- config: 与 props 一致， 是一个 Array 类型；主要用于后端，在插件配置时使用
