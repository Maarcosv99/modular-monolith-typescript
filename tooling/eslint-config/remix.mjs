/** @type {import('eslint').Linter.Config} */
export default {
	extends: ['@remix-run/eslint-config'],
	rules: {
		'@typescript-eslint/indent': [1, 'tab'],
		'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
		indent: [1, 'tab', { SwitchCase: 1 }],
		'no-tabs': 'off',
	},
};
