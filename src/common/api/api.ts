import * as http from '../../http/http'

class Device {
    getPlan(
        data: {
          /** 跳过项数 skip int 否 */
          skip?: number;
    
          /** 获取项数 count int 否 */
          count?: number;
        },
        /** 设备编号 deviceId string 否 */
        deviceId?: string
      ) {
        return http.Get(`getPlan/${deviceId}`, data);
      }

    getInfoList(data: {
        /** 车间号 workshopCode string 否 */
        workshopCode?: string;
        /** 跳过项数 skip long 否 默认为0 */
        skip?: number;
        /** 获取项数 count long 否 默认为10，-1代表获取全部 */
        count?: number;
      }) {
        return http.Get("getInfoList", data);
      }
}

export const device = new Device();