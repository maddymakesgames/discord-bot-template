module.exports = {
	'root': true,
	'parser': '@typescript-eslint/parser',
	'plugins': [
		'@typescript-eslint'
	],
	'env': {
		'es6': true,
		'node': true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'indent': [
			"error",
			"2",
			{
				'SwitchCase': 1
			}
		],
		'prefer-const': 'warn',
		'no-unused-vars': [
			'warn',
			{
				'argsIgnorePattern': '^_'
			}
		],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				'argsIgnorePattern': '^_'
			}
		]
	}
};