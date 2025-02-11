import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import tanstackQuery from '@tanstack/eslint-plugin-query';

export default tseslint.config(
	{ ignores: ['dist', 'node_modules'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			prettier, // Disables ESLint rules that conflict with Prettier
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			prettier: eslintPluginPrettier,
			'@tanstack/query': tanstackQuery,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],

			// Tanstack React Query rules
			'@tanstack/query/exhaustive-deps': 'warn',
			'@tanstack/query/no-rest-destructuring': 'warn',

			// Prettier rule to format using its config
			'prettier/prettier': 'warn',
		},
	}
);
