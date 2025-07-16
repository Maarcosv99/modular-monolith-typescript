/** @type {import("eslint").Linter.Config} */
export default {
	extends: ['airbnb-typescript/base', 'plugin:@typescript-eslint/recommended'],
	env: {
		es2022: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: { project: true },
	plugins: ['@typescript-eslint'],
	rules: {
		'turbo/no-undeclared-env-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
		],
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{ prefer: 'type-imports', fixStyle: 'separate-type-imports' },
		],
		'@typescript-eslint/no-misused-promises': [
			'error',
			{ checksVoidReturn: { attributes: false } },
		],
		'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/unbound-method': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/no-redeclare': 'off',
		'react/jsx-filename-extension': 'off',
		'@typescript-eslint/indent': [1, 'tab'],
		'no-undef-init': 'off',
		'import/extensions': 'off',
		'no-promise-executor-return': 'off',
		'consistent-return': 'off',
		'class-methods-use-this': 'off',
	},
	ignorePatterns: [
		'**/*.config.js',
		'**/*.config.mjs',
		'**/*.eslintrc.mjs',
		'dist',
		'build',
		'pnpm-lock.yaml',
	],
	reportUnusedDisableDirectives: true,
};
