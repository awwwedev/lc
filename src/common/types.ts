import BaseModel from "@/models/BaseModel";

export type link = {
    label: string,
    routeName?: string
    href?: string
    params?: { [key: string]: string }
}

export type itemCountInfo = { leftBound: number, rightBound: number }

export type notification = {
    title?: string;
    text?: string;
    variant?: string;
    direction?: number,
    links?: Array<link>
}

export type option = {
    value: string | number;
    label: string
}

export type minMax = {
    min: number
    max: number
}
export type paginatorLinks = {
    first: string | null;
    last: string | null;
    next: string | null;
    prev: string | null;
}

export type paginatorMeta = {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}
export type responseWithPaginator<T = BaseModel> = {
    data: Array<T>;
    meta: paginatorMeta;
    links: paginatorLinks
}

export type realtyMinMaxInfo = {
    pricePerMetrMin: number;
    pricePerMetrMax: number;
    priceMin: number;
    priceMax: number;
    areaMin: number;
    areaMax: number;
}

export type tableColumn = {
    key: string,
    label: string,
    searchable?: boolean,
    sortable?: boolean
}

export type tableItem = { [key: string]: number | string }

export type objectWIthAnyProperties = { [key: string]: string | Array<number | string> | minMax | number | objectWIthAnyProperties }
