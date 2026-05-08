import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import DemoBlock from './components/DemoBlock.vue';
import './styles.css';

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DemoBlock', DemoBlock);
  }
};

export default theme;
