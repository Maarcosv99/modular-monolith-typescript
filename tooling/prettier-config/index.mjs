/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
export default {
	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],
	tailwindFunctions: ['cn', 'cva', 'clsx'],
	importOrder: [
		'<TYPES>',
		'^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
		'^(@remix-run/(.*)$)|^(@remix-run$)',
		'<THIRD_PARTY_MODULES>',
		'',
		'<TYPES>^@workspace',
		'^@workspace/(.*)$',
		'',
		'<TYPES>^[.|..|~]',
		'^~/',
		'^[../]',
		'^[./]',
	],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	importOrderTypeScriptVersion: '5.3.3',
	singleQuote: true,
	semi: true,
	trailingComma: 'all',
	useTabs: true,
	tabWidth: 1,
	bracketSpacing: true,
};
