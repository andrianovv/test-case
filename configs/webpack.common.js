const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const R = require('ramda');

const sourcePath = path.join(__dirname, '..', './src');

const inSrc = R.partial(path.resolve, [sourcePath]);

exports.sourcePath = sourcePath;

exports.scssLoaders = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 2,
      localIdentName: '[local]__[hash:base64:5]'
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      'sourceMap': true,
      plugins: () => [
        require('autoprefixer')({
          'browsers': ['last 2 Firefox versions', 'last 2 Safari versions']
        }),
      ]
    }
  },
  {
    loader: 'resolve-url-loader'
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        inSrc('assets/styles/mixins.scss'),
        inSrc('assets/styles/colors.scss'),
      ]
    },
  }
];

exports.fileLoader = {
  loader: 'file-loader',
  options: {
    name: '[name].[ext]',
    outputPath: 'images/'
  }
};

exports.config = {
  context: sourcePath,
  output: {
    publicPath: `/`
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      Types: inSrc('types/'),
      Assets: inSrc('assets/'),
      Scenes: inSrc('scenes/'),
      Redux: inSrc('redux/'),
      Components: inSrc('components/'),
      Helpers: inSrc('helpers/'),
      Stubs: inSrc('stubs/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ['react-hot-loader/babel'],
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                'sourceMap': true,
                'target': 'es5',
                'isolatedModules': true,
                'noEmitOnError': false,
              },
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      tslint: inSrc('./../tslint.json'),
      tsconfig: inSrc('./../tsconfig.json'),
      workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
    }),
    new HtmlWebpackPlugin({
      template: './../index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'project-assets/**/*', context: path.join(__dirname, '..'), cache: true }
    ])
  ]
}
