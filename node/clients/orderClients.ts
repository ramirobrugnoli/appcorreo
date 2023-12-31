import { InstanceOptions, IOContext, IOClient} from '@vtex/api';

export default class OrderClients extends IOClient {
  static app: any;
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, options);
  }

  public async sendOrderNotification(orderData: any): Promise<any> {
    return this.http.post('https://servicechanges--correostaging.myvtex.com/0.0/orderNotification', orderData, {
      metric: 'order-notification',
    });
  }
}

