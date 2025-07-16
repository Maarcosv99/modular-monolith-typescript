/** @type {import('eslint').Linter.Config} */
export default {
	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		'react/prop-types': 'off',
		'jsx-a11y/no-autofocus': 'off',
		'jsx-a11y/label-has-associated-control': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'react/jsx-filename-extension': [1, { allow: 'as-needed' }],
		'@typescript-eslint/indent': [1, 'tab'],
		'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
		indent: [1, 'tab', { SwitchCase: 1 }],
		'no-tabs': 'off',
		'import/extensions': 'off',
		'import/no-cycle': 'off',
	},
	globals: {
		React: 'writable',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	env: {
		browser: true,
	},
};
