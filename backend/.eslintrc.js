module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'camelcase': 'error',
		'spaced-comment': 'off',
		'quotes': [
			'error',
			'single',
		],
		'no-duplicate-imports': 'error',
		'@typescript-eslint/no-empty-function': 'off',
		'no-debugger': 'warn',
		'object-curly-spacing': ['warn', 'always'],
		'semi': ['warn', 'always'],
		'indent': ['warn', 2]
	},
};
