import { config } from '@/config';
import { Data } from '@/types';
import { MiddlewareHandler } from 'hono';

const middleware: MiddlewareHandler = async (ctx, next) => {
    await next();

    if (config.autoArticleLanguage && !ctx.req.query('lang')) {
        const data = ctx.get('data') as Data;

        if (data?.language && data?.item) {
            data.item.map((item) => {
                item.description = `<div lang="${data.language}">${item.description}</div>`;
                return item;
            });
        }
    }
};

export default middleware;
