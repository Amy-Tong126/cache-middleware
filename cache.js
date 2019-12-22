const schedule = require('node-schedule');
class Cache {
    constructor() {
        // 缓存对象
        this.cacheObj = {};
        this.setTimeToClear();
    }

    handleCache() {
        return async (ctx, next) => {
            if (/^\/api\/data\//.test(ctx.url)) {
                const key = ctx.url.replace(/^\/api\/data\//, "");
                const { cacheObj } = this;
                console.log(key)
                // 存在走缓存，不存在拿到数据后加入缓存中
                if (cacheObj[key]) {
                    ctx.body = cacheObj[key] + "缓存数据";
                } else {
                    cacheObj[key] = await this.delay(ctx.url);
                    ctx.body = cacheObj[key];
                }
            } else {
                await next();
            }
        }
    };

    // 模拟比较慢的请求数据
    delay(data) {
        return new Promise((reslove, reject) => {
            setTimeout(() => {
                reslove(data);
            }, 3000);
        });
    }

    // 定时每到0点清空缓存
    setTimeToClear() {
        let this_ = this;
        // * * 0 * * * -> 用于零点清空
        // 方便测试使用->每分钟的第30秒触发清空
        schedule.scheduleJob('30 * * * * *', function () {
            console.log(new Date() + "清空缓存");
            this_.cacheObj = {}
        });
    }
}

module.exports = Cache;