# grunt-index

> Compile a index.html file with doT.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-index --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-index');
```

## The "index" task

### Overview
In your project's Gruntfile, add a section named `index` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  index: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.template
Type: `String`
Default value: `default.jst`

A string value that specifies which template is used to generate the index file.

#### options.assetsMap
Type: `String`
Default value: `null`

Path to mapping file between assets and their hashed locations,
this map will be used to populate assets path in template using `assets` (`assets: {css: {}, js: {}}`) Object.

### Usage Examples

#### Default Options
In this example an 'index.html' file is generated depending on the default template and the specified template data.

```js
grunt.initConfig({
  index: {
    options: {},
    dist: {
      templateData: {},
      dest: 'index.html'
    },
  },
});
```

#### Custom Options
In this example an 'index.html' file is generated depending on the specified template and the specified template data.

```js
grunt.initConfig({
  index: {
    options: {
      template: 'template.jst'
    },
    dist: {
      templateData: {},
      dest: 'index.html'
    },
  },
});
```

#### assetsMap Option
In this example an 'index.html' file is generated depending on template `assetsMap` value.

```js
grunt.initConfig({
  index: {
    options: {
      template: 'src/index.jst',
      assetsMap: 'dist/assets/versions.json'
    },
    dist: {
      dest: 'index.html'
    },
  },
});
```

`versions.json` contain

```
{
  "dist/assets/app.js": "dist/assets/b564f2a9.app.js",
  "dist/assets/templates.js": "dist/assets/4ed16e90.templates.js",
  "dist/assets/style.css": "dist/assets/f634110a.style.css"
}
```


then inside `index.jst` using `assets` Object write
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <link rel="stylesheet" media="screen" href="{{=it.assets.css.style}}"/>
</head>
<body>
  <script src="{{=it.assets.js.templates}}"></script>
  <script src="{{=it.assets.js.app}}"></script>
</body>
</html>
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
