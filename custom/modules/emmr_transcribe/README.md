## CKEditor 5 plugin development starter template

To facilitate easier development of modules that provide CKEditor 5 plugins,
developers may copy the contents of this directory to the root of their module
directory. This provides the basic build tools and directory structure for
creating CKEditor 5 plugins within a contributed module, as well as a basic
working plugin based on the [CKEditor 5 block plugin tutorial](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/tutorials/implementing-a-block-widget.html)
but with additional documentation and minor changes for better integration
with Drupal.

When Drupal updates to use newer versions of CKEditor 5, it may be necessary to
update any files copied from here to your module.

Plugin source should be added to
`js/ckeditor5_plugins/{pluginNameDirectory}/src` and the build tools expect this
directory to include an `index.js` file that exports one or more CKEditor 5
plugins. Note that requiring `index.js` to be inside
`{pluginNameDirectory}/src` is not a fixed requirement of CKEditor 5 or Drupal,
but a requirement of this starter template that can be changed in
`webpack.config.js` as needed.

In the module directory, run `yarn install` to set up the necessary assets. The
initial run of `install` may take a few minutes, but subsequent builds will be
faster.

After installing dependencies, plugins can be built with `yarn build` or `yarn
watch`. They will be built to `js/build/{pluginNameDirectory}.js`.

`yarn watch` uses webpack dev mode and produces JS files that should not be
distributed. You should use `yarn build` before committing the `js/build/`
folder.


## Updating dependencies

The CKEditor 5 module update workflow
(`.github/workflows/update-ckeditor5.yaml`, which calls the shared dockworker
workflow) runs on a schedule (or manually) and opens a PR with updated
`package.json`, `yarn.lock` and `js/build`. It pins `ckeditor5` to the version
Drupal core ships (read from `build/composer.lock`), runs `yarn upgrade` and
`yarn build`, and lists the changed packages in the PR description.
