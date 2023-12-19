import { ServiceContext } from '@vtex/api'

export async function helloworld(ctx: ServiceContext) {
  const {
    clients: { apps },
  } = ctx

  const appSettings = await apps.getAppSettings(process.env.VTEX_APP_ID || 'undef');

  console.log(appSettings) // Aquí se imprimirán las configuraciones de su aplicación, incluyendo los datos ingresados por el usuario.

  ctx.body = 'Hello, world!'
}
