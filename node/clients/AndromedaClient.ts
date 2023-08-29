import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

interface LoginResponse {
  data: any
  token: string
  // Other properties that might be returned in the response
}

export default class AndromedaClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://api-marketplace.staging.andromedalatam.com', context, options)
  }

  public async getToken(username: string, password: string): Promise<string> {
    const response = await this.http.post<LoginResponse>('/api/v1/login', { username, password })
    console.log(response);
    return response.token
  }
}
