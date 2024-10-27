export interface MenuItem {
    icon?: React.ReactNode;
    label?: string;
    route?: string;
    children?: MenuItem[];
    [key: string]: any;
}

export interface MenuGroup {
    name: string;
    menuItems: MenuItem[];
}