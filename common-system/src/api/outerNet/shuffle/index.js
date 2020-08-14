import qs from "qs";
import { get, requestData } from '../../../utils/request2'

export const getList = (data) => { //轮播图列表
    return requestData({
        url: '/comsys-portal-web/carouselImage/getCarouselImagePage',
        method: 'POST',
        data
    })
}

export const deleteList = (data) => { //删除轮播图
    return requestData({
        url: '/comsys-portal-web/carouselImage/delete',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const save = (data) => { //保存轮播图
    return requestData({
        url: '/comsys-portal-web/carouselImage/save',
        method: 'POST',
        data
    })
}

export const update = (data) => { //修改轮播图
    return requestData({
        url: '/comsys-portal-web/carouselImage/update',
        method: 'POST',
        data
    })
}
