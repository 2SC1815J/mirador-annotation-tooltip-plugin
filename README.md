# mirador-annotation-tooltip-plugin

A [Mirador 3][mirador] plugin to display annotation contents as a tooltip.

![Screenshot]

## Live examples (demo)

- [SAT Taishōzō Image DB][sat]

## Installation

1. `git clone` this repository
2. `npm install`
3. `npm run bundle`

This will generate a file `bundle/dist/mirador.bundle.js` that combines Mirador 3 and this plugin, and it can be used as follows (see `bundle/index.html`).
```html
<div id="mirador"></div>
<script type="text/javascript" src="dist/mirador.bundle.js"></script>
<script type="text/javascript">
    var miradorInstance = Mirador.viewer({
        id: 'mirador',
        windows: [{
            manifestId: 'https://iiif.harvardartmuseums.org/manifests/object/299843',
        }],
        window: {
            defaultSideBarPanel: 'annotations',
            sideBarOpenByDefault: true,
        }
    }, [miradorAnnotationTooltipPlugins]);
</script>
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

[mirador]: https://github.com/projectmirador/mirador
[screenshot]: https://user-images.githubusercontent.com/617423/126855769-3a647903-c4e7-4551-b512-06394a5310b0.png
[sat]: https://dzkimgs.l.u-tokyo.ac.jp/SATi/images.php?vol=12b02