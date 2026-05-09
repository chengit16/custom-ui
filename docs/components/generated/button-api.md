### Button Props

| 属性          | 类型                                                                    | 默认值    | 说明                                                                                                         |
| ------------- | ----------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| type          | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | 'default' | 按钮类型<br><br>用于控制按钮的语义色，可选值为 `default`、`primary`、`success`、`info`、`warning`、`error`。 |
| secondary     | `boolean`                                                               | false     | 是否使用次要按钮样式                                                                                         |
| tertiary      | `boolean`                                                               | false     | 是否使用次次要按钮样式                                                                                       |
| quaternary    | `boolean`                                                               | false     | 是否使用次次次要按钮样式                                                                                     |
| strong        | `boolean`                                                               | false     | 是否加粗按钮样式                                                                                             |
| size          | `'tiny' \| 'small' \| 'medium' \| 'large'`                              | 'medium'  | 按钮尺寸                                                                                                     |
| disabled      | `boolean`                                                               | false     | 是否禁用按钮                                                                                                 |
| loading       | `boolean`                                                               | false     | 是否展示加载状态                                                                                             |
| block         | `boolean`                                                               | false     | 是否让按钮宽度撑满父容器                                                                                     |
| text          | `boolean`                                                               | false     | 是否使用文本按钮样式                                                                                         |
| round         | `boolean`                                                               | false     | 是否使用圆角按钮                                                                                             |
| circle        | `boolean`                                                               | false     | 是否使用圆形按钮                                                                                             |
| ghost         | `boolean`                                                               | false     | 是否使用幽灵按钮样式                                                                                         |
| dashed        | `boolean`                                                               | false     | 是否使用虚线按钮样式                                                                                         |
| color         | `string`                                                                | undefined | 按钮颜色                                                                                                     |
| iconPlacement | `'left' \| 'right'`                                                     | 'left'    | 图标位置                                                                                                     |

### ButtonGroup Props

| 属性      | 类型                         | 默认值       | 说明                       |
| --------- | ---------------------------- | ------------ | -------------------------- |
| direction | `'horizontal' \| 'vertical'` | 'horizontal' | 排列方向                   |
| gap       | `number \| string`           | 12           | 按钮间距，数字会按 px 处理 |
| block     | `boolean`                    | false        | 是否占满父容器宽度         |
