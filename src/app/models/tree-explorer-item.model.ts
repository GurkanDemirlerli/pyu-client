export class TreeExplorerItem {
  label?: string
  data?: any;
  expandedIcon?: string;
  collapsedIcon?: string;
  icon?: string;
  children?: TreeExplorerItem[] = [];
}
