/**
 * 静态设备信息和参数
 */
import { v4 as uuidv4 } from 'uuid';
export const VERSION = '1.0.0'; // 版本号
export const PLATFORM = 2; // APP类型，1-PC web 2-H5 web 3-IOS APP 4-Android APP  5-后台管理web
export const CHANNEL = 0; // APP渠道，目前固定为0
export const DEVICE_ID = uuidv4(); // 设备唯一标识
export const DEVICE_MODEL = '网页设备'; // 设备型号
export const CID = ''; // 推送标识
export const INSTALL_TIME = '1578294652'; // APP安装时间，APP必须
