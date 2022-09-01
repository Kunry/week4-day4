/**
 * Se configuras las diferentes funcionalidades que queremos utilizar en el proyecto. Normalmente serán funciones.
 */

function capitalized(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
module.exports = capitalized;
