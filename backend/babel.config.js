export default {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current'
      }
    }]
  ],
  plugins: [
    ['@babel/transform-runtime'],
    ['module-resolver', { alias: { '~': './src' } }]
  ]
} 