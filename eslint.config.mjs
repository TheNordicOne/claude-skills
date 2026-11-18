import eslint from '@eslint/js';
import nx from '@nx/eslint-plugin';
import {
  configs as ngConfigs,
  processInlineTemplates,
} from 'angular-eslint';
import prettierConfig from 'eslint-config-prettier';
import { configs as jsoncConfigs } from 'eslint-plugin-jsonc';
import globals from 'globals';
import { configs as tsConfigs } from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

const TYPES_BELOW_FEATURE = [
  'type:feature',
  'type:ui',
  'type:data-access',
  'type:util',
  'type:contracts',
];

export default defineConfig(
  { ignores: ['.angular/*', '.nx/*', 'dist/*'] },
  ...nx.configs['flat/base'],
  {
    name: 'JavaScript',
    files: ['**/*.js'],
    extends: [eslint.configs.recommended, prettierConfig],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {},
  },
  {
    name: 'TypeScript',
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tsConfigs.strictTypeChecked,
      ...tsConfigs.stylisticTypeChecked,
      ...ngConfigs.tsAll,
      prettierConfig,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    processor: processInlineTemplates,
    rules: {
      'curly': ['error', 'all'],
      'eqeqeq': ['error', 'always'],
      'no-console': 'warn',
      'no-else-return': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        {
          assertionStyle: 'as',
        },
      ],
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      // Selector prefixes are set per module: each module's own eslint.config.mjs
      // configures '@angular-eslint/component-selector' (element, kebab-case) and
      // '@angular-eslint/directive-selector' (attribute, camelCase) with its prefix
      // of at most 4 characters.
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/component-class-suffix': 'off',
      '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: "Enums are forbidden. Use an Object with 'as const' instead",
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]',
            match: false,
          },
        },
      ],
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/unbound-method': [
        'error',
        {
          ignoreStatic: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/prefer-readonly': 'error',
      '@angular-eslint/use-injectable-provided-in': 'off',
    },
  },
  {
    name: 'HTML',
    files: ['**/*.html'],
    extends: [...ngConfigs.templateAll, ...ngConfigs.templateAccessibility],
    rules: {
      '@angular-eslint/template/i18n': 'off',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      // Turning this off to be able to use signals
      // There currently is no way to differentiate between a signal and a function call, other thant adding prefixes or suffixes
      '@angular-eslint/template/no-call-expression': 'off',
    },
  },
  {
    name: 'Angular',
    files: ['**/*.component.ts'],
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  {
    name: 'Tests',
    files: ['**/*.spec.ts', '**/*.e2e.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  {
    // Harnesses and stand-ins in `testing` entry points must never reach a bundle.
    name: 'Testing entry points',
    files: ['**/*.ts'],
    ignores: [
      '**/*.spec.ts',
      '**/*.e2e.ts',
      '**/test-setup.ts',
      '**/testing/**',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/testing', '**/testing/**'],
              message: 'Only tests may import a testing entry point.',
            },
          ],
        },
      ],
    },
  },
  {
    name: 'json',
    files: ['**/*.json'],
    extends: [
      ...jsoncConfigs['flat/recommended-with-jsonc'],
      ...jsoncConfigs['flat/prettier'],
    ],
    rules: {},
  },
  {
    name: 'Boundaries',
    files: ['**/*.ts', '**/*.js'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          // Every project carries a scope (its area) and a type (what it holds).
          // A dependency must pass every rule its source's tags select.
          depConstraints: [
            // A scope uses itself and the shared libraries, and reaches another
            // scope only through its contracts. Add one rule per scope:
            // { sourceTag: 'scope:<area>', onlyDependOnLibsWithTags: ['scope:<area>', 'scope:shared', 'type:contracts'] }
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            // An app or feature uses what lies below it; contracts use nothing.
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: TYPES_BELOW_FEATURE,
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: TYPES_BELOW_FEATURE,
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:ui', 'type:util'],
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:data-access', 'type:util'],
            },
            { sourceTag: 'type:util', onlyDependOnLibsWithTags: ['type:util'] },
            { sourceTag: 'type:contracts', onlyDependOnLibsWithTags: [] },
            { sourceTag: 'type:test', onlyDependOnLibsWithTags: ['*'] },
          ],
        },
      ],
    },
  },
);
