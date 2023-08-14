import { UserInputError } from '@vtex/api'

export async function validateOrder(ctx: Context, next: () => Promise<any>) {
    const {
      vtex: {
        route: { params },
      },
    } = ctx;
  
    console.info('Received params:', params);
  
    const { order } = params;
  
    if (!order) {
      throw new UserInputError('order is Required');
    }
  
    ctx.state.order = { order }; 
    console.log('ctx en validate ', ctx);
    await next();
  }