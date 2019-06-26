export class TreeExplorerItem {
  label?: string
  data?: string;
  expandedIcon?: string;
  collapsedIcon?: string;
  icon?: string;
  children?: TreeExplorerItem[] = [];
}
