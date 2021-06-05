export default class BaseModel {
    created_at?: string
    updated_at?: string
    id?: number

    // eslint-disable-next-line
    static prepareFormData (data: any, filter=false): FormData {
        const formData = new FormData;

        Object.keys(filter ? this.filterData(data) : data).forEach(key => {
            const currentDataItem = data[key]

            if (Array.isArray(currentDataItem)) {
                currentDataItem.forEach(value1 => {
                    formData.append(`${key}[]`, value1)
                })
            } else {
                formData.set(key, currentDataItem)
            }
        })

        return formData
    }

    // eslint-disable-next-line
    static filterData (data: any): Object {
        return Object.keys(data).reduce((acc, key) => {
            const currentDataItem = data[key];
            if (currentDataItem === null || currentDataItem === undefined)
                return acc;

            return {...acc, [key]: currentDataItem};
        }, {});
    }
}
