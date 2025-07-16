/** @type {import("eslint").Linter.Config} */
export default {
	extends: [
		'turbo',
		'airbnb-base',
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier',
	],
	env: {
		es2022: true,
		node: true,
	},
	plugins: ['import'],
	settings: {
		'import/resolver': {
			typescript: {
				project: 'tsconfig.json',
			},
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	rules: {
		'turbo/no-undeclared-env-vars': 'off',
		'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
		'react/jsx-filename-extension': 'off',
		indent: [1, 'tab'],
		'no-tabs': 'off',
		radix: 'off',
		'import/prefer-default-export': 'off',
		'import/no-extraneous-dependencies': 'off',
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
