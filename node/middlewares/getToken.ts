
// Nombramos la función de manejo de ruta como getTokenHandler
export async function getTokenHandler(ctx: Context) {
  const { clients: { andromeda } } = ctx;

  try {
    const token = await andromeda.getToken('QG6UlMAnnK', 'dMV9xPTQ1k');
    // Now you have the token, you can use it for further API calls
    console.log('Token:', token);
  } catch (error) {
    console.error('Error obtaining token:', error);
  }
}
