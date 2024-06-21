import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  { env: { node: true, mocha: true }, languageOptions: { globals: globals.nodeBuiltin } },
  pluginJs.configs.recommended,
]
