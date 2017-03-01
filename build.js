var rollup = require('rollup').rollup;
var babel = require('rollup-plugin-babel');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs =  require('rollup-plugin-commonjs');

rollup({
  entry: 'src/index.js',
  external: ['react'],
  plugins: [
    nodeResolve({ jsnext: true, main: true }),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs()
  ]
}).then( function ( bundle ) {
  bundle.write({
    format: 'umd',
    dest: 'build/bundle.js',
    moduleName: 'ReactOnVisible',
    exports: 'named',
    globals: {
      react: 'React'
    }
  });
});;
